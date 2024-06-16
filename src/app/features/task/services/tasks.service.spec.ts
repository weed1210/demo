import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { initialTaskSearchValueState } from '../states/tasks.reducer';
import { Task } from '../models/task.model';

const task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    dueDate: new Date(),
    status: 'pending',
    priority: 1,
    memberId: '1',
    coperatorId: '1',
    isUserTask: true,
};

describe('TasksService', () => {
    let tasksService: TasksService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TasksService
            ]
        });

        tasksService = TestBed.inject(TasksService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no outstanding HTTP requests
    });

    it('should return own tasks', () => {
        const mockTasks: Task[] = [task];
        httpMock.verify();

        tasksService.get({
            memberId: "1",
            searchValue: initialTaskSearchValueState,
            selectedStatus: "",
            sortKey: "",
            sortOrder: "",
        }).subscribe({
            next: res => {
                console.log(res);
                expect(res).toEqual(mockTasks);
            },
            error: () => {
                fail('expected an successful response, not an error');
            }
        });

        const mockReq = httpMock.expectOne('Tasks?memberId=1&searchValue=&selectedStatus=&sortKey=&sortOrder=');
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockTasks);
    });

    it('should return coperating tasks', () => {
        const mockTasks: Task[] = [
            {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                dueDate: new Date(),
                status: 'pending',
                priority: 1,
                memberId: '3',
                coperatorId: '1',
                isUserTask: false,
            }
        ];
        httpMock.verify();

        tasksService.get({
            memberId: "1",
            searchValue: initialTaskSearchValueState,
            selectedStatus: "",
            sortKey: "",
            sortOrder: "",
        }).subscribe({
            next: res => {
                console.log(res);
                expect(res).toEqual(mockTasks);
            },
            error: () => {
                fail('expected an successful response, not an error');
            }
        });

        const mockReq = httpMock.expectOne('Tasks?memberId=1&searchValue=&selectedStatus=&sortKey=&sortOrder=');
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockTasks);
    });

    it('should return selected task', () => {
        tasksService.getOne(1).subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual(task);
            }
        });

        const mockReq = httpMock.expectOne('Tasks/1');
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(task);
    });

    it('should return new created task', () => {
        tasksService.create(task).subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual(task);
            }
        });

        const mockReq = httpMock.expectOne('Tasks');
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(task);
    });

    it('should return updated task', () => {
        tasksService.update(task).subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual(task);
            }
        });

        const mockReq = httpMock.expectOne('Tasks');
        expect(mockReq.request.method).toBe('PUT');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(task);
    });

    it('should return deleted task id', () => {
        tasksService.delete(1).subscribe({
            next: (res) => {
                console.log(res);
                expect(res).toEqual(1);
            }
        });

        const mockReq = httpMock.expectOne('Tasks/1');
        expect(mockReq.request.method).toBe('DELETE');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(1);
    });
});