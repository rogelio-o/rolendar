import React from "react";
import { Text, SafeAreaView } from "react-native";
import styles from "./styles";

export default class Settings extends React.Component {
  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Settings</Text>
      </SafeAreaView>
    );
  }
}
