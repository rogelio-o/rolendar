import React from "react";
import {
  SwipeableListView,
  Text,
  TouchableOpacity,
  View,
  SwipeableListViewDataSource,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ITask } from "../../../../models/ITask";
import styles from "./styles";
import SubTasks from "../SubTasks";

interface IProp {
  initialTasks: ITask[];
}

interface IState {
  tasks: SwipeableListViewDataSource;
}

export default class Tasks extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      tasks: this.createDataSource(props.initialTasks),
    };
  }

  private createDataSource(initialTasks: ITask[]): SwipeableListViewDataSource {
    const dataBlob: { [key: string]: ITask } = {};
    const rowsIds: string[] = [];
    initialTasks.forEach(task => {
      dataBlob[task.id] = task;
      rowsIds.push(task.id);
    });
    const ds = SwipeableListView.getNewDataSource();

    return ds.cloneWithRowsAndSections({ "0": dataBlob }, ["0"], [rowsIds]);
  }

  private renderRow(task: ITask): JSX.Element {
    return (
      <View style={styles.taskContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.doneIconContainer}>
            <TouchableOpacity onPress={() => console.log("Done")}>
              <Ionicons
                name={task.done ? "md-checkbox-outline" : "ios-square-outline"}
                style={[styles.doneIcon, { color: task.category.color }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{task.name}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>
        {task.subtasks.length > 0 ? <SubTasks tasks={task.subtasks} /> : null}
      </View>
    );
  }

  public render() {
    const tasks: SwipeableListViewDataSource = this.state.tasks;

    return (
      <SwipeableListView
        dataSource={tasks}
        renderRow={row => this.renderRow(row)}
        bounceFirstRowOnMount={true}
        maxSwipeDistance={50}
        renderQuickActions={() => <View />}
      />
    );
  }
}
