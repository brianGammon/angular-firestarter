import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  templateUrl: './chicken-profile.component.html',
  styleUrls: ['./chicken-profile.component.scss']
})
export class ChickenProfileComponent implements OnInit {
  // eggs: FirebaseListObservable<any> = null;
  chicken: FirebaseObjectObservable<any> = null;
  heaviest: any;
  total: number;
  private chickenId: string;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.route.params.subscribe(params => {
      console.log(params);

      this.chickenId = params['chickenId'];
      this.chicken = this.db.object('chickens/flockId1/' + this.chickenId);
    })
  }

  ngOnInit() {
    const eggsPath = 'eggs/flockId1';
    const eggs = this.db.list(eggsPath, {
      query: {
        orderByChild: 'chicken',
        equalTo: this.chickenId
      }
    });

    eggs.subscribe(data => {
      // this.getStreak(eggs);
      this.total = data.length;
      if (this.total > 0) {
        this.heaviest = this.getHeaviest(data);
      }
      console.log(this.heaviest);
    });
  }

  getStreak(eggs) {
    // let days = 0;

    // _.sortBy(eggs, 'date');

    // _.forEach(eggs, function (egg) {
    //   console.log(egg);
    //  });
  }

  getHeaviest(eggs) {
    let heaviest = 0;
    let heaviestEgg = null;
    eggs.forEach(egg => {
      console.log(+egg.weight);
      if (egg.weight && +egg.weight >= heaviest) {
        heaviest = +egg.weight;
        heaviestEgg = egg;
      }
    });
    return heaviestEgg;
  }

}
