import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Loading from "../../components/Loading";
import { ITask } from "../../models/ITask";

interface IProp {
  title: string;
  selectTask: (category: ITask) => Promise<void>;
  tasksGetter: () => Promise<ITask[]>;
  close: () => void;
}

interface IState {
  loading: boolean;
  tasks: ITask[];
}

export default class TaskSelector extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      loading: false,
      tasks: [],
    };
  }

  public componentDidMount() {
    this.setState({ loading: true });

    this.props
      .tasksGetter()
      .then(tasks => {
        this.setState({ loading: false, tasks });
      })
      .catch(() => {
        this.setState({ loading: false }, () => {
          this.props.close();
        });
      });
  }

  private selectTask(task: ITask) {
    this.props.selectTask(task);
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loading visible={this.state.loading} />
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{this.props.title}</Text>
          </View>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => this.props.close()}>
              <Text style={styles.headerButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.listContainer}>
          {this.state.tasks.map((task, index) => (
            <TouchableOpacity onPress={() => this.selectTask(task)} key={index}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{task.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
