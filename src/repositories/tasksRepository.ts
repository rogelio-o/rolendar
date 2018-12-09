import { ITask } from "../models/ITask";
import ICategory from "../models/ICategory";
import { AsyncStorage } from "react-native";
import { ITaskRaw } from "../models/storage/ITaskRaw";
import { findCategoryById } from "./categoryRepository";

const KEY: string = "TASK:";

const KEY_CATEGORY: string = "TASK_CATEGORY:";

const _findRawTaskById = async (id: string): Promise<ITaskRaw> => {
  const str: string | null = await AsyncStorage.getItem(KEY + id);

  if (str === null) {
    throw new Error("Task not found.");
  } else {
    return JSON.parse(str);
  }
};

const _findTaskById = async (
  id: string,
  category?: ICategory
): Promise<ITask> => {
  const raw: ITaskRaw = await _findRawTaskById(id);

  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    category: category ? category : await findCategoryById(raw.categoryId),
    done: raw.done,
    subtasks: await Promise.all(
      raw.subtasksIds.map(subId => findTaskById(subId))
    ),
  };
};

export const findTaskById = (id: string): Promise<ITask> => {
  return _findTaskById(id);
};

export const findTasksByCategory = async (
  category: ICategory
): Promise<ITask[]> => {
  const str: string | null = await AsyncStorage.getItem(
    KEY_CATEGORY + category.id
  );

  if (str === null) {
    return [];
  } else {
    const tasksIds: string[] = JSON.parse(str);

    return Promise.all(tasksIds.map(taskId => _findTaskById(taskId, category)));
  }
};

export const deleteAllTasksByCategory = async (
  categoryId: string
): Promise<void> => {
  const str: string | null = await AsyncStorage.getItem(
    KEY_CATEGORY + categoryId
  );

  if (str !== null) {
    const tasksIds: string[] = JSON.parse(str);

    await Promise.all(tasksIds.map(taskId => deleteTask(taskId)));
    await AsyncStorage.removeItem(KEY_CATEGORY + categoryId);
  }
};

const removeFromCategory = async (
  categoryId: string,
  taskId: string
): Promise<void> => {
  const str: string | null = await AsyncStorage.getItem(
    KEY_CATEGORY + categoryId
  );

  if (str !== null) {
    const tasksIds: string[] = JSON.parse(str);

    await AsyncStorage.setItem(
      KEY_CATEGORY + categoryId,
      JSON.stringify(tasksIds.filter(t => t !== taskId))
    );
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const raw: ITaskRaw = await _findRawTaskById(taskId);

  await Promise.all(raw.subtasksIds.map(subTaskId => deleteTask(subTaskId)));

  await AsyncStorage.removeItem(KEY + taskId);
  await removeFromCategory(raw.categoryId, raw.id);
};

const addToCategory = async (
  categoryId: string,
  taskId: string
): Promise<void> => {
  const str: string | null = await AsyncStorage.getItem(
    KEY_CATEGORY + categoryId
  );
  const tasksIds: string[] = str === null ? [] : JSON.parse(str);

  if (tasksIds.indexOf(taskId) === -1) {
    tasksIds.push(taskId);

    await AsyncStorage.setItem(
      KEY_CATEGORY + categoryId,
      JSON.stringify(tasksIds)
    );
  }
};

const addToTask = async (taskId: string, subtaskId: string): Promise<void> => {
  const raw: ITaskRaw = await _findRawTaskById(taskId);

  if (raw.subtasksIds.indexOf(subtaskId) === -1) {
    raw.subtasksIds.push(subtaskId);

    await AsyncStorage.setItem(KEY + taskId, JSON.stringify(raw));
  }
};

const toRaw = (task: ITask): ITaskRaw => {
  return {
    id: task.id,
    name: task.name,
    description: task.description,
    categoryId: task.category.id,
    done: task.done,
    subtasksIds: task.subtasks.map(t => t.id),
  };
};

export const addTask = async (task: ITask): Promise<void> => {
  const raw: ITaskRaw = toRaw(task);

  await AsyncStorage.setItem(KEY + task.id, JSON.stringify(raw));
  await addToCategory(task.category.id, task.id);
};

export const addSubtask = async (
  taskId: string,
  subtask: ITask
): Promise<void> => {
  const raw: ITaskRaw = toRaw(subtask);

  await AsyncStorage.setItem(KEY + subtask.id, JSON.stringify(raw));
  await addToTask(taskId, subtask.id);
};

export const updateTask = async (task: ITask): Promise<void> => {
  const raw: ITaskRaw = toRaw(task);

  await AsyncStorage.setItem(KEY + task.id, JSON.stringify(raw));
};
