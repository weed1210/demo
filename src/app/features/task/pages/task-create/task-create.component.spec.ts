import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router, RouterModule } from '@angular/router';
import { Store, StoreModule, select } from '@ngrx/store';
import { TaskModule } from '../../task.module';
import { TaskCreateComponent } from './task-create.component';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { TasksActions } from '../../states/tasks.action';
import { of } from 'rxjs';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { JwtPayload } from 'src/app/core/auth/models/jwt-payload.model';

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

const member: JwtPayload = {
  UserId: '',
  Email: '',
  PhoneNumber: '',
};

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  let tasksServiceMock = {
    getOne: jasmine.createSpy('getOne').and.returnValue(of(task)),
    create: jasmine.createSpy('create').and.returnValue(of(task))
  }

  let storeMock = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of(member)),
  };

  let routerMock: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),

        TaskModule
      ],
      declarations: [TaskCreateComponent],
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
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;

    component.tasksService = TestBed.inject(TasksService);

    component.taskCreateForm = formBuilder.group({
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
    });

    routerMock = TestBed.inject(Router);
    component.store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();

    expect(storeMock.select).toHaveBeenCalledWith(selectMember);
    expect(component.taskCreateForm.get('memberId')?.value).toEqual(member.UserId);
  });

  it('should call create on TasksService and dispatch the create action on submit', () => {
    const spyRouter = spyOn(routerMock, 'navigate').and.resolveTo(true);
    component.taskCreateForm.setValue(task);
    component.onSubmit(task);

    const { id, ...request } = task;
    expect(tasksServiceMock.create).toHaveBeenCalledWith(request);

    tasksServiceMock.create(task).subscribe({
      next: (res: Task) => {
        expect(storeMock.dispatch).toHaveBeenCalledWith(TasksActions.create({ task: res }));
      },
      complete: () => {
        expect(spyRouter).toHaveBeenCalledWith(['tasks']);
      }
    });
  });
});
