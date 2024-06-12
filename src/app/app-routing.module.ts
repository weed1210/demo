import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { TaskListComponent } from './features/task/pages/task-list/task-list.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { TaskCreateComponent } from './features/task/pages/task-create/task-create.component';
import { TaskEditComponent } from './features/task/pages/task-edit/task-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'task-create', component: TaskCreateComponent, canActivate: [authGuard] },
  { path: 'task-edit', component: TaskEditComponent, canActivate: [authGuard] },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ]
})
export class AppRoutingModule { }
