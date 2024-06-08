import { Component } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  tasks: Task[];

  constructor() {
    this.tasks = [
      { id: 0, title: 'Task 0', description: 'A AAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAA', dueDate: new Date, status: 'new'},
      { id: 0, title: 'Task 0', description: 'A AAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA', dueDate: new Date, status: 'new'},
      { id: 0, title: 'Task 0', description: 'A AAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA', dueDate: new Date, status: 'new'},
      { id: 0, title: 'Task 0', description: 'A AAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA', dueDate: new Date, status: 'new'},
      { id: 0, title: 'Task 0', description: 'A AAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAA', dueDate: new Date, status: 'new'},
    ]
  }
}
