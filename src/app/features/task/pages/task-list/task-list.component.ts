import { Component, ViewChild } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'dueDate', 'status', 'action'];
  dataSource: Task[];
  @ViewChild(MatTable) table: MatTable<Task>;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.tasksService.get().subscribe({
      next: res => {
        console.log(res);
        this.dataSource = res;
      }
    })
  }

  onDelete(id: number) {
    this.tasksService.delete(id).subscribe({
      next: res => {
        console.log(res);
        this.dataSource = this.dataSource.filter(x => x.id !== id);
        this.table.renderRows();
      }
    })
  }
}
