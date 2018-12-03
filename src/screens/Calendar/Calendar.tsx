import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";
import Week from "./components/Week";
import IDay from "../../models/IDay";
import NoDay from "./components/NoDay";
import DayView from "./components/DayView/DayView";

interface IState {
  selectedDate: Date;
  day?: IDay;
}

export default class Calendar extends React.Component<{}, IState> {
  private initialDate: Date;

  constructor(props: {}) {
    super(props);

    this.initialDate = new Date();

    this.state = {
      selectedDate: this.initialDate,
    };
  }

  public componentDidMount() {
    const day: IDay = {
      date: new Date(),
      category: { name: "Test Category", color: "#f00" },
      tasks: [
        {
          id: "3",
          name: "Test Task",
          description: "Test Description",
          done: false,
          category: { name: "Test Category", color: "#f00" },
          hasSubtasks: true,
          subtasks: [
            {
              id: "1",
              name: "Test Subtask 1",
              description: "Test Description 1",
              done: true,
              category: { name: "Test Category", color: "#f00" },
              hasSubtasks: false,
              subtasks: [],
            },
            {
              id: "2",
              name: "Test Subtask 1",
              description: "Test Description 1",
              done: true,
              category: { name: "Test Category", color: "#f00" },
              hasSubtasks: false,
              subtasks: [],
            },
          ],
        },
        {
          id: "4",
          name: "Test Task 2",
          description: "Test Description",
          done: true,
          category: { name: "Test Category", color: "#f00" },
          hasSubtasks: false,
          subtasks: [],
        },
      ],
    };
    this.setState({ day });
  }

  private onDateSelection(selectedDate: Date): void {
    this.setState({ selectedDate });
  }

  public render() {
    const day: IDay | undefined = this.state.day;

    return (
      <SafeAreaView style={styles.container}>
        <Week
          initialDate={this.initialDate}
          onDateSelection={date => this.onDateSelection(date)}
        />
        {day ? <DayView day={day} /> : <NoDay />}
      </SafeAreaView>
    );
  }
}
