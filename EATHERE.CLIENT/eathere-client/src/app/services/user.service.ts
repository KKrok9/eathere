import { Observable } from "rxjs";
import { HttpRequestsService } from "./http-requests.service";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
@Injectable({
    providedIn: 'root'
})

export class UserService extends HttpRequestsService {

    getCurrentlyLoggedUser(): Observable<User> {
        return this.get<User>('User/GetCurrentlyLoggedUser');
    }

    updateUser(item: User): Observable<User> {
        return this.put<User>('User/UpdateUser', item);
    }

}