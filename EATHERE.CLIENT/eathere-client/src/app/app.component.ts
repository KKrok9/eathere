import { Component } from '@angular/core';
import { AuthService, UserService } from './services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'eathere-client';
    constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

    ngOnInit(): void {
        this.checkIfTokenExists();
    }

    private checkIfTokenExists(): void {
        var token = localStorage.getItem('jwt');
        var isLoggedIn = (token !== null);
        if (isLoggedIn) {
            this.router.navigateByUrl('/home');
        }
        this.authService.updateIsLoggedIn(isLoggedIn);

    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }
}
