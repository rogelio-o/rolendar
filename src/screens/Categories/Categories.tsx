import React from "react";
import { Text, SafeAreaView } from "react-native";
import { NavigationScreenOptions } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default class Categories extends React.Component {
  public static navigationOptions: NavigationScreenOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons
        name="md-checkmark-circle"
        size={10}
        color={tintColor ? tintColor : "black"}
      />
    ),
  };

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Categories</Text>
      </SafeAreaView>
    );
  }
}
