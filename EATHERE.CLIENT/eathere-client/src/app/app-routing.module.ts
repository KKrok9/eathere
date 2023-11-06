import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/containers/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/containers/register-page/register-page.component';
import { HomePageComponent } from './modules/home/containers/home-page/home-page.component';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
