import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniquePassword } from '../validators/unique-password';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent {
  authForm: FormGroup = new FormGroup(
    {
      username: new FormControl(
        '',
        // All Syncrhonous Validators which means
        // they all run instancely after we type
        // in the input field.
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        // All Asynchrnous Validators
        [(control: FormControl) => this.uniquePassword.validate(control)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    },
    // Applying validators to the formGroup
    {
      validators: [this.matchPassword.validate],
    }
  );
  // Injecting my MatchPassword class
  constructor(
    private matchPassword: MatchPassword,
    private uniquePassword: UniquePassword,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.signup(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        if (!err.status) {
          // Adding a new error at the form level
          this.authForm.setErrors({ noConnection: true });
        } else this.authForm.setErrors({ unknownError: true });
      },
    });
  }

  showError() {
    const { password, passwordConfirmation } = this.authForm.controls;
    return (
      this.authForm.errors &&
      password.touched &&
      passwordConfirmation.touched &&
      password.dirty &&
      passwordConfirmation.dirty
    );
  }
}
