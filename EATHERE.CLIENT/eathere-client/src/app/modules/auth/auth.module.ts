import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

const COMPONENTS = [LoginPageComponent, RegisterPageComponent];


@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [COMPONENTS]
})
export class AuthModule { }
