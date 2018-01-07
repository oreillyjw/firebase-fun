import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {UserService} from '../user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private _userService: UserService
    ) {
      this._userService.getUser()
        .subscribe(user => {
          console.log(user);
          if (user){
            this.router.navigateByUrl('/account');
          }
        });
    }


onSubmit(formData) {
  if(formData.valid) {
    this.af.auth
    .signInWithEmailAndPassword(formData.value.email, formData.value.password)
    .then(
      (success) => {
      console.log(success);
      this.router.navigate(['/account']);
    }).catch(
      (err) => {
      console.log(err);
      this.error = err;
    })
  }
}

  ngOnInit() {
  }

}
