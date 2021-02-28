import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule }  from '@angular/material/grid-list'
import { MatListModule }  from '@angular/material/list'
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from "./services/dish.service";
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [ DishdetailComponent, MenuComponent ],

  providers: [DishService] ,// a service that must be a provider will provide to the whole application
  bootstrap: [AppComponent]
})
export class AppModule { }
