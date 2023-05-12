import { Component } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EmailService } from '../email.service';

interface SendEmail {
  to: string;
  subject: string;
  text: string;
}

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.sass'],
})
export class EmailCreateComponent {
  // Default values for our create form
  email: Email;
  showModal = false;

  constructor(private auth: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      from: `${this.auth.username}@ste-grider.com`,
      to: '',
      subject: '',
      text: '',
      html: '',
    };
  }

  onSend(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
