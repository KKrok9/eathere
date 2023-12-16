import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { WorkerDto } from "../models/worker-dto.model";

@Injectable({
    providedIn: "root"
})
export class WorkerService extends HttpRequestsService {

    getAllWorkersFromRestaurant(): Observable<WorkerDto[]> {
        return this.get<any>("Worker/GetAllWorkersFromRestaurant");
    }

    removeWorkerFromRestaurant(worker: WorkerDto): Observable<any> {
        return this.put<any>("Worker/RemoveUserFromRestaurant", worker)
    }

    getWorkerById(id: string): Observable<any> {
        return this.get<any>(`Worker/GetWorkerById/${id}`);
    }

    updateWorker(worker: WorkerDto): Observable<any> {
        return this.put<any>("Worker/UpdateWorker", worker);
    }
}