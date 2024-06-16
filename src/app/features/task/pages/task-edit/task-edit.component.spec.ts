import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router, RouterModule, provideRouter, withComponentInputBinding } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { TaskModule } from '../../task.module';
import { TaskEditComponent } from './task-edit.component';
import { Task } from '../../models/task.model';
import { TasksActions } from '../../states/tasks.action';

const task = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  dueDate: new Date(),
  status: 'pending',
  priority: 1,
  memberId: 'id',
  coperatorId: 'id'
};

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  let tasksServiceMock = {
    update: jasmine.createSpy('update').and.returnValue(of(task))
  }

  let storeMock = {
    dispatch: jasmine.createSpy('dispatch')
  };

  let routerMock: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),

        TaskModule
      ],
      declarations: [TaskEditComponent],
      providers: [
        provideAnimationsAsync(),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(),
        { provide: FormBuilder, useValue: formBuilder },
        { provide: TasksService, useValue: tasksServiceMock },
        { provide: Store, useValue: storeMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;

    component.taskEditForm = formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      status: ['Ongoing'],
      priority: [0, [
        Validators.required,
        Validators.min(0)
      ]],
      memberId: [''],
      coperatorId: ['']
    });

    routerMock = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update on TasksService and dispatch the update action on submit', () => {
    const spyRouter = spyOn(routerMock, 'navigate').and.resolveTo(true);
    component.taskEditForm.setValue(task);
    component.onSubmit(task);

    expect(tasksServiceMock.update).toHaveBeenCalledWith(task);

    tasksServiceMock.update(task).subscribe({
      next: (res: Task) => {
        expect(storeMock.dispatch).toHaveBeenCalledWith(TasksActions.update({ task: res }));
      },
      complete: () => {
        expect(spyRouter).toHaveBeenCalledWith(['tasks']);
      }
    });
  });

  it('should handle error on update failure', () => {
    tasksServiceMock.update.and.returnValue((throwError(() => new Error('Error updating task'))));

    component.taskEditForm.setValue(task);

    component.onSubmit(task);

    tasksServiceMock.update(task).subscribe({
      next: (res: Task) => {
        // This block should not be called
      },
      error: (err: Error) => {
        expect(err.message).toBe('Error updating task');
      }
    });
  });
});