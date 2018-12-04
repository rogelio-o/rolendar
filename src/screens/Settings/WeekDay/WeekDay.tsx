import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../utils/dateUtils";
import IWeekDay from "../../../models/IWeekDay";

interface IProp {
  day: number;
}

interface IState {
  weekDay: IWeekDay;
  loading: boolean;
}

export default class WeekDay extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      weekDay: { day: props.day },
      loading: false,
    };
  }

  public render() {
    const weekDay: IWeekDay = this.state.weekDay;
    const loading: boolean = this.state.loading;

    return (
      <TouchableOpacity
        onPress={() => this.setState({ loading: true })}
        disabled={loading}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.dayContainer,
              weekDay.category === undefined
                ? styles.unselectedDayContainer
                : {
                    borderColor: weekDay.category.color,
                    backgroundColor: weekDay.category.color,
                  },
            ]}
          >
            {loading ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                color={weekDay.category === undefined ? "black" : "white"}
              />
            ) : (
              <Text
                style={[
                  styles.dayText,
                  weekDay.category === undefined
                    ? styles.unselectedDayText
                    : styles.selectedDayText,
                ]}
              >
                {DAYS_OF_WEEK[weekDay.day]}
              </Text>
            )}
          </View>
          <View style={styles.categoryContainer}>
            <Text
              style={[
                styles.categoryText,
                weekDay.category === undefined
                  ? styles.unselectedCategoryText
                  : styles.selectedCategoryText,
              ]}
            >
              {weekDay.category === undefined
                ? "Select a category"
                : weekDay.category.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
