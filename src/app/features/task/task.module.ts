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
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { ShareModule } from 'src/app/share/share.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskFormComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule,

    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatCommonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule
  ],
  exports: [
    TaskComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskEditComponent
  ]
})
export class TaskModule { }
