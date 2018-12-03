import React from "react";
import { View } from "react-native";
import { ITask } from "../../../../models/ITask";
import SubTask from "../SubTask";
import styles from "./styles";

interface IProp {
  subtasks: ITask[];
}

export default class SubTasks extends React.Component<IProp> {
  public render() {
    const subtasks: ITask[] = this.props.subtasks;
    return (
      <View style={styles.container}>
        {subtasks.map((subtask, index) => (
          <SubTask initialSubTask={subtask} key={index} />
        ))}
      </View>
    );
  }
}
