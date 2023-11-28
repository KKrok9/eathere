import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services';
import { DishService } from 'src/app/services/dish.service';

@Component({
    selector: 'app-dishes-list-page',
    templateUrl: './dishes-list-page.component.html',
    styleUrls: ['./dishes-list-page.component.scss']
})
export class DishesListPageComponent implements OnInit {

    restaurant!: Restaurant;
    dishes: Dish[] = [];
    fg: FormGroup;
    isDishModalVisible = false;
    selectedDishId: string | null = null;

    private subscription = new Subscription();

    constructor(
        private dishService: DishService,
        private restaurantService: RestaurantService,
        private fb: FormBuilder
    ) {
        this.fg = this.getFg();
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.subscription.add(
            this.restaurantService.getRestaurantOfCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.restaurant = response;
                    if (this.restaurant) {
                        this.loadDishes();
                    }
                },
                (error) => {
                    console.error(error);
                }
            )
        );
    }

    private loadDishes(): void {
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

    deleteDish(id: string): void {
        this.subscription.add(
            this.dishService.deleteDish(id).subscribe(
                () => {
                    this.loadDishes();
                }
            )
        )
    }

    addDish(): void {
        if (this.restaurant) {
            const newDish = {
                name: this.fg.value.name,
                ingredients: this.fg.value.ingredients,
                description: this.fg.value.description,
                price: this.fg.value.price,
                calories: this.fg.value.calories,
                proteins: this.fg.value.proteins,
                fats: this.fg.value.fats,
                carbohydrates: this.fg.value.carbohydrates,
                restaurantId: this.restaurant.id
            };

            this.subscription.add(
                this.dishService.addDish(newDish).subscribe(
                    () => {
                        this.loadDishes();
                        this.fg.reset();
                    },
                    (error) => {
                        console.error(error);
                    }
                )
            );
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getFg(): any {
        return this.fb.group({
            name: "",
            ingredients: "",
            description: "",
            price: "",
            calories: "",
            proteins: "",
            fats: "",
            carbohydrates: ""
        });
    }

    openModal(dishId: string): void {
        this.selectedDishId = dishId;
        this.isDishModalVisible = true;
    }
}
