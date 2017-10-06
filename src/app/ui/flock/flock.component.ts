import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
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
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.authService.currentUserObservable.subscribe(authState => {
      if (authState) {
        this.db.object(`users/${authState['uid']}`).subscribe((user) => {
          this.flock = this.db.object(`flocks/${user.currentFlockId}`);
          const chickenPath = `chickens/${user.currentFlockId}`;
          this.chickens = this.db.list(chickenPath);
        });
      }
    });
  }

  ngOnInit() {

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
