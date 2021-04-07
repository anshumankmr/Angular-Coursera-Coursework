import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from "rxjs";// to ensure a lighter load while deploying
import { delay } from "rxjs/operators";//delay operator delays the emitting of an item from the observable?

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor() { }
  getSpecificLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter( (leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  getAllLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}