import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class TableService extends HttpRequestsService {

    addTable(table: any): Observable<any> {
        return this.post<any>("Table/AddTable", table);
    }
    updateTable(table: any): Observable<any> {
        return this.put<any>("Table/UpdateTable", table);
    }
    getTableById(id: any): Observable<any> {
        return this.get<any>(`Table/GetTableById/${id}`)
    }
    getAllTablesFromRestaurant(restaurantId: any): Observable<any> {
        return this.get<any>(`Table/GetAllTablesFromRestaurant/${restaurantId}`);
    }
    detleteTable(id: any): Observable<any> {
        return this.delete<any>(`Table/DeleteTable/${id}`);
    }
}