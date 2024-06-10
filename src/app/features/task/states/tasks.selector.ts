import { createFeatureSelector } from "@ngrx/store";
import { Task } from "../models/task";

export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');