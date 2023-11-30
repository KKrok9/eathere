import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DishService, RestaurantService } from 'src/app/services';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-all-orders-page',
    templateUrl: './all-orders-page.component.html',
    styleUrls: ['./all-orders-page.component.scss']
})
export class AllOrdersPageComponent implements OnInit {
    isModalVisible: boolean = false;
    restaurant!: Restaurant;
    dishes: Dish[] = [];
    private subscription = new Subscription();

    constructor(
        private restaurantService: RestaurantService,
        private dishService: DishService,
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

    toggleIsVisible(): void {
        this.isModalVisible = !this.isModalVisible;
    }
}
