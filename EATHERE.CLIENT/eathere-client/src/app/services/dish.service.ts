import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DishService extends HttpRequestsService {

    addDish(dish: any): Observable<any> {
        return this.post<any>("Dish/AddDish", dish);
    }

    updateDish(dish: any): Observable<any> {
        return this.put<any>("Dish/UpdateDish", dish);
    }

    getDishById(id: any): Observable<any> {
        return this.get<any>(`Dish/GetDishById/${id}`);
    }
    deleteDish(id: any): Observable<any> {
        return this.delete<any>(`Dish/DeleteDish/${id}`);
    }
    getAllDishesFromSingleRestaurant(restaurantId: any): Observable<any> {
        return this.get<any>(`Dish/GetAllDishesFromSingleRestaurant/${restaurantId}`);
    }

}