import { Component } from '@angular/core';
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

    isEdit: { [key: string]: boolean } = {
        nameAndSurname: false,
        email: false,
        roleInRestaurant: false,
        birthdayDate: false,
        contactNumber: false,
        // Add more fields as needed
    };

    private subscription = new Subscription();
    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.getCurrentUser();
    }

    private getCurrentUser(): void {
        this.subscription.add(
            this.userService.getCurrentlyLoggedUser().subscribe(response => (this.user = response))
        );
    }

    toggleIsToEdit(fieldName: string): void {
        this.isEdit[fieldName] = !this.isEdit[fieldName];
        console.log(fieldName, this.isEdit[fieldName]);
    }
    saveUser(): void {
        for (const key in this.isEdit) {
            if (this.isEdit.hasOwnProperty(key)) {
                this.isEdit[key] = false;
            }
        }
    }

}
