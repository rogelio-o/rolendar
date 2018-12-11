import React from "react";
import {
  Alert,
  SwipeableListView,
  TouchableOpacity,
  View,
  SwipeableListViewDataSource,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ITask } from "../../../../models/ITask";
import styles from "./styles";
import { createDataSource } from "../../../../utils/listsUtils";
import TaskSelector from "../../../../components/TaskSelector";
import Task from "../Task";

interface IProp {
  tasks: ITask[];
  subtasksIds: { [key: string]: string[] };
  deleteTask: (taskId: string) => void;
  toggleAttachSubtask: (task: ITask, subtask: ITask) => Promise<void>;
}

interface IState {
  tasks: SwipeableListViewDataSource;
  subtaskSelection?: ITask;
}

export default class Tasks extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    const ds = SwipeableListView.getNewDataSource();
    this.state = {
      tasks: createDataSource(ds, props.tasks),
    };
  }

  public componentDidUpdate(prevProps: IProp) {
    if (
      this.props.tasks.length !== this.state.tasks.getDataSource().getRowCount()
    ) {
      this.setState({
        tasks: createDataSource(this.state.tasks, this.props.tasks),
      });
    }
  }

  public quickActions(
    rowData: ITask,
    sectionID: string | number,
    rowID: string | number
  ): JSX.Element {
    const hasSubtasks: boolean = rowData.subtasks.length > 0;
    return (
      <View style={styles.quickActionsContainer}>
        <View style={styles.quickActionsInnerContainer}>
          {hasSubtasks ? (
            <TouchableOpacity
              style={[
                styles.quickActionsItemContainer,
                styles.quickActionsUpdateSubtasksContainer,
              ]}
              onPress={() => this.openSubtaskSelection(rowData)}
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
    this.props.deleteTask(rowID as string);
  }

  public async toggleAttachSubtask(task: ITask, subtask: ITask): Promise<void> {
    await this.props.toggleAttachSubtask(task, subtask);
    this.closeSubtaskSelection();
  }

  public openSubtaskSelection(subtaskSelection: ITask) {
    this.setState({ subtaskSelection });
  }

  public closeSubtaskSelection() {
    this.setState({ subtaskSelection: undefined });
  }

  public render() {
    const tasks: SwipeableListViewDataSource = this.state.tasks;
    const subtaskSelection: ITask | undefined = this.state.subtaskSelection;

    if (tasks.getDataSource().getRowCount() === 0) {
      return null;
    } else {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.subtaskSelection !== undefined}
            onRequestClose={() => {
              /**/
            }}
          >
            <TaskSelector
              title={
                "Select subtask of " +
                (subtaskSelection ? subtaskSelection.name : "")
              }
              close={() => this.closeSubtaskSelection()}
              selectTask={subtask =>
                subtaskSelection
                  ? this.toggleAttachSubtask(subtaskSelection, subtask)
                  : Promise.resolve()
              }
              tasksGetter={() =>
                Promise.resolve(
                  subtaskSelection ? subtaskSelection.subtasks : []
                )
              }
            />
          </Modal>
          <SwipeableListView
            dataSource={tasks}
            renderRow={row => (
              <Task
                initialTask={row}
                subtasksIds={this.props.subtasksIds[row.id]}
              />
            )}
            bounceFirstRowOnMount={true}
            maxSwipeDistance={124}
            renderQuickActions={(
              rowData: any,
              sectionID: string | number,
              rowID: string | number
            ) => this.quickActions(rowData, sectionID, rowID)}
          />
        </View>
      );
    }
  }
}
