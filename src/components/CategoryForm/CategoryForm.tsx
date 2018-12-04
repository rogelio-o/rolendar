import React from "react";
import { View } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import ICategory from "../../models/ICategory";
import styles from "./styles";
import FormButton from "../FormButton";
import FormInput from "../FormInput";
import ColorSelector from "../ColorSelector";
import COLORS from "../../config/colors";

interface IProp {
  initialCategory?: ICategory;
  submit: (category: ICategory) => Promise<void>;
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

interface IState {
  name: string;
  color: string;
  loading: boolean;
}

const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export default class CategoryForm extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      name: props.initialCategory ? props.initialCategory.name : "",
      color: props.initialCategory
        ? props.initialCategory.color
        : COLORS[Math.round(random(0, COLORS.length - 1))],
      loading: false,
    };
  }

  private submit() {
    this.setState({ loading: true });

    this.props
      .submit({
        id: this.getId(),
        name: this.state.name,
        color: this.state.color,
      })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  private getId(): string {
    return this.props.initialCategory ? this.props.initialCategory.id : "";
  }

  public render() {
    const loading = this.state.loading;

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
        <FormButton
          title="Send"
          onPress={() => this.submit()}
          loading={loading}
        />
      </View>
    );
  }
}
