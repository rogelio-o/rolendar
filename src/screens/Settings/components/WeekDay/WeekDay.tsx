import React from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../../utils/dateUtils";
import IWeekDay from "../../../../models/IWeekDay";
import CategorySelector from "../../../../components/CategorySelector";
import ICategory from "../../../../models/ICategory";
import {
  findWeekDayByDay,
  saveWeekDay,
} from "../../../../repositories/weekDayRepository";

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

  public componentDidMount() {
    this.setState({ loading: true });

    findWeekDayByDay(this.state.weekDay.day).then(weekDay => {
      this.setState({ loading: false, weekDay });
    });
  }

  private changeCategory(category: ICategory): Promise<void> {
    this.closeSelector();

    this.setState({ loading: true });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const oldWeekDay: IWeekDay = this.state.weekDay;
        const weekDay: IWeekDay = { ...oldWeekDay, category };

        saveWeekDay(weekDay)
          .then(() => {
            this.setState({ loading: false, weekDay }, () => resolve());
          })
          .catch(() => this.setState({ loading: false }));
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
          onRequestClose={() => {
            /**/
          }}
        >
          <CategorySelector
            title={DAYS_OF_WEEK[weekDay.day]}
            close={() => this.setState({ selectorOpen: false })}
            selectCategory={category => this.changeCategory(category)}
          />
        </Modal>
      </View>
    );
  }
}
