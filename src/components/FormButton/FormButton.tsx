import React, { RefObject } from "react";
import { View } from "react-native";
// @ts-ignore
import AnimateLoadingButton from "react-native-animate-loading-button";
import styles from "./styles";
import styleColors from "../../config/styleColors";

interface IProp {
  title: string;
  onPress: () => void;
  loading: boolean;
}

export default class FormButton extends React.Component<IProp> {
  private loadingButton: RefObject<AnimateLoadingButton> = React.createRef();

  public componentDidUpdate(prevProps: IProp) {
    if (prevProps.loading !== this.props.loading) {
      this.loadingButton.current.showLoading(this.props.loading);
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <AnimateLoadingButton
          ref={this.loadingButton}
          title={this.props.title}
          color={styleColors.main}
          width={300}
          height={50}
          titleFontSize={16}
          titleColor="#fff"
          backgroundColor={styleColors.main}
          onPress={this.props.onPress}
          disabled={this.props.loading}
        />
      </View>
    );
  }
}
