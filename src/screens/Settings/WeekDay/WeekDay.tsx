import React from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../utils/dateUtils";
import IWeekDay from "../../../models/IWeekDay";
import CategorySelector from "../CategorySelector";
import ICategory from "../../../models/ICategory";

interface IProp {
  day: number;
}

interface IState {
  weekDay: IWeekDay;
  loading: boolean;
  selectorOpen: boolean;
}

export default class WeekDay extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      weekDay: { day: props.day },
      loading: false,
      selectorOpen: false,
    };
  }

  private changeCategory(category: ICategory): Promise<void> {
    this.closeSelector();

    this.setState({ loading: true });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const weekDay: IWeekDay = this.state.weekDay;
        weekDay.category = category;
        this.setState({ loading: false, weekDay }, () => resolve());
      }, 500);
    });
  }

  private openSelector() {
    this.setState({ selectorOpen: true });
  }

  private closeSelector() {
    this.setState({ selectorOpen: false });
  }

  public render() {
    const weekDay: IWeekDay = this.state.weekDay;
    const loading: boolean = this.state.loading;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.openSelector()}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.selectorOpen}
        >
          <CategorySelector
            day={weekDay.day}
            close={() => this.setState({ selectorOpen: false })}
            selectCategory={category => this.changeCategory(category)}
          />
        </Modal>
      </View>
    );
  }
}
