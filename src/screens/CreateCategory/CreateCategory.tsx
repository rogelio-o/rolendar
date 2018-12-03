import React from "react";
import { View, Text } from "react-native";
import CategoryForm from "../../components/CategoryForm";

export default class CreateCategory extends React.Component {
  public render() {
    return (
      <View>
        <CategoryForm submit={category => console.log(category)} />
      </View>
    );
  }
}
