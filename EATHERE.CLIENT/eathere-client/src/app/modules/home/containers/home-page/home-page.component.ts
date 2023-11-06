import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    constructor(private authService: AuthService, private router: Router) {

    }

    logout(): void {
        this.authService.updateIsLoggedIn(false);
        this.router.navigateByUrl('/');
        localStorage.removeItem('jwt');
    }

}
