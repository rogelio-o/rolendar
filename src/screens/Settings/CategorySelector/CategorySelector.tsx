import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import ICategory from "../../../models/ICategory";
import styles from "./styles";
import { DAYS_OF_WEEK } from "../../../utils/dateUtils";

interface IProp {
  day: number;
  selectCategory: (category: ICategory) => Promise<void>;
  close: () => void;
}

const CATEGORIES: ICategory[] = [
  { name: "Category 1", color: "#f00" },
  { name: "Category 2", color: "#0f0" },
  { name: "Category 3", color: "#00f" },
];

export default class CategorySelector extends React.Component<IProp> {
  private selectCategory(category: ICategory) {
    this.props.selectCategory(category);
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
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
        <View style={styles.listContainer}>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => this.selectCategory(category)}
              key={index}
            >
              <View
                style={[
                  styles.itemColorContainer,
                  { backgroundColor: category.color },
                ]}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}
