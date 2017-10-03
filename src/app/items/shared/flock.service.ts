import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// import { Item } from './item';

@Injectable()
export class FlockService {

  private basePath = '/flocks';

  flocks: FirebaseListObservable<any[]> = null; //  list of objects
  flock: FirebaseObjectObservable<any> = null; //   single object

  constructor(
    private db: AngularFireDatabase
  ) { }


  // Return a single observable item
  getFlock(key: string): FirebaseObjectObservable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.flock = this.db.object(itemPath)
    return this.flock
  }

  // Create a bramd new item
  createFlock(flock: any): void {
    this.flocks.push(flock)
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
