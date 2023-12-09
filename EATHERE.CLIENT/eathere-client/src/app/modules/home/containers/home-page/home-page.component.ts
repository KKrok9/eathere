import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Order } from 'src/app/models/order.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';
import { AuthService, DishService, OrderService, RestaurantService, TableService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    restaurant!: Restaurant;
    orders: Order[] = [];
    activeOrders: Order[] = [];
    tables: Table[] = [];
    dishes: Dish[] = []
    freeTablesCount: number = 0;
    freeSeatsCount: number = 0;
    activeOrdersCount: number = 0;
    todaysOrders: Order[] = [];
    private subscription = new Subscription();

    constructor(private tableService: TableService,
        private restaurantService: RestaurantService,
        private orderService: OrderService,
        private dishService: DishService
    ) {
    }
    ngOnInit(): void {
        this.getRestaurant();
    }


    private getRestaurant() {
        this.subscription.add(
            this.restaurantService.getRestaurantOfCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.restaurant = response;
                    if (this.restaurant) {
                        this.getDishes();
                        this.getTables();
                        this.getOrders();
                    }
                }
            )
        )
    }

    private getTables(): void {
        this.subscription.add(
            this.tableService.getAllTablesFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.tables = response;
                    if (this.tables) {
                        this.getFreeTablesAndSeatsCount();
                    }
                },
                (error) => {
                    console.log(error);
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
                        this.activeOrders = this.orders.filter(element => element.orderStatus === 'ACTIVE');
                        this.getOrdersCountFromToday();
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

    makeOrderDone(order: Order): void {
        const updatedOrder = {
            id: order.id,
            orderAccepterId: order.orderAccepterId,
            tableId: order.tableId,
            restaurantId: order.restaurantId,
            description: order.description,
            orderStatus: "DONE",
            dishIds: order.dishIds
        };
        this.subscription.add(
            this.orderService.updateOrder(updatedOrder).subscribe(() => {
                this.getOrders();
            })
        );
        console.log('ok');
    }

    getFreeTablesAndSeatsCount(): void {
        this.tables.forEach((element) => {
            if (!element.isTaken) {
                this.freeTablesCount++;
                this.freeSeatsCount += element.capacity;
            }
        })
    }

    private getOrdersCountFromToday(): Order[] {
        const today = new Date();
        return this.orders.filter(element => {
            const orderDate = new Date(element.orderDate);
            if (this.isSameDay(orderDate, today)) {
                this.todaysOrders.push(element);
            }
        });
    }

    private isSameDay(date1: Date, date2: Date): boolean {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
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

    calculateTodaysIncome(): number {
        let sum = 0;
        if (this.todaysOrders) {
            this.todaysOrders.forEach((element) => {
                sum += this.calculateOrderPrice(element.dishIds);
            })
        }
        return sum;
    }

}
