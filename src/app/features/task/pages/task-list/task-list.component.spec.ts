import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { Router, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from "rxjs";
import { initialMemberState } from "src/app/core/auth/states/members.reducer";
import { selectMember } from "src/app/core/auth/states/members.selector";
import { TasksService } from "../../services/tasks.service";
import { selectTaskSearchValue, selectTasks } from "../../states/tasks.selector";
import { TaskModule } from "../../task.module";
import { TaskListComponent } from "./task-list.component";
import { initialTaskSearchValueState, initialTasksState } from "../../states/tasks.reducer";
import { Task } from "../../models/task.model";
import { CustomDataSource } from "src/app/share/models/custom-data-source.model";
import { TasksActions } from "../../states/tasks.action";

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    let tasksServiceMock = {
        get: jasmine.createSpy('get').and.returnValue(of(initialTasksState)),
        delete: jasmine.createSpy('delete').and.returnValue(of(1))
    }
    let routerMock: Router;
    let storeMock: MockStore;
    let request = {
        memberId: initialMemberState.UserId,
        searchValue: initialTaskSearchValueState,
        selectedStatus: '',
        sortKey: 'priority',
        sortOrder: 'asc'
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                StoreModule.forRoot({}),

                TaskModule
            ],
            declarations: [TaskListComponent],
            providers: [
                provideAnimationsAsync(),
                provideClientHydration(),
                provideAnimationsAsync(),
                provideHttpClient(),
                { provide: TasksService, useValue: tasksServiceMock },
                provideMockStore({
                    initialState: {
                        tasks: [],
                        member: initialMemberState,
                    },
                    selectors: [
                        {
                            selector: selectMember,
                            value: initialMemberState
                        },
                        {
                            selector: selectTasks,
                            value: initialTasksState
                        },
                        {
                            selector: selectTaskSearchValue,
                            value: initialTaskSearchValueState
                        }
                    ]
                }),
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;

        component.tasksService = TestBed.inject(TasksService);

        routerMock = TestBed.inject(Router);
        storeMock = TestBed.inject(MockStore);
        component.store = storeMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init', async () => {
        let storeSpy = spyOn(storeMock, "dispatch");
        component.ngOnInit();
        expect(tasksServiceMock.get).toHaveBeenCalledWith(request);

        tasksServiceMock.get(request).subscribe({
            next: (response: Task[]) => {
                expect(response).toEqual(initialTasksState);
            }
        });
        expect(storeSpy).toHaveBeenCalledWith(TasksActions.get({ tasks: initialTasksState.slice() }));
    });

    it('should fetch tasks on component initialization and dispatch', () => {
        expect(component.dataSource).toBeInstanceOf(CustomDataSource);
        component.dataSource.connect().subscribe({
            next: (res: Task[]) => {
                expect(res).toEqual(initialTasksState);
            }
        })
    });

    it('should dispatch TasksActions.delete on onDelete', () => {
        let storeSpy = spyOn(storeMock, "dispatch");
        const taskId = 1;
        component.onDelete(taskId);
        expect(tasksServiceMock.delete).toHaveBeenCalledWith(taskId);
        expect(storeSpy).toHaveBeenCalledWith(TasksActions.delete({ id: taskId }));
    });

    it('should navigate to task create page', () => {
        const routerSpy = spyOn(routerMock, 'navigate').and.resolveTo(true);
        component.onCreate();
        expect(routerSpy).toHaveBeenCalledWith(["task-create"]);
    });

    it('should navigate to task edit page', () => {
        const routerSpy = spyOn(routerMock, 'navigate').and.resolveTo(true);
        component.onEdit(1);
        expect(routerSpy).toHaveBeenCalledWith(['task-edit', { id: 1 }]);
    });

    it('should change sort order', () => {
        component.onSortChange({
            active: 'title',
            direction: 'desc'
        })

        var sortRequest = {
            ...request,
            sortKey: 'title',
            sortOrder: 'desc'
        }

        expect(tasksServiceMock.get).toHaveBeenCalledWith(sortRequest);
    });

    it('should change sort order with default direction asc', () => {
        component.onSortChange({
            active: 'description',
            direction: ''
        })

        var sortRequest = {
            ...request,
            sortKey: 'description',
            sortOrder: 'asc'
        }

        expect(tasksServiceMock.get).toHaveBeenCalledWith(sortRequest);
    });
});