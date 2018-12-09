import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { ITask } from "../../../../models/ITask";
import { saveTask } from "../../../../repositories/tasksRepository";

interface IProp {
  task: ITask;
}

interface IState {
  done: boolean;
}

export default class TaskItem extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      done: props.task.done,
    };
  }

  private toggleDone() {
    const done: boolean = this.state.done;
    const task: ITask = this.props.task;
    task.done = !done;

    saveTask(task).then(() => this.setState({ done: !done }));
  }

  public render() {
    const task: ITask = this.props.task;

    return (
      <View style={styles.taskContainer}>
        <View style={styles.taskInnerContainer}>
          <View style={styles.doneIconContainer}>
            <TouchableOpacity onPress={() => this.toggleDone()}>
              <Ionicons
                name={task.done ? "md-checkbox-outline" : "ios-square-outline"}
                style={styles.doneIcon}
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
      </View>
    );
  }
}
