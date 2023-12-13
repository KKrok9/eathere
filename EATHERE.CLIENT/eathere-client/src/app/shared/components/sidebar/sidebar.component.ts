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
export class SidebarComponent {
    constructor(private authService: AuthService) { }

    logout(): void {
        this.authService.updateIsLoggedIn(false);
        localStorage.removeItem('jwt');
        window.location.reload();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

}
