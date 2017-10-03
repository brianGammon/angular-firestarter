import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  templateUrl: './flock.component.html',
  styleUrls: ['./flock.component.scss']
})
export class FlockComponent implements OnInit {
  flock: FirebaseObjectObservable<any> = null;
  chickens: FirebaseListObservable<any> = null;
  private flockId: string;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.route.params.subscribe(params => {
      this.flockId = params['flockId'];
      this.flock = this.db.object('flocks/' + this.flockId);
    })
  }

  ngOnInit() {
    const chickenPath = 'chickens/' + this.flockId;
    this.chickens = this.db.list(chickenPath);
  }

  deleteChicken(key) {
    console.log(key);
    this.chickens.remove(key);
  }

  getKeys(chickens: any) {
    console.log(chickens);
    return Object.keys(chickens);
  }

}
