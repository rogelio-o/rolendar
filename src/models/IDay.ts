import ICategory from "./ICategory";
import { ITask } from "./ITask";

export default interface IDay {
  date: Date;

  category: ICategory;

  tasks: ITask[];
}
