import React from "react";
import { Button, View } from "react-native";
import styles from "./styles";

interface IProp {
  title: string;
  onPress: () => void;
}

export default class FormButton extends React.Component<IProp> {
  public render() {
    return (
      <View style={styles.container}>
        <Button
          title={this.props.title}
          color="tomato"
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}
