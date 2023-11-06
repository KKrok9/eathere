import { Observable } from "rxjs";
import { Register } from "../models/register.model";
import { HttpRequestsService } from "./http-requests.service";
import { Injectable } from "@angular/core";
import { Login } from "../models/login.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService extends HttpRequestsService {

    isLoggedIn = false;

    register(userToRegister: Register): Observable<any> { // OBSERVABLE - USEFUL FOR HTTP REQUESTS
        return this.post<any>('Auth/Register', userToRegister);
    }

    login(userToLogin: Login): Observable<any> {
        return this.post<any>('Auth/Login', userToLogin);
    }

    updateIsLoggedIn(value: boolean): void {
        this.isLoggedIn = value;
    }
}