import { Injectable } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, take, tap, skipWhile } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}
  // Weather this function returns a true or a false decides if we
  // are going to lazy load our module to the user or not.
  canMatch: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    // Now if we end up returning an observable via this function
    // which we can then that observable must be at one point of
    // time be marked as complete and that first boolean that was
    // emitted will be considered in order to render that module
    // or not.
    return this.auth.signedIn$.pipe(
      // Here we are skipping the emission of any null values
      // So angular doesnt consider and only makes the decision
      // as to weather it should load up the module or not
      // when we get a true.
      skipWhile((value) => value === null),
      // After one emission of an actual value we complete so that
      // angular can actually load up the module.
      take(1),
      // If the user is not authenticated then navigate them to the
      // home route.
      tap((res) => {
        if (!res) {
          this.router.navigateByUrl('/');
        }
      })
    );
  };
}
