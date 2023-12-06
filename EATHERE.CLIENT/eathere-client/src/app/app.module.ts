import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './modules/home/home.module';
import { MyRestaurantModule } from './modules/my-restaurant/my-restaurant.module';
import { DishesListModule } from './modules/dishes-list/dishes-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AllOrdersModule } from './modules/all-orders/all-orders.module';
import { WorkersModule } from './modules/workers/workers.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AuthModule,
        HttpClientModule,
        HomeModule,
        MyRestaurantModule,
        AllOrdersModule,
        DishesListModule,
        BrowserAnimationsModule,
        WorkersModule,
        StatisticsModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
