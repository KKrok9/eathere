import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class OrderService extends HttpRequestsService {

    addOrder(dish: any): Observable<any> {
        console.log(dish);
        return this.post<any>("Order/AddOrder", dish);
    }

    updateOrder(order: any): Observable<any> {
        return this.put<any>("Order/UpdateOrder", order);//REMEMBER TO SEND ID
    }

    deleteOrder(id: any): Observable<any> {
        return this.delete<any>(`Order/DeleteOrder/${id}`);
    }

    getOrderById(id: any): Observable<any> {
        return this.get<any>(`Order/GetOrderById/${id}`);
    }

    getAllOrdersFromRestaurant(restaurantId: any): Observable<any> {
        return this.get<any>(`Order/GetAllOrdersFromRestaurant/${restaurantId}`);
    }


}