import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
      // tslint:disable-next-line:use-host-property-decorator
      host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
        },
        animations: [
          flyInOut(),
          expand()
        ]
})
export class AboutComponent implements OnInit {
  leader !: Leader;
  leaders !: Leader[];
  leadErrMess!: string;
  constructor(private leaderService: LeaderService, private location: Location ,private route: ActivatedRoute, @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    // this.leaderService
    // .getSpecificLeader(id)
    // .subscribe(x => {this.leader = x},errMess => {
    //   this.leadErrMess = <any>errMess;
    //   console.log(this.leadErrMess);
    // });
    this.leaderService
    .getAllLeaders()
    .subscribe(
      x => {this.leaders = x}
      ,errMess => {
      this.leadErrMess = <any>errMess;
      console.log(JSON.stringify(this.leadErrMess));
    });
  }

}