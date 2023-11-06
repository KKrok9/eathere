import { Component } from '@angular/core';
import { AuthService } from './services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'eathere-client';

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.checkIfTokenExists();
    }



    private checkIfTokenExists(): void {
        var token = localStorage.getItem('jwt');
        var isLoggedIn = (token !== null);
        console.log(isLoggedIn);
        if (isLoggedIn) {
            this.router.navigateByUrl('/home');
        }
        this.authService.updateIsLoggedIn(isLoggedIn);

    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    logout(): void {
        this.authService.updateIsLoggedIn(false);
        localStorage.removeItem('jwt');
    }
}
