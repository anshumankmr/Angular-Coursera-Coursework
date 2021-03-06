import { Routes } from "@angular/router";
import { MenuComponent } from '../menu/menu.component';

import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

export const routes: Routes = [
    { path: 'home' , component: HomeComponent},
    { path: 'menu' , component: MenuComponent},
    { path: 'contactus', component: ContactComponent},
    { path: 'dishdetail/:id', component: DishdetailComponent},
    { path: 'aboutus', component: AboutComponent},
    { path: '', redirectTo:'/home',pathMatch:'full'}
];