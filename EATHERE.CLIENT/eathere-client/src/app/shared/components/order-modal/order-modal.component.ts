import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, OrderService } from 'src/app/services';

@Component({
    selector: 'app-order-modal',
    templateUrl: './order-modal.component.html',
    styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

    @Input() restaurantId: any;
    @Input() dishes: any;
    @Input() tables: any;
    @Input() orders: any;
    fg: FormGroup;
    currentUserId!: string;
    selectedDishes: any = [""]
    private subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private orderService: OrderService
    ) {
        this.fg = this.getFg();
    }

    closeOrderModal(): void {
        this.restaurantId = null;
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
                dishIds: this.selectedDishes.flat()
            };
            this.orders.push(newOrder)
            this.subscription.add(
                this.orderService.addOrder(newOrder).subscribe((response) => {
                })
            )
        }

        this.closeOrderModal();

    }
    private getFg() {
        return this.fb.group({
            dishIds: [],
            table: "",
            description: ""
        })
    }
    private getCurrentUserId() {
        this.authService.getMyId().subscribe((response) => {
            this.currentUserId = response;
        })
    }

    addDish() {
        this.selectedDishes.push("");
        const dishIdsControl = this.fg.get('dishIds');
        if (dishIdsControl) {
            dishIdsControl.setValue("");
        }
    }



    updateSelectedDish(dishId: string, index: number): void {
        if (dishId !== "") {
            this.selectedDishes[index] = dishId;
        }
    }
}
