import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/layout/header/header.component';
import { TasksComponent } from './features/task/pages/tasks/tasks.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskComponent } from './features/task/components/task/task.component';
import { MatCardModule } from '@angular/material/card'
import { MatProgressBar } from '@angular/material/progress-bar',

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatProgressBar
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
