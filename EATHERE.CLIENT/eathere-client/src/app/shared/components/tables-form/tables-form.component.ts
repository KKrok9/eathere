import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Table } from 'src/app/models/table.model';
import { RestaurantService, TableService } from 'src/app/services';

@Component({
    selector: 'app-tables-form',
    templateUrl: './tables-form.component.html',
    styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent implements OnInit {

    fg: FormGroup;
    restaurant!: Restaurant;
    tables: Table[] = [];
    private subscription = new Subscription();

    constructor(private tableService: TableService,
        private fb: FormBuilder,
        private restaurantService: RestaurantService) {
        this.fg = this.getFg();
    }
    ngOnInit(): void {
        this.setRestaurant();
    }
    private getFg(): any {
        return this.fb.group({
            name: "",
            capacity: ""
        })
    }

    addDish(): void {
        if (this.restaurant) {
            const newTable = {
                name: this.fg.value.name,
                capacity: this.fg.value.capacity,
                isTaken: false,
                restaurantId: this.restaurant.id
            }

            this.tableService.addTable(newTable).subscribe(() => {
                this.loadTables();
                this.fg.reset();
            })
        }
    }

    private setRestaurant(): void {
        this.subscription.add(
            this.restaurantService.getRestaurantOfCurrentlyLoggedUser().subscribe(
                (response) => {
                    this.restaurant = response;
                    if (this.restaurant) {
                        this.loadTables();
                    }
                },
                (error) => {
                    console.error(error);
                }
            )
        );
    }

    private loadTables(): void {
        this.subscription.add(
            this.tableService.getAllTablesFromRestaurant(this.restaurant.id).subscribe(
                (response) => {
                    this.tables = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
    }

    toggleStatus(table: Table) {
        if (this.restaurant) {
            const updatedTable = {
                id: table.id,
                Name: table.name,
                capacity: table.capacity,
                isTaken: !table.isTaken,
                restaurantId: this.restaurant.id
            }

            this.tableService.updateTable(updatedTable).subscribe(() => {
                this.loadTables();
            })
        }
    }

    deleteTable(id: string): void {
        this.subscription.add(
            this.tableService.detleteTable(id).subscribe(
                () => {
                    this.loadTables();
                }
            )
        )
    }

}
