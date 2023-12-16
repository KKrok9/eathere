import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { WorkerDto } from 'src/app/models/worker-dto.model';
import { UserService } from 'src/app/services';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
    selector: 'app-workers-page',
    templateUrl: './workers-page.component.html',
    styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {
    workers: WorkerDto[] = []; //TO CHANGE!
    currentUser!: User;
    private subscrpiton = new Subscription();
    isEditSalaryFieldVisible: boolean[] = [];
    constructor(
        private workerService: WorkerService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getWorkers();
        this.getUser();
    }

    private getWorkers(): void {
        this.subscrpiton.add(
            this.workerService.getAllWorkersFromRestaurant().subscribe(
                (response) => {
                    this.workers = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }
    private getUser(): void {
        this.subscrpiton.add(
            this.userService.getCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.currentUser = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }

    fireWorker(worker: WorkerDto): void {
        this.subscrpiton.add(
            this.workerService.removeWorkerFromRestaurant(worker).subscribe(
                (response) => {
                    console.log(response);
                    this.getWorkers();

                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }

    toggleEditSalaryVisible(index: number): void {
        this.isEditSalaryFieldVisible[index] = !this.isEditSalaryFieldVisible[index];
    }

    setWorkerSalary(worker: WorkerDto, salary: string, index: number): void {
        const updatedWorker = { ...worker, salary: salary };
        this.subscrpiton.add(
            this.workerService.updateWorker(updatedWorker).subscribe(
                (response) => {
                    this.getWorkers();
                    this.toggleEditSalaryVisible(index);
                },
                (error) => {
                    console.log(error);
                }
            )
        );
    }

}
