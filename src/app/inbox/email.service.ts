import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  root = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.root}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.root}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.root}/emails`, email);
  }
}
