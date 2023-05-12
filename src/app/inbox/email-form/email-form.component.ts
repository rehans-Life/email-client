import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.sass'],
})
export class EmailFormComponent {
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();

  emailForm: FormGroup;

  ngOnInit() {
    const { from, to, text, subject } = this.email;
    this.emailForm = new FormGroup({
      // Assigns the initial value and disables the input on
      // which this field is applied to.
      from: new FormControl({ value: from, disabled: true }),
      to: new FormControl(to, [Validators.required, Validators.email]),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    this.emailSubmit.emit(this.emailForm.value);
  }
}
