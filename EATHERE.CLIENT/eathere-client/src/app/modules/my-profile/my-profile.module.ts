import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfilePageComponent } from './containers/my-profile-page/my-profile-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MyProfilePageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MyProfileModule { }
