import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-my-restaurant-page',
    templateUrl: './my-restaurant-page.component.html',
    styleUrls: ['./my-restaurant-page.component.scss']
})
export class MyRestaurantPageComponent implements OnInit {

    user!: User;
    fg: FormGroup;
    isFormVisible: boolean = false;
    restaurant!: Restaurant;
    enteredRestaurantCode: string = "";
    isEdit: { [key: string]: boolean } = {
        country: false,
        city: false,
        street: false,
        streetNumber: false,
        restaurantName: false,
    };

    private subscription = new Subscription();

    constructor(
        private userService: UserService,
        private restaurantService: RestaurantService,
        private fb: FormBuilder
    ) {
        this.fg = this.getFg();
    }

    ngOnInit(): void {
        this.getCurrentUser();
        this.getRestaurant();
        this.initializeForm();
    }

    private getFg(): any {
        return this.fb.group({
            country: "",
            city: "",
            street: "",
            streetNumber: "",
            restaurantName: "",
        })
    }

    private getCurrentUser(): void {
        this.subscription.add(
            this.userService.getCurrentlyLoggedUser().subscribe(response => {
                this.user = response;
                this.getRestaurant();
            })
        );
    }

    setFormVisible() {
        this.isFormVisible = true;
    }

    addRestaurant() {
        if (this.user) {
            const newRestaurant = {
                country: this.fg.value.country,
                city: this.fg.value.city,
                street: this.fg.value.street,
                streetNumber: this.fg.value.streetNumber,
                restaurantName: this.fg.value.restaurantName,
                restaurantCode: "XXXXX",
                ownerId: this.user.id,
            }
            this.restaurantService.addRestaurant(newRestaurant).subscribe(() => {
                this.getCurrentUser();
                this.getRestaurant();
            });
        }
    }

    getRestaurant() {
        if (this.user) {
            this.subscription.add(
                this.restaurantService.getRestaurantOfCurrentlyLoggedUser().subscribe(response => {
                    this.restaurant = response
                    this.fg.patchValue({
                        country: this.restaurant.country || '',
                        city: this.restaurant.city || '',
                        street: this.restaurant.street || '',
                        streetNumber: this.restaurant.streetNumber || '',
                        restaurantName: this.restaurant.restaurantName || '',
                    });
                })
            )
        }
    }

    initializeForm() {
        this.fg = this.fb.group({
            country: [this.restaurant?.country, Validators.required],
            city: [this.restaurant?.city, Validators.required],
            street: [this.restaurant?.street, Validators.required],
            streetNumber: [this.restaurant?.streetNumber, Validators.required],
            restaurantName: [this.restaurant?.restaurantName, Validators.required]
        })
    }


    toggleIsToEdit(fieldName: string): void {
        this.isEdit[fieldName] = !this.isEdit[fieldName];
    }

    updateRestaurant(): void {
        const updatedRestaurant = {
            id: this.restaurant.id,
            country: this.fg.value.country,
            city: this.fg.value.city,
            street: this.fg.value.street,
            streetNumber: this.fg.value.streetNumber,
            restaurantName: this.fg.value.restaurantName,
            ownerId: this.restaurant.ownerId,
            restaurantCode: this.restaurant.restaurantCode
        }
        this.restaurantService.updateRestaurant(updatedRestaurant).subscribe();
        for (const key in this.isEdit) {
            if (this.isEdit.hasOwnProperty(key)) {
                this.isEdit[key] = false;
            }
        }
        this.getCurrentUser();
        this.getRestaurant();
    }

    registerToRestaurantByCode(restaurantCode: any) {
        this.enteredRestaurantCode = JSON.stringify(restaurantCode);
        this.restaurantService.registerUserByRestaurantCode(restaurantCode).subscribe((response) => {
            console.log(response);
        })
        window.location.reload();
    }
}
