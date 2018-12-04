import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../utils/dateUtils";
import IWeekDay from "../../../models/IWeekDay";

interface IProp {
  day: number;
}

interface IState {
  weekDay: IWeekDay;
}

export default class WeekDay extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      weekDay: { day: props.day },
    };
  }

  public render() {
    const weekDay: IWeekDay = this.state.weekDay;

    return (
      <TouchableOpacity onPress={() => console.log("OK")}>
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
            <Text
              style={[
                styles.dayText,
                weekDay.category === undefined
                  ? styles.unselectedDayText
                  : {
                      color: weekDay.category.color,
                    },
              ]}
            >
              {DAYS_OF_WEEK[weekDay.day]}
            </Text>
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
