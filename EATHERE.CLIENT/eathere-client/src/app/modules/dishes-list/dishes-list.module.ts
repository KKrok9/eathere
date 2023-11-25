import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesListPageComponent } from './containers/dishes-list-page/dishes-list-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        DishesListPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class DishesListModule { }
