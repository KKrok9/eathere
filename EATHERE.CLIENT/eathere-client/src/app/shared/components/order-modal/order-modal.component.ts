import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Table } from 'src/app/models/table.model';
import { DishService, TableService } from 'src/app/services';

@Component({
    selector: 'app-order-modal',
    templateUrl: './order-modal.component.html',
    styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

    @Input() restaurantId: any;
    @Input() dishes: any;
    tables: Table[] = [];
    private subscription = new Subscription();

    constructor(
        private dishService: DishService,
        private tableService: TableService,
        private fb: FormBuilder
    ) { }
    ngOnInit(): void {
        this.getTables();
    }

    private getData() {

    }

    private getTables(): void {
        this.subscription.add(
            this.tableService.getAllTablesFromRestaurant(this.restaurantId).subscribe(
                (response) => {
                    this.tables = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }
}
