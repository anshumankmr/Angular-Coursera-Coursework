import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  dish?: Dish;
  promotion?: Promotion;
  leader?: Leader;
  dishErrMess?: string;
  leadErrMess?: string;
  promotionErrMess ?:string;
  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService , @Inject('BaseURL') public BaseURL) {  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(feat => {
      this.dish =  feat;
    },errMess => {
      this.dishErrMess = <any>errMess;
    });
    this.promotionService
    .getFeaturedPromotion()
    .subscribe(x => {this.promotion = x[0];}
    ,errMess => {
      this.promotionErrMess = <any>errMess;
      console.log(this.promotionErrMess);
    });
    this.leaderService
    .getFeaturedLeader()
    .subscribe(
      x => {this.leader =  x}
      ,errMess => {
      this.leadErrMess = <any>errMess;
      console.log(this.leadErrMess);
    });
  }

}
