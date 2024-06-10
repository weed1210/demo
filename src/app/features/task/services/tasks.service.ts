import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'Tasks'
    );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(
      `Tasks/${id}`
    );
  }
}
