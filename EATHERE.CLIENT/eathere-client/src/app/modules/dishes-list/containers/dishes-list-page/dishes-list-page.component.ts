import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { DishType } from 'src/app/models/dishType.model';
import { PortionType } from 'src/app/models/portionType.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services';
import { DishService } from 'src/app/services/dish.service';
import { DishTypeService } from 'src/app/services/dishType.service';
import { PortionTypeService } from 'src/app/services/portionType.service';

@Component({
    selector: 'app-dishes-list-page',
    templateUrl: './dishes-list-page.component.html',
    styleUrls: ['./dishes-list-page.component.scss']
})
export class DishesListPageComponent implements OnInit {

    restaurant!: Restaurant;
    dishes: Dish[] = [];
    fg: FormGroup;
    dishTypes: DishType[] = [];
    portionTypes: PortionType[] = [];
    isDishModalVisible = false;
    selectedDishId: string | null = null;

    private subscription = new Subscription();

    constructor(
        private dishService: DishService,
        private restaurantService: RestaurantService,
        private fb: FormBuilder,
        private dishTypeService: DishTypeService,
        private portionTypeService: PortionTypeService,
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
                        this.getDishTypes();
                        this.getPortionTypes();
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
                restaurantId: this.restaurant.id,
                dishTypeId: this.fg.value.dishType,
                portionTypeId: this.fg.value.portionType
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
            carbohydrates: "",
            dishType: "",
            portionType: ""
        });
    }

    openModal(dishId: string): void {
        this.selectedDishId = dishId;
        this.isDishModalVisible = true;
    }

    getDishTypes(): void {
        this.subscription.add(
            this.dishTypeService.getAllDishTypesFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.dishTypes = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }

    getPortionTypes(): void {
        this.subscription.add(
            this.portionTypeService.getAllPortionTypesFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.portionTypes = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }
}
