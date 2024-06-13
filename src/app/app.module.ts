import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskModule } from './features/task/task.module';
import { ShareModule } from './share/share.module';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { memberReducer } from './core/auth/states/members.reducer';
import { taskSearchValueReducer, tasksReducer } from './features/task/states/tasks.reducer';
import { provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    TaskModule,
    ShareModule,
    AppRoutingModule,
    StoreModule.forRoot({
      member: memberReducer,
      
      tasks: tasksReducer,
      taskSearchValue: taskSearchValueReducer
    })
  ],
  providers: [
    provideClientHydration(withHttpTransferCacheOptions({
      includePostRequests: true
    })),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, errorInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
