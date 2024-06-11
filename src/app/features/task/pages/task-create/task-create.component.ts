import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskCreateRequest } from '../../models/task-create.request';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../states/tasks.action';
import { selectMember } from 'src/app/core/auth/states/members.selector';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styles: ``
})
export class TaskCreateComponent {
  taskCreateForm: FormGroup;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.select(selectMember).subscribe({
      next: member => {
        this.taskCreateForm = new FormGroup({
          title: new FormControl(''),
          description: new FormControl(''),
          dueDate: new FormControl(new Date()),
          status: new FormControl('new'),
          priority: new FormControl(0),
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
