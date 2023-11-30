import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesFormComponent } from './components/tables-form/tables-form.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';

const COMPONENTS = [DishModalComponent, TablesFormComponent, OrderModalComponent];

@NgModule({
    declarations: [
        COMPONENTS,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [COMPONENTS]
})
export class SharedModule { }
