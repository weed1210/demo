import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskModule } from './features/task/task.module';
import { LayoutModule } from './share/layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { memberReducer } from './core/auth/states/members.reducer';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    TaskModule,
    LayoutModule,
    AppRoutingModule,
    StoreModule.forRoot({
      member: memberReducer
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, errorInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
