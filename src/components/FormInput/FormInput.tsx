import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

interface IProp {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

export default class FormInput extends React.Component<IProp> {
  public render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        style={styles.input}
      />
    );
  }
}