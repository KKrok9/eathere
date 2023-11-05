import { Observable } from "rxjs";
import { Register } from "../models/register.model";
import { HttpRequestsService } from "./http-requests.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService extends HttpRequestsService {

    isLoggedIn = false;

    register(userToRegister: Register): Observable<any> { // OBSERVABLE - USEFUL FOR HTTP REQUESTS
        return this.post<any>('Auth/Register', userToRegister);
    }
}