import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DishTypeService extends HttpRequestsService {

    addDishType(dishType: any): Observable<any> {
        return this.post<any>("DishType/AddDishType", dishType);
    }

    deleteDishType(id: any): Observable<any> {
        return this.delete<any>(`DishType/DeleteDishType/${id}`);
    }

    getDishTypeById(id: any): Observable<any> {
        return this.get<any>(`DishType/GetDishTypeById/${id}`);
    }

    getAllDishTypesFromRestaurant(restaurantId: any): Observable<any> {
        return this.get<any>(`DishType/GetAllDishTypesFromRestaurant/${restaurantId}`);
    }
}