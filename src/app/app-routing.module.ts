import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishdetailComponent }  from "./dishdetail/dishdetail.component"

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
