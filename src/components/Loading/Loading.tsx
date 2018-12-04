import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";

interface IProp {
  visible: boolean;
}

interface IState {
  visible: boolean;
}

export default class Loading extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  public componentDidUpdate(prevProps: IProp) {
    if (this.state.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  public render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator
            color="white"
            size="large"
            style={styles.loadingIcon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.loadingText}>Loading</Text>
          </View>
        </View>
      </View>
    );
  }
}
