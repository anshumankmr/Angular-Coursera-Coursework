import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay,map,catchError } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?
import { ProcessHTTPMsgService } from "../../app/services/process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor(private http:HttpClient , private processHTTPMsgService: ProcessHTTPMsgService) { }
  getSpecificLeader(id: string): Observable<Leader> {
    console.log(baseURL + 'leadership/' + id);
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getAllLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}