import { Component, OnInit } from '@angular/core';
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
  constructor(private leaderService: LeaderService, private location: Location ,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.leaderService.getSpecificLeader(id).subscribe(x => {this.leader = x});
    this.leaderService.getAllLeaders().subscribe(x => {this.leaders = x});
  }

}