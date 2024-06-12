import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from 'src/app/share/models/dictionary.model';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: ``
})
export class TaskFormComponent {
  @Input() taskForm: FormGroup;
  @Input() originalPath = '';
  @Output() onSubmit = new EventEmitter<Task>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.taskForm);
  }

  titleValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Title is required.'
      }
    ]
  };

  descriptionValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Description is required.'
      }
    ]
  };

  dueDateValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Due date is required.'
      }
    ]
  };

  priorityValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Priority is required.'
      },
      {
        key: 'min',
        value: 'Priority must be atleast 0.'
      }
    ]
  };

  statusOptions: Dictionary<string, string> = {
    data: [
      {
        key: 'Ongoing',
        value: 'Ongoing'
      },
      {
        key: 'Finished',
        value: 'Finished'
      },
    ]
  }

  submit() {
    this.onSubmit.emit(this.taskForm.value);
  }

  onBack() {
    this.router.navigate(['tasks']);
  }
}
