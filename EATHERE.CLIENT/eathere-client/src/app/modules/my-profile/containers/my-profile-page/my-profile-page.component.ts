import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent {
    user!: User;
    fg: FormGroup;

    isEdit: { [key: string]: boolean } = {
        name: false,
        surname: false,
        email: false,
        birthdayDate: false,
        contactNumber: false,
    };

    private subscription = new Subscription();
    constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
        this.fg = this.getFg();
    }

    ngOnInit(): void {
        this.getCurrentUser();
        this.initializeForm();
    }

    private getFg(): any {
        return this.fb.group({
            name: "",
            surname: "",
            email: "",
            isRestaurantOwner: "",
            birthdayDate: "",
            contactNumber: "",
        });
    }

    private getCurrentUser(): void {
        this.subscription.add(
            this.userService.getCurrentlyLoggedUser().subscribe(response => {
                this.user = response;
                this.fg.patchValue({
                    name: this.user.name || '',
                    surname: this.user.surname || '',
                    email: this.user.email || '',
                    isRestaurantOwner: this.user.isRestaurantOwner || false,
                    birthdayDate: this.user.birthdayDate || '',
                    contactNumber: this.user.contactNumber || '',
                });
            })
        );
    }

    initializeForm() {
        this.fg = this.fb.group({
            name: [this.user?.name, Validators.required],
            surname: [this.user?.surname, Validators.required],
            email: [this.user?.email, [Validators.required, Validators.email]],
            isRestaurantOwner: [this.user?.isRestaurantOwner || false],
            birthdayDate: [this.user?.birthdayDate, Validators.required],
            contactNumber: [this.user?.contactNumber, Validators.required]
        });
    }

    toggleIsToEdit(fieldName: string): void {
        this.isEdit[fieldName] = !this.isEdit[fieldName];
    }
    updateUser(): void {
        const updatedUser = {
            id: this.user.id,
            name: this.fg.value.name,
            surname: this.fg.value.surname,
            email: this.fg.value.email,
            isRestaurantOwner: this.fg.value.isRestaurantOwner,
            birthdayDate: this.fg.value.birthdayDate,
            contactNumber: this.fg.value.contactNumber,
            restaurantId: this.user.restaurantId,
            password: this.user.password,
            salary: this.user.salary
        };
        this.userService.updateUser(updatedUser).subscribe()
        this.getCurrentUser();
        for (const key in this.isEdit) {
            if (this.isEdit.hasOwnProperty(key)) {
                this.isEdit[key] = false;
            }
        }
    }

}
