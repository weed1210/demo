import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, startWith, switchMap } from 'rxjs';
import { selectMember } from 'src/app/core/auth/states/members.selector';
import { CustomDataSource } from 'src/app/share/models/custom-data-source.model';
import { Dictionary } from 'src/app/share/models/dictionary.model';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { TasksActions } from '../../states/tasks.action';
import { selectTaskSearchValue, selectTasks } from '../../states/tasks.selector';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  displayedColumns: string[] = ['id', 'title', 'priority', 'description', 'dueDate', 'status', 'action'];
  dataSource = new CustomDataSource<Task>([]);
  selectStatusForm = new FormGroup({
    status: new FormControl("")
  });
  statusOptions: Dictionary<string, string> = {
    data: [
      {
        key: '',
        value: 'All'
      },
      {
        key: 'Ongoing',
        value: 'Ongoing'
      },
      {
        key: 'Finished',
        value: 'Finished'
      },
    ]
  }
  sortState: Sort = {
    active: 'priority',
    direction: 'asc'
  };
  sortStateSubject: BehaviorSubject<Sort>

  @ViewChild(MatTable) table: MatTable<Task>;

  constructor(
    public tasksService: TasksService,
    public store: Store,
    public router: Router,
  ) {
    this.store.select(selectTasks);
    
  }

  ngOnInit(): void {
    const member = this.store.select(selectMember);
    const taskSearchValue = this.store.select(selectTaskSearchValue);
    const selectedStatus = this.selectStatusForm.valueChanges.pipe(
      startWith(this.selectStatusForm.value)
    ); 
    this.sortStateSubject = new BehaviorSubject<Sort>(this.sortState);

    combineLatest([member, taskSearchValue, selectedStatus, this.sortStateSubject.asObservable()])
      .pipe(
        switchMap(([member, searchValue, selectedStatus, sortState]) => {
          console.log(selectedStatus);
          console.log(sortState);
          return this.tasksService.get({
            memberId: member.UserId,
            searchValue: searchValue,
            selectedStatus: selectedStatus.status ?? "",
            sortKey: sortState.active,
            sortOrder: sortState.direction
          });
        })
      )
      .subscribe({
        next: res => {
          console.log(res);
          this.store.dispatch(TasksActions.get({ tasks: res }));
        }
      });

    this.store.select(selectTasks).subscribe({
      next: res => {
        console.log('data changed');
        this.dataSource.setData(res ? res.slice() : []);
      }
    });
  }

  onDelete(id: number) {
    this.tasksService.delete(id).subscribe({
      next: res => {
        console.log(res);
        this.store.dispatch(TasksActions.delete({ id: id }));
      }
    })
  }

  onCreate() {
    this.router.navigate(["task-create"]);
  }

  onEdit(id: number) {
    this.router.navigate(['task-edit', { id: id }]);
  }

  onSortChange(sortState: Sort) {
    console.log(sortState);
    sortState.direction = sortState.direction !== '' ? sortState.direction : 'asc';
    this.sortStateSubject.next(sortState);
  }
}
