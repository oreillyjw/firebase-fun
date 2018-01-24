import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import * as firebase from 'firebase/app';
import {UserService} from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class AccountComponent implements OnInit {

  user: User;
  state: string = '';

  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private _userService: UserService
  ) {

  }

  logout() {
     this.af.auth.signOut();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this._userService.getUser()
      .subscribe((user) => {
        console.log( user );
        this.user = new User({
          name: user.displayName,
          photoURL: user.photoURL,
          accountType: user.providerData[0].providerId === "password" ? "Default" : user.providerData[0].providerId,
          email: user.email,
          allData: user
        });
        console.log(this.user);
      });
  }

}
