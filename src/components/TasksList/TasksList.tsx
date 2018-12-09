import React from "react";
import {
  View,
  SafeAreaView,
  SwipeableListView,
  SwipeableListViewDataSource,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import ICategory from "../../models/ICategory";
import Loading from "../Loading/Loading";
import { Ionicons } from "@expo/vector-icons";
import { deleteTask } from "../../repositories/tasksRepository";
import { createDataSource } from "../../utils/listsUtils";
import TaskItem from "./components/TaskItem";
import { ITask } from "../../models/ITask";
import { NavigationScreenProps } from "react-navigation";

interface IProp extends NavigationScreenProps {
  taskGetter: () => Promise<ITask[]>;
  isSubtask: boolean;
}

interface IState {
  loading: boolean;
  tasks: SwipeableListViewDataSource | null;
}

export default class TasksList extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      loading: false,
      tasks: null,
    };
  }

  public componentDidMount() {
    this.loadTasks();

    this.props.navigation.setParams({
      loadTasks: this.loadTasks.bind(this),
    });
  }

  public loadTasks() {
    this.setState({ loading: true });

    this.props
      .taskGetter()
      .then(tasks => {
        const ds =
          this.state.tasks === null
            ? SwipeableListView.getNewDataSource()
            : this.state.tasks;
        this.setState({
          loading: false,
          tasks: createDataSource(ds, tasks),
        });
      })
      .catch(() => this.setState({ loading: false }));
  }

  public quickActions(
    rowData: ICategory,
    sectionID: string | number,
    rowID: string | number
  ): JSX.Element {
    return (
      <View style={styles.quickActionsContainer}>
        <View
          style={
            this.props.isSubtask
              ? styles.quickActionsInnerSubtasksContainer
              : styles.quickActionsInnerContainer
          }
        >
          {this.props.isSubtask ? null : (
            <TouchableOpacity
              style={[
                styles.quickActionsItemContainer,
                styles.quickActionsSubtasksContainer,
              ]}
              onPress={() =>
                this.props.navigation.navigate("Subtasks", {
                  task: rowData,
                })
              }
            >
              <Ionicons name="ios-list" style={[styles.quickActionsIcon]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.quickActionsItemContainer,
              styles.quickActionsUpdateContainer,
            ]}
            onPress={() =>
              this.props.navigation.navigate("UpdateTask", {
                taskId: rowID,
                loadTasks: () => this.loadTasks(),
              })
            }
          >
            <Ionicons name="md-create" style={[styles.quickActionsIcon]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickActionsItemContainer,
              styles.quickActionsDeleteContainer,
            ]}
            onPress={() => this.askDeleteTask(rowID)}
          >
            <Ionicons name="ios-trash" style={[styles.quickActionsIcon]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  public askDeleteTask(rowID: string | number): void {
    Alert.alert(
      "Delete task",
      "Are you sure you want delete this task and all its subtasks?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => this.deleteTask(rowID) },
      ],
      { cancelable: false }
    );
  }

  public deleteTask(id: string | number) {
    deleteTask(id as string).then(() => {
      this.loadTasks();
    });
  }

  public render() {
    const tasks = this.state.tasks;

    return (
      <SafeAreaView style={styles.container}>
        <Loading visible={this.state.loading} />
        {tasks === null || tasks.getDataSource().getRowCount() === 0 ? null : (
          <SwipeableListView
            dataSource={tasks}
            renderRow={row => <TaskItem task={row} />}
            bounceFirstRowOnMount={true}
            maxSwipeDistance={this.props.isSubtask ? 124 : 186}
            renderQuickActions={(
              rowData: any,
              sectionID: string | number,
              rowID: string | number
            ) => this.quickActions(rowData, sectionID, rowID)}
          />
        )}
      </SafeAreaView>
    );
  }
}
