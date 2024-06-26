import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './components/date-input/date-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TextInputComponent,
    DateInputComponent,
    SelectInputComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCommonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    TextInputComponent,
    DateInputComponent,
    SelectInputComponent,
    ErrorDialogComponent
  ]
})
export class ShareModule { }
