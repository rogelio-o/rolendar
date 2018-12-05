import React from "react";
import { Text, View } from "react-native";
import ICategory from "../../models/ICategory";
import styles from "./styles";

interface IProp {
  category: ICategory;
}

export default class CategoryItem extends React.Component<IProp> {
  public render() {
    const category: ICategory = this.props.category;

    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.itemColorContainer,
            { backgroundColor: category.color },
          ]}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{category.name}</Text>
        </View>
      </View>
    );
  }
}
