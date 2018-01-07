import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(public af: AngularFireAuth) {}
  getUser() {
    console.log(this.af.auth);
    return this.af.authState;
    // Hint: you could also transform the value before returning it:
    // return this.af.authState.map(authData => {
    //   new User({
    //     name: authData.displayName,
    //     photoURL: authData.photoURL,
    //     allData: authData
    //   })
    // });
  }
}
