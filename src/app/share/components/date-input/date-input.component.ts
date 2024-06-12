import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from '../../models/dictionary.model';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styles: ``
})
export class DateInputComponent {
  @Input() property: string;
  @Input() form: FormGroup;
  @Input() validationErrors: Dictionary<string, string> = {
    data: []
  };
  @Input() label: string;

  get data() {
    return this.form.get(this.property);
  }
}
