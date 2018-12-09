import React from "react";
import { Modal, ScrollView, Text, View, Alert } from "react-native";
import Category from "../Category";
import IDay from "../../../../models/IDay";
import styles from "./styles";
import Tasks from "../Tasks";
import FormButton from "../../../../components/FormButton";
import CategorySelector from "../../../../components/CategorySelector";
import ICategory from "../../../../models/ICategory";
import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from "../../../../utils/dateUtils";
import { ITask } from "../../../../models/ITask";
import TaskSelector from "../../../../components/TaskSelector";
import { findTasksByCategory } from "../../../../repositories/tasksRepository";

interface IProp {
  day: IDay;
  updateDay: (newDay: IDay) => Promise<void>;
}

interface IState {
  updateCategoryVisible: boolean;
  addTaskVisible: boolean;
}

const formatTitle = (date: Date): string => {
  return (
    date.getDate() +
    " " +
    DAYS_OF_WEEK[date.getDay()] +
    ", " +
    MONTHS_OF_YEAR[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};

export default class DayView extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      updateCategoryVisible: false,
      addTaskVisible: false,
    };
  }

  private renderMain() {
    const day: IDay = this.props.day;

    if (day.category) {
      return (
        <ScrollView>
          <Category
            category={day.category}
            onUpdateCategory={() => this.openUpdateCategory()}
            onAddTask={() => this.openAddTask()}
          />
          <Tasks initialTasks={day.tasks} />
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text style={styles.noCategoryText}>
            This day has no category. Please, select one before adding any task.
          </Text>
          <View style={styles.updateCategoryButtonContainer}>
            <FormButton
              title="Select Category"
              onPress={() => this.openUpdateCategory()}
              loading={false}
            />
          </View>
        </View>
      );
    }
  }

  private openUpdateCategory() {
    this.setState({ updateCategoryVisible: true });
  }

  private closeUpdateCategory() {
    this.setState({ updateCategoryVisible: false });
  }

  private openAddTask() {
    this.setState({ addTaskVisible: true });
  }

  private closeAddTask() {
    this.setState({ addTaskVisible: false });
  }

  private changeCategory(category: ICategory): Promise<void> {
    const newDay: IDay = { ...this.props.day, category, tasks: [] };

    return this.props.updateDay(newDay).then(() =>
      this.setState({
        updateCategoryVisible: false,
      })
    );
  }

  private askChangeCategory(category: ICategory): Promise<void> {
    if (this.props.day.tasks.length === 0) {
      return this.changeCategory(category);
    } else {
      return new Promise((resolve, reject) => {
        Alert.alert(
          "Update category",
          "Are you sure you want update the category of this day? All the attached tasks are going to be dettached.",
          [
            {
              text: "No",
              onPress: () => {
                this.closeUpdateCategory();
                resolve();
              },
            },
            {
              text: "Yes",
              onPress: () =>
                this.changeCategory(category)
                  .then(resolve)
                  .catch(reject),
            },
          ],
          { cancelable: false }
        );
      });
    }
  }

  private addTask(task: ITask): Promise<void> {
    const newDay: IDay = { ...this.props.day };
    newDay.tasks.push(task);

    return this.props.updateDay(newDay).then(() =>
      this.setState({
        addTaskVisible: false,
      })
    );
  }

  public render() {
    const day: IDay = this.props.day;
    const category: ICategory | undefined = day.category;

    return (
      <View style={styles.container}>
        {this.renderMain()}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.updateCategoryVisible}
          onRequestClose={() => {
            /**/
          }}
        >
          <CategorySelector
            title={formatTitle(day.date)}
            close={() => this.closeUpdateCategory()}
            selectCategory={c => this.askChangeCategory(c)}
          />
        </Modal>
        {category ? (
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.addTaskVisible}
            onRequestClose={() => {
              /**/
            }}
          >
            <TaskSelector
              title={formatTitle(day.date) + ` (${category.name})`}
              close={() => this.closeAddTask()}
              selectTask={task => this.addTask(task)}
              tasksGetter={() => findTasksByCategory(category)}
            />
          </Modal>
        ) : null}
      </View>
    );
  }
}
