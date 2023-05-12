import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  //   HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  // So the req param is storing the request object.
  // next is a method that we can use to send our modified
  // request object to the next interceptor.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Cloning the request object and changing the
    // withCredentials property from it so that the
    // browser cna accept the cookies that are sent
    // in response.
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    // This returns an observable which will emit
    // events at different stages of the request
    // being sent so it will emit an event when
    // request is SENT, when we get a response
    // if we get an error and etc.
    return next.handle(modifiedReq);
    // .pipe(
    //   tap((val) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Request is Sent');
    //     }
    //     if (val.type === HttpEventType.Response) {
    //       console.log('Response Was Recived', val);
    //     }
    //   })
    // );
  }
}
