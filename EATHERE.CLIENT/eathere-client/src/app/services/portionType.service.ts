import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PortionTypeService extends HttpRequestsService {

    addPortionType(portionType: any): Observable<any> {
        return this.post<any>("PortionType/AddPortionType", portionType);
    }

    deletePortionType(id: any): Observable<any> {
        return this.delete<any>(`PortionType/DeletePortionType/${id}`);
    }

    getPortionTypeById(id: any): Observable<any> {
        return this.get<any>(`PortionType/GetPortionTypeById/${id}`);
    }

    getAllPortionTypesFromRestaurant(restaurantId: any): Observable<any> {
        return this.get<any>(`Portion/GetAllPortionTypesFromRestaurant/${restaurantId}`);
    }
}