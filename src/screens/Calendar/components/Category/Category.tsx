import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ICategory from "../../../../models/ICategory";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface IProp {
  category: ICategory;
  onUpdateCategory: () => void;
}

export default class Category extends React.Component<IProp> {
  public render() {
    const category: ICategory = this.props.category;

    return (
      <View style={[styles.container, { backgroundColor: category.color }]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => console.log("Add")}>
            <Ionicons name="ios-add" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{category.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.props.onUpdateCategory()}>
            <Ionicons name="ios-more" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
