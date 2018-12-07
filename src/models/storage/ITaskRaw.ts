export interface ITaskRaw {
  id: string;

  name: string;

  description: string;

  categoryId: string;

  done: boolean;

  subtasksIds: string[];
}
