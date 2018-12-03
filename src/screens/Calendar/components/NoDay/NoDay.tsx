import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class NoDay extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>There is no settings for this day.</Text>
      </View>
    );
  }
}
