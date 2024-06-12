import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '../../models/dictionary.model';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styles: ``
})
export class TextInputComponent {
  @Input() property: string;
  @Input() form: FormGroup;
  @Input() validationErrors: Dictionary<string, string> = {
    data: []
  };
  @Input() type = 'text';
  @Input() label: string;

  get data() {
    return this.form.get(this.property);
  }
}
