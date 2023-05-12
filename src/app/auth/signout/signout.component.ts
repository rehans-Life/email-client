import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.sass'],
})
export class SignoutComponent {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.signout().subscribe(() => {
      // Sending the user back to the sign in page after they
      // have signed out.
      this.router.navigateByUrl('/');
    });
  }
}
