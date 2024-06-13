import { createFeatureSelector } from "@ngrx/store";
import { Task } from "../models/task.model";

export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');

export const selectTaskSearchValue = createFeatureSelector<Readonly<string>>('taskSearchValue');