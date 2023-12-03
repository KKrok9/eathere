import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Table } from 'src/app/models/table.model';
import { AuthService, DishService, OrderService, TableService } from 'src/app/services';

@Component({
    selector: 'app-order-modal',
    templateUrl: './order-modal.component.html',
    styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

    @Input() restaurantId: any;
    @Input() dishes: any;
    @Input() tables: any;
    fg: FormGroup;
    currentUserId!: string;
    private subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private orderService: OrderService
    ) {
        this.fg = this.getFg();
    }

    closeOrderModal(): void {
        this.restaurantId = null; // Set restaurantId to null to hide the modal
    }

    ngOnInit(): void {
        this.getCurrentUserId();
    }

    addOrder(): void {
        if (this.restaurantId && this.dishes) {
            const newOrder = {
                orderAccepterId: this.currentUserId,
                tableId: this.fg.value.table,
                restaurantId: this.restaurantId,
                description: this.fg.value.description,
                orderStatus: "ACTIVE",
                dishIds: [this.fg.value.dishIds]
            };
            this.subscription.add(
                this.orderService.addOrder(newOrder).subscribe((response) => {
                    console.log(response);
                })
            )
        }

    }
    private getFg() {
        return this.fb.group({
            dishIds: "",
            table: "",
            description: ""
        })
    }
    private getCurrentUserId() {
        this.authService.getMyId().subscribe((response) => {
            this.currentUserId = response;
        })
    }
}
