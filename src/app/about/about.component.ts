import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader !: Leader;
  leaders !: Leader[];
  constructor(private leaderService: LeaderService, private location: Location ,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.leaderService.getSpecificLeader(id).then(x => {this.leader = x});
    this.leaderService.getAllLeaders().then(x => {this.leaders = x});
  }

}