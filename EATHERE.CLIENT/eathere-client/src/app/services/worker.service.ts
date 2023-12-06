import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class WorkerService extends HttpRequestsService {

    getAllWorkersFromRestaurant(): Observable<any> {
        return this.get<any>("Worker/GetAllWorkersFromRestaurant");
    }

    removeWorkerFromRestaurant(worker: User): Observable<any> {
        return this.put<any>("Worker/RemoveUserFromRestaurant", worker)
    }

    getWorkerById(id: string): Observable<any> {
        return this.get<any>(`Worker/GetWorkerById/${id}`);
    }

    updateWorker(worker: User): Observable<any> {
        return this.put<any>("Worker/UpdateWorker", worker);
    }
}