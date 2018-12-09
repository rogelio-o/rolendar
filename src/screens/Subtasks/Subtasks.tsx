import React from "react";
import { NavigationScreenProps } from "react-navigation";
import { findTaskById } from "../../repositories/tasksRepository";
import { ITask } from "../../models/ITask";
import TasksList from "../../components/TasksList";

export default class Subtasks extends React.Component<NavigationScreenProps> {
  public async loadTasks(): Promise<ITask[]> {
    const initialTask: ITask = this.props.navigation.getParam("task");
    const task: ITask = await findTaskById(initialTask.id);

    return Promise.resolve(task.subtasks);
  }

  public render() {
    return (
      <TasksList
        taskGetter={() => this.loadTasks()}
        isSubtask={true}
        {...this.props}
      />
    );
  }
}
