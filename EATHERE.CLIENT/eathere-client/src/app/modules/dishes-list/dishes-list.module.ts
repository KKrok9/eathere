import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesListPageComponent } from './containers/dishes-list-page/dishes-list-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        DishesListPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class DishesListModule { }
