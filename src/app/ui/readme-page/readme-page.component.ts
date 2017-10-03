import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'readme-page',
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss']
})
export class ReadmePageComponent implements OnInit {
  flock: FirebaseObjectObservable<any> = null;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    const itemPath = 'flocks/flockid1';
    this.flock = this.db.object(itemPath)
  }

  getKeys(flock: string) {
    return Object.keys(flock);
  }

}
