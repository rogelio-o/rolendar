import React from "react";
import { addTask } from "../../repositories/tasksRepository";
import { ITask } from "../../models/ITask";
import { NavigationScreenProps } from "react-navigation";
import TaskForm from "../../components/TaskForm";

export default class CreateTask extends React.Component<NavigationScreenProps> {
  private async submit(task: ITask): Promise<void> {
    await addTask(task);
  }

  public render() {
    const navigation = this.props.navigation;
    const initialTask: ITask = {
      id: "",
      name: "",
      description: "",
      category: navigation.getParam("category"),
      done: false,
      subtasks: [],
    };

    return (
      <TaskForm
        submit={task => this.submit(task)}
        initialTask={initialTask}
        navigation={navigation}
      />
    );
  }
}
