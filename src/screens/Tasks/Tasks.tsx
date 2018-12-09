import React from "react";
import ICategory from "../../models/ICategory";
import { NavigationScreenProps } from "react-navigation";
import { findTasksByCategory } from "../../repositories/tasksRepository";
import { ITask } from "../../models/ITask";
import TasksList from "../../components/TasksList";

export default class Tasks extends React.Component<NavigationScreenProps> {
  public loadTasks(): Promise<ITask[]> {
    const category: ICategory = this.props.navigation.getParam("category");

    return findTasksByCategory(category);
  }

  public render() {
    return <TasksList taskGetter={() => this.loadTasks()} {...this.props} />;
  }
}
