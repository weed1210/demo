import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { TaskSearchAction, TasksActions } from './tasks.action';

export const initialTasksState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.get, (state, { tasks }) => {
    console.log("get");
    state = tasks
    return state;
  }),
  on(TasksActions.create, (state, { task }) => {
    if (state.indexOf(task) > -1) return state;

    return [...state, task];
  }),
  on(TasksActions.update, (state, { task }) => {
    return [...state.filter(task => task.id !== task.id), task];
  }),
  on(TasksActions.delete, (state, { id }) => {
    console.log("delete");
    return state.filter(task => task.id !== id);
  })
);

export const initialTaskSearchValueState: Readonly<string> = '';
export const taskSearchValueReducer = createReducer(
  initialTaskSearchValueState,
  on(TaskSearchAction.search, (state, { searchValue }) => {
    console.log("search value: ", searchValue);
    state = searchValue
    return state;
  }),
);