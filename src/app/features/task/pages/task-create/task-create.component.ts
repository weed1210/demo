import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { TasksActions } from '../../states/tasks.action';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styles: ``
})
export class TaskCreateComponent {
  taskCreateForm: FormGroup;

  constructor(
    public tasksService: TasksService,
    public store: Store,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.select(selectMember).subscribe({
      next: member => {
        this.taskCreateForm = new FormGroup({
          id: new FormControl(''),
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          dueDate: new FormControl(new Date(), Validators.required),
          status: new FormControl('Ongoing'),
          priority: new FormControl(0, [
            Validators.required,
            Validators.min(0)
          ]),
          memberId: new FormControl(member.UserId),
          coperatorId: new FormControl(undefined),
        });
      }
    })
  }

  onSubmit(task: Task) {
    console.log(task);
    const { id, ...request } = task;
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
  }
}
