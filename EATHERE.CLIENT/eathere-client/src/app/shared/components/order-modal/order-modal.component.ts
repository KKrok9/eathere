import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-order-modal',
    templateUrl: './order-modal.component.html',
    styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent {
    @Input() toggleIsModalVisible: any;

}
