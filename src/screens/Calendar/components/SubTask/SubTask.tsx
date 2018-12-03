import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ITask } from "../../../../models/ITask";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface IProp {
  initialSubTask: ITask;
}

interface IState {
  subtask: ITask;
}

export default class SubTask extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      subtask: props.initialSubTask,
    };
  }

  private toggleDone() {
    const subtask: ITask = this.state.subtask;
    subtask.done = !subtask.done;

    this.setState({ subtask });
  }

  public render() {
    const subtask = this.state.subtask;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.toggleDone()}>
          <Ionicons
            name={subtask.done ? "md-checkbox-outline" : "ios-square-outline"}
            style={[styles.doneIcon, { color: subtask.category.color }]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{subtask.name}</Text>
      </View>
    );
  }
}
