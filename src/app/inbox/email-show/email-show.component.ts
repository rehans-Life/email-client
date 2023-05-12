import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.sass'],
})
export class EmailShowComponent {
  email: Email;
  // This Dependency gives us infromation about
  // our current route in the form of behaviorial
  // subjects to we have to subcribe to them to
  // get the info out.
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {
    // We can be sure upon the rendering of this component
    // the data is already recieved from all the resolvers.
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit() {
    // // Getting the ip url param value so we can
    // // make the request this behavior subject
    // // is going to emit an event whenever the
    // // params change within the url
    // this.route.params
    //   .pipe(
    //     // SwitchMap returns a subscribed observable and now the observer
    //     // is listening for the events that are being emitted by this new
    //     // observable so its litening for that http request to complete
    //     // But if route changes and a new event is triggered then the
    //     // previous subcribed observable is going to be unsubscibed hence
    //     // the http request made by it would be cancelled which is good
    //     // because that request was a waste already and now the observer
    //     // will listen for this new http request to complete.
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     })
    //   )
    //   .subscribe((email) => {
    //     this.email = email;
    //   });
  }
}
