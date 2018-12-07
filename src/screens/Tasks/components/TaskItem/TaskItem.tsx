import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { ITask } from "../../../../models/ITask";

interface IProp {
  task: ITask;
}

export default class TaskItem extends React.Component<IProp> {
  public render() {
    const task: ITask = this.props.task;

    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.itemCheckboxContainer,
            task.done
              ? styles.itemDoneCheckboxContainer
              : styles.itemUndoneCheckboxContainer,
          ]}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{task.name}</Text>
          <Text style={styles.itemDescriptionText}>{task.description}</Text>
        </View>
      </View>
    );
  }
}
