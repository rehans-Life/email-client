import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() type: string;
  @Input() controlType = 'input';

  ngOnInit() {}

  showErrors() {
    const { errors, touched, dirty } = this.control;
    return errors && touched && dirty;
  }
}
