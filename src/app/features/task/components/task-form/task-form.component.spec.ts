import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Member } from 'src/app/core/auth/models/member.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { TaskModule } from '../../task.module';
import { TaskFormComponent } from './task-form.component';

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

const members: Member[] = [
    {
        id: '1',
        email: 'alice@example.com',
        password: 'alice123',
        name: 'Alice Johnson',
        phoneNumber: '123-456-7890'
    },
    {
        id: '2',
        email: 'bob@example.com',
        password: 'bob123',
        name: 'Bob Smith',
        phoneNumber: '234-567-8901'
    }
]

describe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let authServiceMock = {
        getMembers: jasmine.createSpy('getMembers').and.returnValue(of(members)),
    }
    const formBuilder: FormBuilder = new FormBuilder();
    let routerMock: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                StoreModule.forRoot({}),

                TaskModule
            ],
            declarations: [TaskFormComponent],
            providers: [
                provideAnimationsAsync(),
                provideClientHydration(),
                provideAnimationsAsync(),
                provideHttpClient(),
                { provide: FormBuilder, useValue: formBuilder },
                { provide: AuthService, useValue: authServiceMock },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        component.authService = TestBed.inject(AuthService);

        component.taskForm = formBuilder.group({
            id: [''],
            title: [''],
            description: [''],
            dueDate: [''],
            status: [''],
            priority: [0],
            memberId: ['1'],
            coperatorId: ['2']
        });

        routerMock = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate coperatorOptions on init', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.coperatorOptions.data.length).toBe(1);
        expect(component.coperatorOptions.data).toEqual([
            { key: '2', value: 'bob@example.com' }
        ]);
    });

    it('should emit onSubmit with form value on submit', () => {
        spyOn(component.onSubmit, 'emit');

        component.taskForm.setValue(task);
        component.submit();

        expect(component.onSubmit.emit).toHaveBeenCalledWith(task);
    });

    it('should navigate back to tasks on onBack', () => {
        const spyRouter = spyOn(routerMock, 'navigate').and.resolveTo(true);

        component.onBack();

        expect(spyRouter).toHaveBeenCalledWith(['tasks']);
    });
});