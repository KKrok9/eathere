import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [LoginPageComponent, RegisterPageComponent];

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [COMPONENTS]
})
export class AuthModule { }
