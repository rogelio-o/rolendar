import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import ICategory from "../../../../models/ICategory";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../../utils/dateUtils";
import { findAllCategories } from "../../../../repositories/categoryRepository";
import Loading from "../../../../components/Loading";
import CategoryItem from "../../../../components/CategoryItem";

interface IProp {
  day: number;
  selectCategory: (category: ICategory) => Promise<void>;
  close: () => void;
}

interface IState {
  loading: boolean;
  categories: ICategory[];
}

export default class CategorySelector extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      loading: false,
      categories: [],
    };
  }

  public componentDidMount() {
    this.setState({ loading: true });

    findAllCategories()
      .then(categories => {
        this.setState({ loading: false, categories });
      })
      .catch(() => {
        this.setState({ loading: false }, () => {
          this.props.close();
        });
      });
  }

  private selectCategory(category: ICategory) {
    this.props.selectCategory(category);
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loading visible={this.state.loading} />
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {DAYS_OF_WEEK[this.props.day]}
            </Text>
          </View>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => this.props.close()}>
              <Text style={styles.headerButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.listContainer}>
          {this.state.categories.map((category, index) => (
            <TouchableOpacity
              onPress={() => this.selectCategory(category)}
              key={index}
            >
              <CategoryItem category={category} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
