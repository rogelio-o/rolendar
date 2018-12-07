import ICategory from "./ICategory";

export interface ITask {
  id: string;

  name: string;

  description: string;

  category: ICategory;

  done: boolean;

  subtasks: ITask[];
}
