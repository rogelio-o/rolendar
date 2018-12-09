import React from "react";
import { addSubtask } from "../../repositories/tasksRepository";
import { ITask } from "../../models/ITask";
import { NavigationScreenProps } from "react-navigation";
import TaskForm from "../../components/TaskForm";

export default class CreateSubtask extends React.Component<
  NavigationScreenProps
> {
  private async submit(subtask: ITask): Promise<void> {
    const task: ITask = this.props.navigation.getParam("task");

    await addSubtask(task.id, subtask);
  }

  public render() {
    const navigation = this.props.navigation;
    const task: ITask = navigation.getParam("task");
    const initialTask: ITask = {
      id: "",
      name: "",
      description: "",
      category: task.category,
      done: false,
      subtasks: [],
    };

    return (
      <TaskForm
        submit={subtask => this.submit(subtask)}
        initialTask={initialTask}
        navigation={navigation}
      />
    );
  }
}
