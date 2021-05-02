import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay,map,catchError } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?
import { ProcessHTTPMsgService } from "../../app/services/process-httpmsg.service";
import { Feedback } from '../shared/feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  //updating the method to take care of observable
  constructor(private http:HttpClient , private processHTTPMsgService: ProcessHTTPMsgService) {}
  giveFeedback(Feedback: Feedback) : Observable<Feedback>{
    const httpOptions =  {
      headers  : new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http
    .post<Feedback>(baseURL + 'feedback/' , Feedback ,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
