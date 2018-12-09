import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { ITask } from "../../../../models/ITask";

interface IProp {
  initialTask: ITask;
}

interface IState {
  task: ITask;
}

export default class TaskItem extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      task: props.initialTask,
    };
  }

  private toggleDone() {
    const task: ITask = this.state.task;
    task.done = !task.done;

    this.setState({ task });
  }

  public render() {
    const task: ITask = this.state.task;

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
