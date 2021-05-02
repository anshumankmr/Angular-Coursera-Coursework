import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay,map,catchError } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?
import { ProcessHTTPMsgService } from "../../app/services/process-httpmsg.service";
@Injectable({
  providedIn: 'root'
})
export class DishService {
  //updating the method to take care of observable
  constructor(private http:HttpClient , private processHTTPMsgService: ProcessHTTPMsgService) {}
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
  putDish(dish: Dish) : Observable<Dish>{
    const httpOptions =  {
      headers  : new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id , dish ,httpOptions).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
