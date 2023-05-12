import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

// This validator has to be accessed by our component
// by using dependency injection why because its going
// to make use of another dependency so by injecting it
// angular will create an instance of this validator with
// that dependency and pass it in and hence we dont wont
// have to do it which we wouldve if we manually created
// an instance of this Validator in our component
@Injectable({
  providedIn: 'root',
})
// This class is an async validator which means it should return
// a promise or an observable.
export class UniquePassword implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate(control: FormControl) {
    const username = control.value;
    return this.auth.checkUsername(username);
  }
}
