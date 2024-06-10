import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CustomDataSource } from './models/custom-data-source.model';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class ShareModule { }
