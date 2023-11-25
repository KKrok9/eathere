import { Observable } from "rxjs";
import { HttpRequestsService } from "./http-requests.service";
import { Injectable } from "@angular/core";
import { Restaurant } from "../models/restaurant.model";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService extends HttpRequestsService {

    addRestaurant(restaurant: any): Observable<any> {
        return this.post<any>("Restaurant/AddRestaurant", restaurant);
    }

    getRestaurantByOwnerId(id: any): Observable<any> {
        return this.get<any>(`Restaurant/GetRestaurantByOwnerId/${id}`)
    }

    updateRestaurant(restaurant: any): Observable<any> {
        return this.put<any>("Restaurant/UpdateRestaurant", restaurant);
    }

    getRestaurantOfCurrentlyLoggedUser(): Observable<any> {
        return this.get<any>("Restaurant/GetRestaurantOfCurrentlyLoggedUser");
    }


}