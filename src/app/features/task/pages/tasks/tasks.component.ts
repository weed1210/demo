import { Component } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Task[];

  constructor() {
    this.tasks = [
      { id: 0, title: 'Task 0', description: 'A task', dueDate: new Date, status: 'new'}
    ]
  }
}
