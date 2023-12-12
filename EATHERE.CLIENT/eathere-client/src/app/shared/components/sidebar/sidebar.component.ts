import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService, UserService } from 'src/app/services';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    currentUser!: User;
    private subscrpiton = new Subscription();
    constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

    ngOnInit(): void {
        this.getUser();
    }

    logout(): void {
        this.authService.updateIsLoggedIn(false);
        localStorage.removeItem('jwt');
        window.location.reload();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    private getUser(): void {
        this.subscrpiton.add(
            this.userService.getCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.currentUser = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        );
    }
}
