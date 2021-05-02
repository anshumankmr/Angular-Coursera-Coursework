import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay,map,catchError } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?
import { ProcessHTTPMsgService } from "../../app/services/process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient , private processHTTPMsgService: ProcessHTTPMsgService) { }
  getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + "promotions/" + id).pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + "promotions" + "?featured=true").pipe(catchError(this.processHTTPMsgService.handleError));;
  }
}

