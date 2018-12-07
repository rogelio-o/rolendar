import React from "react";
import { View } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv4 from "uuid/v4";
import styles from "./styles";
import FormButton from "../FormButton";
import FormInput from "../FormInput";
import { ITask } from "../../models/ITask";

interface IProp {
  initialTask: ITask;
  submit: (task: ITask) => Promise<void>;
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

interface IState {
  name: string;
  description: string;
  loading: boolean;
}

export default class TaskForm extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      name: props.initialTask.name,
      description: props.initialTask.description,
      loading: false,
    };
  }

  private submit() {
    this.setState({ loading: true });

    const initialTask: ITask | undefined = this.props.initialTask;
    this.props
      .submit({
        ...initialTask,
        id: this.getId(),
        name: this.state.name,
        description: this.state.description,
      })
      .then(() => {
        this.props.navigation.getParam("loadTasks")();
        this.props.navigation.goBack();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  private getId(): string {
    return this.props.initialTask.id === ""
      ? uuidv4()
      : this.props.initialTask.id;
  }

  public render() {
    const loading = this.state.loading;

    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <FormInput
          placeholder="Description"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
          multiline={true}
        />
        <FormButton
          title="Send"
          onPress={() => this.submit()}
          loading={loading}
        />
      </View>
    );
  }
}
