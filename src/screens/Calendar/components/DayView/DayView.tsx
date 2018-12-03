import React from "react";
import { ScrollView } from "react-native";
import Category from "../Category";
import IDay from "../../../../models/IDay";
import styles from "./styles";
import Tasks from "../Tasks";

interface IProp {
  day: IDay;
}

export default class DayView extends React.Component<IProp> {
  public render() {
    const day: IDay = this.props.day;

    return (
      <ScrollView style={styles.container}>
        <Category category={day.category} />
        <Tasks initialTasks={day.tasks} />
      </ScrollView>
    );
  }
}
