import React from "react";
import {
  Alert,
  SwipeableListView,
  TouchableOpacity,
  View,
  SwipeableListViewDataSource,
  SafeAreaView,
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { createDataSource } from "../../utils/listsUtils";
import ICategory from "../../models/ICategory";
import {
  deleteCategory,
  findAllCategories,
} from "../../repositories/categoryRepository";
import Loading from "../../components/Loading";
import CategoryItem from "../../components/CategoryItem";

interface IState {
  loading: boolean;
  categories: SwipeableListViewDataSource | null;
}

export default class Categories extends React.Component<
  NavigationScreenProps,
  IState
> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      loading: false,
      categories: null,
    };
  }

  public componentDidMount() {
    this.loadCategories();

    this.props.navigation.setParams({
      loadCategories: this.loadCategories.bind(this),
    });
  }

  public loadCategories() {
    this.setState({ loading: true });

    findAllCategories().then(categories => {
      const ds =
        this.state.categories === null
          ? SwipeableListView.getNewDataSource()
          : this.state.categories;
      this.setState({
        loading: false,
        categories: createDataSource(ds, categories),
      });
    });
  }

  public quickActions(
    rowData: ICategory,
    sectionID: string | number,
    rowID: string | number
  ): JSX.Element {
    return (
      <View style={styles.quickActionsContainer}>
        <View style={styles.quickActionsInnerContainer}>
          <TouchableOpacity
            style={[
              styles.quickActionsItemContainer,
              styles.quickActionsDeleteContainer,
            ]}
            onPress={() => this.askDeleteCategory(rowID)}
          >
            <Ionicons name="ios-trash" style={[styles.quickActionsIcon]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  public askDeleteCategory(rowID: string | number): void {
    Alert.alert(
      "Delete category",
      "Are you sure you want delete this category and all its tasks?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => this.deleteCategory(rowID) },
      ],
      { cancelable: false }
    );
  }

  public deleteCategory(id: string | number) {
    deleteCategory(id as string).then(() => {
      this.loadCategories();
    });
  }

  public render() {
    const categories: SwipeableListViewDataSource | null = this.state
      .categories;

    return (
      <SafeAreaView style={styles.container}>
        <Loading visible={this.state.loading} />
        {categories === null ? null : (
          <SwipeableListView
            dataSource={categories}
            renderRow={row => <CategoryItem category={row} />}
            bounceFirstRowOnMount={true}
            maxSwipeDistance={62}
            renderQuickActions={(
              rowData: any,
              sectionID: string | number,
              rowID: string | number
            ) => this.quickActions(rowData, sectionID, rowID)}
          />
        )}
      </SafeAreaView>
    );
  }
}
