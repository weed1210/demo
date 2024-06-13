import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Get': props<{ tasks: Task[] }>(),
    'Create': props<{ task: Task }>(),
    'Update': props<{ task: Task }>(),
    'Delete': props<{ id: number }>(),
  },
});

export const TaskSearchAction = createActionGroup({
  source: 'TaskSearchValue',
  events: {
    'Search': props<{ searchValue: string }>(),
  },
});