import React from "react";
import { View } from "react-native";
import ICategory from "../../models/ICategory";
import styles from "./styles";
import FormButton from "../FormButton";
import FormInput from "../FormInput";
import ColorSelector from "../ColorSelector";

interface IProp {
  initialCategory?: ICategory;
  submit: (category: ICategory) => void;
}

interface IState {
  name: string;
  color: string;
}

export default class CategoryForm extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      name: props.initialCategory ? props.initialCategory.name : "",
      color: props.initialCategory ? props.initialCategory.color : "#ff0000",
    };
  }

  private submit() {
    this.props.submit({ name: this.state.name, color: this.state.color });
  }

  public render() {
    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <ColorSelector
          initialValue={this.state.color}
          onChangeValue={color => this.setState({ color })}
        />
        <FormButton title="Send" onPress={() => this.submit()} />
      </View>
    );
  }
}
