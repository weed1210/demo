import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/core/auth/models/member.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Dictionary } from 'src/app/share/models/dictionary.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: ``
})
export class TaskFormComponent {
  @Input() taskForm: FormGroup;
  @Input() originalPath = '';
  @Output() onSubmit = new EventEmitter<Task>();

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

  coperatorOptions: Dictionary<string, string> = {
    data: []
  }

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getMembers().subscribe({
      next: (members: Member[]) => {
        this.coperatorOptions.data = members
          .map(member => {
            return {
              key: member.id,
              value: member.email
            }
          })
          .filter(member => member.key !== this.taskForm.get("memberId")?.value)
      }
    })
  }

  submit() {
    this.onSubmit.emit(this.taskForm.value);
  }

  onBack() {
    this.router.navigate(['tasks']);
  }
}
