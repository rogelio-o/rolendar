import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class Tasks extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Tasks</Text>
      </View>
    );
  }
}
