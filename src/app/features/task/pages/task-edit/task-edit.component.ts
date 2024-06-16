import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { TasksActions } from '../../states/tasks.action';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styles: ``
})
export class TaskEditComponent {
  taskEditForm: FormGroup;
  constructor(
    public tasksService: TasksService,
    public router: Router,
    public store: Store,
    private route: ActivatedRoute,
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
            coperatorId: new FormControl(task.coperatorId),
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
