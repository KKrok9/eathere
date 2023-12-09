import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { Order } from 'src/app/models/order.model';
import { Table } from 'src/app/models/table.model';

@Component({
    selector: 'app-active-orders',
    templateUrl: './active-orders.component.html',
    styleUrls: ['./active-orders.component.scss']
})
export class ActiveOrdersComponent {

    @Input() orders!: Order[];
    @Input() tables!: Table[];
    @Input() dishes!: Dish[];
    @Output() orderDone = new EventEmitter<Order>();
    activeOrders: Order[] = []; // Initialize the array


    selectNameById<T extends { id: string, name: string }>(items: T[], id: string): string {
        let itemName = '';
        items.forEach(element => {
            if (element.id === id) {
                itemName = element.name;
            }
        });
        return itemName;
    }

    makeOrderDone(order: Order): void {
        this.orderDone.emit(order);
    }
}
