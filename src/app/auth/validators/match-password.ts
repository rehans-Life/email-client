import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

// We need to make use of the Injectable decorator to
// make this class injectable into other components

@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  // On the basis on whom this validator is being
  // applied on either the formGroup level or
  // the field level you will recieve either the
  // formGroup or the formControl of the element.

  // We are implementing this validator on the formGroup
  // level hence we are going to recieve the formGroup
  // whenever this validator is run
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;

    // If passwords match then no error so we return null
    if (password === passwordConfirmation) return null;

    // The returned object will get merged with the
    // formGorup errors object.
    return { passwordDontMatch: true };
  }
}
