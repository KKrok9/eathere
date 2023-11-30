import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersPageComponent } from './containers/all-orders-page/all-orders-page.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AllOrdersPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AllOrdersModule { }
