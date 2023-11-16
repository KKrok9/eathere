import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './containers/home-page/home-page.component';

const COMPONENTS = [HomePageComponent]

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [COMPONENTS]
})
export class HomeModule { }
