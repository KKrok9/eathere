import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesFormComponent } from './components/tables-form/tables-form.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';

const COMPONENTS = [DishModalComponent, TablesFormComponent, OrderModalComponent, ActiveOrdersComponent, SidebarComponent];

@NgModule({
    declarations: [
        COMPONENTS,
        ActiveOrdersComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    exports: [COMPONENTS]
})
export class SharedModule { }
