import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [DishModalComponent];

@NgModule({
    declarations: [
        COMPONENTS
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
