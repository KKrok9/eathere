import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Order } from 'src/app/models/order.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';
import { DishService, OrderService, RestaurantService, TableService, WorkerService } from 'src/app/services';

@Component({
    selector: 'app-statistics-page',
    templateUrl: './statistics-page.component.html',
    styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

    restaurant!: Restaurant;
    workers: User[] = []; //TO CHANGE!
    orders: Order[] = [];
    thisMonthOrders: Order[] = [];
    dishes: Dish[] = []
    salarySum: number = 0;

    private subscription = new Subscription();
    constructor(
        private restaurantService: RestaurantService,
        private orderService: OrderService,
        private dishService: DishService,
        private workerService: WorkerService
    ) {
    }
    ngOnInit(): void {
        this.getRestaurant();
        this.getWorkers();
    }

    private getRestaurant() {
        this.subscription.add(
            this.restaurantService.getRestaurantOfCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.restaurant = response;
                    if (this.restaurant) {
                        this.getDishes();
                        this.getOrders();
                    }
                }
            )
        )
    }

    private getOrders(): void {
        this.subscription.add(
            this.orderService.getAllOrdersFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.orders = response;
                    if (this.orders) {
                        this.getOrdersCountThisMonth();
                    }
                },
                (error) => {
                    console.error(error);
                }
            )
        )
    }
    private getDishes(): void {
        this.subscription.add(
            this.dishService.getAllDishesFromSingleRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.dishes = response;
                },
                (error) => {
                    console.error(error);
                }
            )
        );
    }


    private getOrdersCountThisMonth(): Order[] {
        const today = new Date();
        return this.orders.filter(element => {
            const orderDate = new Date(element.orderDate);
            if (this.isSameMonth(orderDate, today)) {
                this.thisMonthOrders.push(element);
            }
        });
    }

    private isSameMonth(date1: Date, date2: Date): boolean {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth()
        );
    }

    private getWorkers(): void {
        this.subscription.add(
            this.workerService.getAllWorkersFromRestaurant().subscribe(
                (response) => {
                    this.workers = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }

    getSalarySum(): number {
        let sum = 0;
        this.workers.forEach((element) => {
            if (element.salary) {
                sum += Number(element?.salary);
            }
        })
        return sum;
    }

    getIncomeFromOrders(): number {
        let sum = 0;
        this.thisMonthOrders.forEach((element) => {
            sum += this.calculateOrderPrice(element.dishIds);
        })
        return sum;
    }

    private calculateOrderPrice(ids: string[]): number {
        let price = 0;
        const dishOccurrences = new Map<string, number>();
        ids.forEach((dishId) => {
            dishOccurrences.set(dishId, (dishOccurrences.get(dishId) || 0) + 1);
        });
        dishOccurrences.forEach((occurrences, dishId) => {
            const dish = this.dishes.find((element) => element.id === dishId);
            if (dish) {
                price += dish.price * occurrences;
            }
        });

        return price;
    }

    getBiggestSalaryOwner(): User | null {
        let userToReturn: User | null = null;
        let biggestSalary = 0;

        this.workers.forEach((element) => {
            if (element.salary && Number(element.salary) > biggestSalary) {
                userToReturn = element;
                biggestSalary = Number(element.salary);
            }
        });

        return userToReturn;
    }

    findMostAndLeastOrderedDishes(orders: Order[], dishes: Dish[]): { mostOrdered: Dish | null, leastOrdered: Dish | null } {
        const dishOrdersCount: Record<string, number> = {};

        // Liczenie liczby zamówień dla każdego dania
        orders.forEach(order => {
            order.dishIds.forEach(dishId => {
                dishOrdersCount[dishId] = (dishOrdersCount[dishId] || 0) + 1;
            });
        });

        // Znalezienie ID najczęściej i najrzadziej zamawianych dań
        const mostOrderedDishId = Object.keys(dishOrdersCount).reduce((a, b) => dishOrdersCount[a] > dishOrdersCount[b] ? a : b);
        const leastOrderedDishId = Object.keys(dishOrdersCount).reduce((a, b) => dishOrdersCount[a] < dishOrdersCount[b] ? a : b);

        // Znalezienie obiektów Dish odpowiadających znalezionym ID
        const mostOrdered = dishes.find(dish => dish.id === mostOrderedDishId) || null;
        const leastOrdered = dishes.find(dish => dish.id === leastOrderedDishId) || null;

        return { mostOrdered, leastOrdered };
    }

    findMostExpensiveOrder(orders: Order[], dishes: Dish[]): { order: Order | null, totalPrice: number } {
        let mostExpensiveOrder: Order | null = null;
        let highestTotalPrice = 0;

        // Iteracja przez zamówienia
        orders.forEach(order => {
            const totalPrice = order.dishIds.reduce((total, dishId) => {
                const dish = dishes.find(d => d.id === dishId);
                return total + (dish ? dish.price : 0);
            }, 0);

            if (totalPrice > highestTotalPrice) {
                highestTotalPrice = totalPrice;
                mostExpensiveOrder = order;
            }
        });

        return { order: mostExpensiveOrder, totalPrice: highestTotalPrice };
    }


}


