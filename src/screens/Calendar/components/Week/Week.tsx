import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface IProp {
  initialDate: Date;
  onDateSelection: (date: Date) => void;
}

interface IState {
  selectedDate: Date;
}

const DAYS_OF_WEEK: string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const MONTHS_OF_YEAR: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export class Week extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      selectedDate: props.initialDate,
    };
  }

  private getDates(): Date[] {
    const result: Date[] = [];
    const firstDate: Date = this.getFirstDate();
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDate.toString());
      date.setDate(firstDate.getDate() + i);

      result.push(date);
    }

    return result;
  }

  private getFirstDate(): Date {
    const selectedDate = this.state.selectedDate;
    const prevMonday = new Date(selectedDate.toString());
    prevMonday.setDate(
      selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7)
    );

    return prevMonday;
  }

  private getTitle(dates: Date[]): string {
    const firstDate: Date = dates[0];
    const lastDate: Date = dates[dates.length - 1];
    let result: string = this.getMonth(firstDate);
    if (firstDate.getMonth() !== lastDate.getMonth()) {
      result += " / " + this.getMonth(lastDate);
    }

    return result;
  }

  private getMonth(date: Date): string {
    return MONTHS_OF_YEAR[date.getMonth()] + " " + date.getFullYear();
  }

  public getDayComponent(date: Date, index: number): JSX.Element {
    const selectedDate: Date = this.state.selectedDate;
    const isActive: boolean = date.toString() === selectedDate.toString();

    return (
      <View
        key={index}
        style={[
          styles.dayContainer,
          isActive ? styles.activeDayContainer : undefined,
        ]}
      >
        <TouchableOpacity onPress={() => this.onDateSelection(date)}>
          <Text
            style={[
              styles.dayWeekDay,
              isActive ? styles.activeWeekDay : undefined,
            ]}
          >
            {DAYS_OF_WEEK[index]}
          </Text>
          <Text
            style={[
              styles.dayMonthDay,
              isActive ? styles.activeMonthDay : undefined,
            ]}
          >
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onDateSelection(selectedDate: Date) {
    this.setState({ selectedDate });

    this.props.onDateSelection(selectedDate);
  }

  private goNextWeek(): void {
    const selectedDate: Date = this.state.selectedDate;
    const nextWeek: Date = new Date(selectedDate.toString());
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.onDateSelection(nextWeek);
  }

  private goPreviousWeek(): void {
    const selectedDate: Date = this.state.selectedDate;
    const previousWeek: Date = new Date(selectedDate.toString());
    previousWeek.setDate(previousWeek.getDate() - 7);

    this.onDateSelection(previousWeek);
  }

  public render() {
    const dates: Date[] = this.getDates();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>{this.getTitle(dates)}</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.daysContainer}>
          <View style={styles.arrowsContainer}>
            <TouchableOpacity onPress={() => this.goPreviousWeek()}>
              <Ionicons name="ios-arrow-back" style={styles.arrowsButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.daysInnerContainer}>
            {dates.map(this.getDayComponent.bind(this))}
          </View>
          <View style={styles.arrowsContainer}>
            <TouchableOpacity onPress={() => this.goNextWeek()}>
              <Ionicons name="ios-arrow-forward" style={styles.arrowsButton} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
