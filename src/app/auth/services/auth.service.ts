import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

interface UsernameResponse {
  available: boolean | string;
}

interface SignUpCredentails {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignInResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInCredentails {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  root = 'https://api.angular-email.com';
  // Initially behavior subjrct is going to emit false initially
  signedIn$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) {}

  signup(credentails: SignUpCredentails) {
    return this.http
      .post<SignupResponse>(`${this.root}/auth/signup`, credentails)
      .pipe(
        tap(({ username }) => {
          this.username = username;
          // If the user is signed in then we emit true
          // out of the signedIn subject and this is going to
          // be the latest value emitted by the behavior subject
          // whenever someone subcribes to it.
          this.signedIn$.next(true);
        })
      );
  }

  signin(credentails: SignInCredentails) {
    return (
      this.http
        .post<SignInResponse>(`${this.root}/auth/signin`, credentails)
        // If there is no error that means the credentails were correct
        // so we emit true thorugh our behavorial subject.
        .pipe(
          tap(({ username }) => {
            this.username = username;
            this.signedIn$.next(true);
          })
        )
    );
  }

  signout() {
    return (
      this.http
        .post(`${this.root}/auth/signout`, {})
        // We emit a false through our behavorial subject cause
        // the user is no longer signed in anymore.
        .pipe(tap(() => this.signedIn$.next(false)))
    );
  }

  checkAuth() {
    // This is to check if the user is already signed in or not
    return this.http.get<SignedInResponse>(`${this.root}/auth/signedin`).pipe(
      // If the user is authenticated we emit true out of our
      // behaviorial subject else false
      tap(({ authenticated, username }) => {
        this.username = username;
        if (authenticated) this.signedIn$.next(true);
        else this.signedIn$.next(false);
      })
    );
  }

  checkUsername(username: string) {
    return (
      this.http
        .post<UsernameResponse>(`${this.root}/auth/username`, {
          username,
        })
        // If no error then we return a null cause the username is unique
        .pipe(
          map(() => null),
          // This should return a observable
          catchError((err) => {
            // The of operators returns a obserable that returns the
            // given value
            if (err.error.username) return of({ notAvailable: true });
            return of({ networkError: true });
          })
        )
    );
  }
}
