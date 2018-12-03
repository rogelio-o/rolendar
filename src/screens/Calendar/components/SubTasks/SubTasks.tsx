import React from "react";
import { View } from "react-native";
import { ITask } from "../../../../models/ITask";

interface IProp {
  tasks: ITask[];
}

export default class SubTasks extends React.Component<IProp> {
  public render() {
    return <View />;
  }
}
