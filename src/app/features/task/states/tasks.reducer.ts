import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { TasksActions } from './tasks.action';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialState,
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