import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { Observable, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../states/tasks.action';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styles: ``
})
export class TaskEditComponent {
  taskEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params => {
        return this.tasksService.getOne(Number(params.get('id')));
      }))
    )
      .subscribe({
        next: task => {
          console.log(task);
          this.taskEditForm = new FormGroup({
            id: new FormControl(task.id),
            title: new FormControl(task.title, Validators.required),
            description: new FormControl(task.description, Validators.required),
            dueDate: new FormControl(task.dueDate, Validators.required),
            status: new FormControl(task.status),
            priority: new FormControl(task.priority, [
              Validators.required,
              Validators.min(0)
            ]),
            memberId: new FormControl(task.memberId),
          });
        }
      })
  }

  onSubmit(task: Task) {
    console.log(task);

    this.tasksService.update(task)
      .subscribe({
        next: res => {
          console.log(res);
          this.store.dispatch(TasksActions.update({
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
