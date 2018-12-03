import React from "react";
import {
  Alert,
  SwipeableListView,
  TouchableOpacity,
  View,
  SwipeableListViewDataSource,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ITask } from "../../../../models/ITask";
import Task from "../Task";
import styles from "./styles";

interface IProp {
  initialTasks: ITask[];
}

interface IState {
  tasks: SwipeableListViewDataSource;
}

export default class Tasks extends React.Component<IProp, IState> {
  private _data: ITask[];

  constructor(props: IProp) {
    super(props);

    this._data = props.initialTasks;

    const ds = SwipeableListView.getNewDataSource();
    this.state = {
      tasks: this.createDataSource(ds, this._data),
    };
  }

  private createDataSource(
    ds: SwipeableListViewDataSource,
    initialTasks: ITask[]
  ): SwipeableListViewDataSource {
    const dataBlob: { [key: string]: ITask } = {};
    const rowsIds: string[] = [];
    initialTasks.forEach(task => {
      dataBlob[task.id] = task;
      rowsIds.push(task.id);
    });

    return ds.cloneWithRowsAndSections({ "0": dataBlob }, ["0"], [rowsIds]);
  }

  public quickActions(
    rowData: ITask,
    sectionID: string | number,
    rowID: string | number
  ): JSX.Element {
    return (
      <View style={styles.quickActionsContainer}>
        <View style={styles.quickActionsInnerContainer}>
          {rowData.hasSubtasks ? (
            <TouchableOpacity
              style={[
                styles.quickActionsItemContainer,
                styles.quickActionsUpdateSubtasksContainer,
              ]}
              onPress={() => this.askUnattachTask(rowID)}
            >
              <Ionicons name="ios-list" style={[styles.quickActionsIcon]} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[
              styles.quickActionsItemContainer,
              styles.quickActionsDeleteContainer,
            ]}
            onPress={() => this.askUnattachTask(rowID)}
          >
            <Ionicons name="ios-trash" style={[styles.quickActionsIcon]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  public askUnattachTask(rowID: string | number): void {
    Alert.alert(
      "Unattach task",
      "Are you sure you want remove this task from this day?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => this.unattachTask(rowID) },
      ],
      { cancelable: false }
    );
  }

  public unattachTask(rowID: string | number): void {
    const newData = this._data.filter(t => t.id !== rowID);
    this._data = newData;
    this.setState({
      tasks: this.createDataSource(this.state.tasks, this._data),
    });
  }

  public render() {
    const tasks: SwipeableListViewDataSource = this.state.tasks;

    return (
      <SwipeableListView
        dataSource={tasks}
        renderRow={row => <Task initialTask={row} />}
        bounceFirstRowOnMount={true}
        maxSwipeDistance={124}
        renderQuickActions={(
          rowData: any,
          sectionID: string | number,
          rowID: string | number
        ) => this.quickActions(rowData, sectionID, rowID)}
      />
    );
  }
}
