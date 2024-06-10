import { Component, ViewChild } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { MatTable } from '@angular/material/table';
import { CustomDataSource } from 'src/app/share/models/custom-data-source.model';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../states/tasks.selector';
import { TasksActions } from '../../states/tasks.action';
import { Mutable } from 'src/app/share/models/mutable.model';
import { combineLatest, mergeMap } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'dueDate', 'status', 'action'];
  tasks: Task[];
  dataSource = new CustomDataSource<Task>([]);
  @ViewChild(MatTable) table: MatTable<Task>;

  constructor(
    private tasksService: TasksService,
    private store: Store
  ) {
    this.store.select(selectTasks);
  }

  ngOnInit(): void {
    this.tasksService.get().subscribe({
      next: res => {
        console.log(res);
        this.store.dispatch(TasksActions.get({ tasks: res }));
      }
    });

    this.store.select(selectTasks).subscribe({
      next: res => {
        console.log('data changed');
        this.dataSource.setData(res ? res.slice() : []);
      }
    });
  }

  onDelete(id: number) {
    this.tasksService.delete(id).subscribe({
      next: res => {
        console.log(res);
        this.store.dispatch(TasksActions.delete({ id: id }));
      }
    })
  }
}
