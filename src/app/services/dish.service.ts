import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?

@Injectable({
  providedIn: 'root'
})
export class DishService {
  //updating the method to take care of observable
  constructor() { }
  getDishes(): Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000));
  }
  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)); 
  }
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
