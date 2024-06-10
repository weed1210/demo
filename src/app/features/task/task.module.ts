import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './states/tasks.reducer';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    StoreModule.forRoot({
      tasks: tasksReducer
    })
  ],
  exports: [
    TaskComponent,
    TaskListComponent
  ]
})
export class TaskModule { }
