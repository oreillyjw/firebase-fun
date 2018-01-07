import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import * as firebase from 'firebase/app';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})

export class LoginComponent implements OnInit {
  error: any;
  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private _userService:UserService ) {
  }
  loginFb() {
   this.af.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(
       (success) => {
       this.router.navigate(['/account']);
     }).catch(
       (err) => {
       this.error = err;
     })
  }

   loginGoogle() {
     this.af.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      ).then(
         (success) => {
         this.router.navigate(['/account']);
       }).catch(
         (err) => {
         this.error = err;
       })
   }

  ngOnInit() {
    console.log("On init");
    this._userService.getUser()
      .subscribe(user => {
        console.log(user);
        if (user){
          this.router.navigateByUrl('/account');
        }
      });
  }

}
