import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/containers/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/containers/register-page/register-page.component';
import { HomePageComponent } from './modules/home/containers/home-page/home-page.component';
import { MyProfileModule } from './modules/my-profile/my-profile.module';
import { MyProfilePageComponent } from './modules/my-profile/containers/my-profile-page/my-profile-page.component';
import { WorkersPageComponent } from './modules/workers/containers/workers-page/workers-page.component';
import { StatisticsPageComponent } from './modules/statistics/containers/statistics-page/statistics-page.component';
import { MyRestaurantModule } from './modules/my-restaurant/my-restaurant.module';
import { MyRestaurantPageComponent } from './modules/my-restaurant/containers/my-restaurant-page/my-restaurant-page.component';
import { AllOrdersPageComponent } from './modules/all-orders/containers/all-orders-page/all-orders-page.component';
import { DishesListPageComponent } from './modules/dishes-list/containers/dishes-list-page/dishes-list-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'my-profile', component: MyProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'dishes-list', component: DishesListPageComponent, canActivate: [AuthGuard] },
    { path: 'all-orders', component: AllOrdersPageComponent, canActivate: [AuthGuard] },
    { path: 'my-restaurant', component: MyRestaurantPageComponent, canActivate: [AuthGuard] },
    { path: 'statistics', component: StatisticsPageComponent, canActivate: [AuthGuard] },
    { path: 'workers', component: WorkersPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
