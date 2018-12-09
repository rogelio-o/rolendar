import React from "react";
import { updateTask, findTaskById } from "../../repositories/tasksRepository";
import { ITask } from "../../models/ITask";
import TaskForm from "../../components/TaskForm";
import { NavigationScreenProps } from "react-navigation";
import { View } from "react-native";
import Loading from "../../components/Loading";

interface IState {
  loading: boolean;
  task?: ITask;
}

export default class UpdateTask extends React.Component<
  NavigationScreenProps,
  IState
> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public componentDidMount() {
    this.setState({ loading: true });
    findTaskById(this.props.navigation.getParam("taskId"))
      .then(task => this.setState({ task, loading: false }))
      .catch(() =>
        this.setState({ loading: false }, () => this.props.navigation.goBack())
      );
  }

  private async submit(task: ITask): Promise<void> {
    await updateTask(task);
  }

  public render() {
    const loading: boolean = this.state.loading;
    const task: ITask | undefined = this.state.task;

    return (
      <View>
        <Loading visible={loading} />

        {task ? (
          <TaskForm
            initialTask={task}
            submit={c => this.submit(c)}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }
}
