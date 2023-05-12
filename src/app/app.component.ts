import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'email-client';
  // Storing the observable thats being returned by the service.
  signedIn: BehaviorSubject<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.signedIn = this.auth.signedIn$;
  }

  ngOnInit() {
    this.auth.checkAuth().subscribe(() => {});
  }
}
