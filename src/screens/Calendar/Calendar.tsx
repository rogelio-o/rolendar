import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";
import Week from "./components/Week";
import IDay from "../../models/IDay";
import NoDay from "./components/NoDay";
import DayView from "./components/DayView/DayView";
import { findDayByDate, saveDay } from "../../repositories/dayRepository";
import Loading from "../../components/Loading";

interface IState {
  selectedDate: Date;
  loading: boolean;
  day?: IDay;
}

export default class Calendar extends React.Component<{}, IState> {
  private initialDate: Date;

  constructor(props: {}) {
    super(props);

    this.initialDate = new Date();

    this.state = {
      selectedDate: this.initialDate,
      loading: false,
    };
  }

  public componentDidMount() {
    this.loadDay();
  }

  private loadDay() {
    this.setState({ loading: true });
    findDayByDate(this.state.selectedDate)
      .then(day => this.setState({ loading: false, day }))
      .catch(() => this.setState({ loading: false }));
  }

  private onDateSelection(selectedDate: Date): void {
    this.setState({ selectedDate }, () => this.loadDay());
  }

  private updateDay(newDay: IDay): Promise<void> {
    this.setState({ loading: true });
    return saveDay(newDay)
      .then(() =>
        this.setState({
          loading: false,
          day: newDay,
        })
      )
      .catch(() => this.setState({ loading: false }));
  }

  public render() {
    const day: IDay | undefined = this.state.day;

    return (
      <SafeAreaView style={styles.container}>
        <Loading visible={this.state.loading} />
        <Week
          initialDate={this.initialDate}
          onDateSelection={date => this.onDateSelection(date)}
        />
        {day ? (
          <DayView updateDay={newDay => this.updateDay(newDay)} day={day} />
        ) : (
          <NoDay />
        )}
      </SafeAreaView>
    );
  }
}
