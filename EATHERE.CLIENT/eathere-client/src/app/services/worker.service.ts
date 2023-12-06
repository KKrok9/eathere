import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class WorkerService extends HttpRequestsService {

    getAllWorkersFromRestaurant(): Observable<any> {
        return this.get<any>("Worker/GetAllWorkersFromRestaurant");
    }

    //removeWorkerFromRestaurant(id: string): Observable<any> {
    //  return this.post<any>(`Worker/RemoveUserFromRestaurant`, id)
    //} -> NEED TO CHANGE IT -> JUST DO UPDATE WORKER BUT NOT NOW

    getWorkerById(id: string): Observable<any> {
        return this.get<any>(`Worker/GetWorkerById/${id}`);
    }
}