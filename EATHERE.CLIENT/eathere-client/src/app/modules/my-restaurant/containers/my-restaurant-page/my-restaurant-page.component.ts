import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.fg = this.getFg();
    }

    ngOnInit(): void {
        this.getCurrentUser();
        this.getRestaurant();
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
                this.restaurantService.getRestaurantByOwnerId(this.user.id).subscribe(response => {
                    this.restaurant = response
                    console.log(response)
                })
            )
        }
    }

    toggleIsToEdit(fieldName: string): void {
        this.isEdit[fieldName] = !this.isEdit[fieldName];
    }


}
