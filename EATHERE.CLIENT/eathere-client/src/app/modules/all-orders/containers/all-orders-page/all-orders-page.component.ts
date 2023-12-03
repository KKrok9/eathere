import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DishService, OrderService, RestaurantService, TableService } from 'src/app/services';
import { ChangeDetectorRef } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Table } from 'src/app/models/table.model';

@Component({
    selector: 'app-all-orders-page',
    templateUrl: './all-orders-page.component.html',
    styleUrls: ['./all-orders-page.component.scss']
})
export class AllOrdersPageComponent implements OnInit {
    isModalVisible: boolean = false;
    restaurant!: Restaurant;
    dishes: Dish[] = [];
    orders: Order[] = [];
    tables: Table[] = [];
    private subscription = new Subscription();

    constructor(
        private restaurantService: RestaurantService,
        private dishService: DishService,
        private orderService: OrderService,
        private tableService: TableService,
        private cdr: ChangeDetectorRef
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
                        this.cdr.detectChanges();
                    }
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


    private getTables(): void {
        this.subscription.add(
            this.tableService.getAllTablesFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.tables = response;
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
                },
                (error) => {
                    console.error(error);
                }
            )
        )
    }

    toggleIsVisible(): void {
        this.isModalVisible = !this.isModalVisible;
    }

    selectNameById<T extends { id: string, name: string }>(items: T[], id: string): string {
        let itemName = '';
        items.forEach(element => {
            if (element.id === id) {
                itemName = element.name;
            }
        });
        return itemName;
    }

    calculateOrderPrice(ids: string[]): string {
        let dishesInOrder: Dish[] = [];
        let price = 0;

        this.dishes.forEach((element) => {
            if (ids.includes(element.id)) {
                dishesInOrder.push(element);
            }
        })
        if (dishesInOrder !== null) {
            price = dishesInOrder.reduce((accumulator, dish) => {
                return accumulator + dish.price;
            }, 0);
        }

        return price.toString();
    }
}
