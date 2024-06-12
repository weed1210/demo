import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskCreateRequest } from '../models/task-create.request';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  get(memberId: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      'Tasks', {
        params: {
          memberId: memberId
        }
      }
    );
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(
      `Tasks/${id}`
    );
  }

  create(req: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(
      'Tasks', req
    );
  }

  update(req: Task): Observable<Task> {
    return this.http.put<Task>(
      'Tasks', req
    );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(
      `Tasks/${id}`
    );
  }
}
