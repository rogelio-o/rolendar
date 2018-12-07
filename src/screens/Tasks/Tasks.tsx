import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  SwipeableListView,
  SwipeableListViewDataSource,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import ICategory from "../../models/ICategory";
import { NavigationScreenProps } from "react-navigation";
import Loading from "../../components/Loading/Loading";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteTask,
  findTasksByCategory,
} from "../../repositories/tasksRepository";
import { createDataSource } from "../../utils/listsUtils";
import TaskItem from "./components/TaskItem/TaskItem";

interface IState {
  loading: boolean;
  tasks: SwipeableListViewDataSource | null;
}

export default class Tasks extends React.Component<
  NavigationScreenProps,
  IState
> {
  constructor(props: NavigationScreenProps) {
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
    const category: ICategory = this.props.navigation.getParam("category");
    this.setState({ loading: true });

    findTasksByCategory(category).then(tasks => {
      const ds =
        this.state.tasks === null
          ? SwipeableListView.getNewDataSource()
          : this.state.tasks;
      this.setState({
        loading: false,
        tasks: createDataSource(ds, tasks),
      });
    });
  }

  public quickActions(
    rowData: ICategory,
    sectionID: string | number,
    rowID: string | number
  ): JSX.Element {
    return (
      <View style={styles.quickActionsContainer}>
        <View style={styles.quickActionsInnerContainer}>
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
            maxSwipeDistance={62}
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
