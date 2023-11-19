import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './modules/home/home.module';
import { MyRestaurantModule } from './modules/my-restaurant/my-restaurant.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AuthModule,
        HttpClientModule,
        HomeModule,
        MyRestaurantModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
