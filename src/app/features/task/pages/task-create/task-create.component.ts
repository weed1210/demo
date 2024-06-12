import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../states/tasks.action';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { Dictionary } from 'src/app/share/models/dictionary.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styles: ``
})
export class TaskCreateComponent {
  taskCreateForm: FormGroup;

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

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.select(selectMember).subscribe({
      next: member => {
        this.taskCreateForm = new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          dueDate: new FormControl(new Date(), Validators.required),
          status: new FormControl('new'),
          priority: new FormControl(0, [
            Validators.required,
            Validators.min(0)
          ]),
          memberId: new FormControl(member.UserId),
        });
      }
    })
  }

  onSubmit() {
    let request = this.taskCreateForm.value;
    console.log(request);

    this.tasksService.create(request)
      .subscribe({
        next: res => {
          console.log(res);
          this.store.dispatch(TasksActions.create({
            task: res
          }));
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['tasks']);
        }
      });

    // this.tasksService.create(request)
    //   .subscribe({
    //     next: res => {
    //       console.log(res);
    //       this.store.dispatch(TasksActions.create({
    //         task: res
    //       }));
    //     },
    //     error: err => {
    //       console.log(err);
    //     },
    //     complete: () => {
    //       this.router.navigate(['tasks']);
    //     }
    //   });
  }
}
