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
    this.leader = this.leaderService.getSpecificLeader(id);
    this.leaders = this.leaderService.getAllLeaders();
  }

}