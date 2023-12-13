import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Input() tables!: Table[];
    @Output() toggleTableStatus = new EventEmitter<Table>();
    fg: FormGroup;
    restaurant!: Restaurant;
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

    addTable(): void {
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
                    // Assign the new tables
                    this.tables = response;
                },
                (error) => {
                    console.log(error);
                }
            )
        )
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

    toggleStatus(table: Table): void {
        this.toggleTableStatus.emit(table);
        this.tables = [];
    }

}
