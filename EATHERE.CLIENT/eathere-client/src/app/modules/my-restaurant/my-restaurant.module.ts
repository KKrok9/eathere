import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRestaurantPageComponent } from './containers/my-restaurant-page/my-restaurant-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        MyRestaurantPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MyRestaurantModule { }
