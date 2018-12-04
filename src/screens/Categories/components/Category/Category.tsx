import React from "react";
import { Text } from "react-native";
import ICategory from "../../../../models/ICategory";

interface IProp {
  category: ICategory;
}

export default class Category extends React.Component<IProp> {
  public render() {
    return <Text>{this.props.category.name}</Text>;
  }
}
