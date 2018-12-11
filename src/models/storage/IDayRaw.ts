export default interface IDayRaw {
  categoryId?: string;

  tasksIds: string[];

  subtasksIds: { [key: string]: string[] };
}
