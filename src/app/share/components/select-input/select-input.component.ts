import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from '../../models/dictionary.model';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styles: ``
})
export class SelectInputComponent {
  @Input() property: string;
  @Input() form: FormGroup;
  @Input() validationErrors: Dictionary<string, string> = {
    data: []
  };
  @Input() label: string;
  @Input() options: Dictionary<string, string>;

  get data() {
    return this.form.get(this.property);
  }
}
