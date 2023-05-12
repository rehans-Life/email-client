import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Email } from './email';
import { inject } from '@angular/core';
import { EmailService } from './email.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService {
  constructor() {}

  // This function is going to run before the route is activated and
  // the component is rendered onto the users screen

  // This is so that we can prematurely resolve the data before the
  // component is rendered onto the screen of the user.

  // This function also recieves as parameter the information
  // about the current route for which this resolver is being ran.

  static resolve: ResolveFn<Email | boolean> = (
    route: ActivatedRouteSnapshot
  ) => {
    const { id } = route.params;
    const router = inject(Router);
    // The observable returned will automicatically be subscribed
    // and the data emitted will be assigned to our email property
    // of the data object.
    return (
      inject(EmailService)
        .getEmail(id)
        // If email not found we navigate the user to the not-found
        // path.
        .pipe(catchError(() => router.navigateByUrl('/inbox/not-found')))
    );
  };
}
