import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SubTasks from "../SubTasks";
import styles from "./styles";
import { ITask } from "../../../../models/ITask";
import { updateTask } from "../../../../repositories/tasksRepository";

interface IProp {
  initialTask: ITask;
  subtasksIds?: string[];
}

interface IState {
  task: ITask;
}

export default class Task extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      task: props.initialTask,
    };
  }

  private toggleDone() {
    const task: ITask = { ...this.state.task };
    task.done = !task.done;

    updateTask(task).then(() => {
      this.setState({ task });
    });
  }

  public render() {
    const task: ITask = this.state.task;
    const subtasksIds: string[] = this.props.subtasksIds
      ? this.props.subtasksIds
      : [];

    return (
      <View style={styles.taskContainer}>
        <View style={styles.taskInnerContainer}>
          <View style={styles.doneIconContainer}>
            <TouchableOpacity onPress={() => this.toggleDone()}>
              <Ionicons
                name={task.done ? "md-checkbox-outline" : "ios-square-outline"}
                style={[styles.doneIcon, { color: task.category.color }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{task.name}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{task.description}</Text>
            </View>
          </View>
        </View>
        {task.subtasks.length > 0 ? (
          <SubTasks
            subtasks={task.subtasks.filter(
              subtask => subtasksIds.indexOf(subtask.id) !== -1
            )}
          />
        ) : null}
      </View>
    );
  }
}
