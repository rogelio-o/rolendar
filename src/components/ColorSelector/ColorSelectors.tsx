import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ListView,
  ListViewDataSource,
} from "react-native";
import styles from "./styles";
import COLORS from "../../config/colors";
import styleColors from "../../config/styleColors";

interface IProp {
  initialValue: string;
  onChangeValue: (value: string) => void;
}

interface IState {
  value: string;
  open: boolean;
  colors: ListViewDataSource;
}

export default class ColorSelector extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      open: false,
      colors: ds.cloneWithRows(COLORS),
      value: props.initialValue,
    };
  }

  private renderRow(color: string) {
    return (
      <TouchableOpacity onPress={() => this.changeValue(color)}>
        <View style={[styles.modalRow, { backgroundColor: color }]} />
      </TouchableOpacity>
    );
  }

  private changeValue(value: string) {
    this.props.onChangeValue(value);
    this.setState({ value });
    this.close();
  }

  private open() {
    this.setState({ open: true });
  }

  private close() {
    this.setState({ open: false });
  }

  public render() {
    return (
      <View style={{ marginBottom: 25 }}>
        <TouchableOpacity
          onPress={() => this.open()}
          style={styles.innerContainer}
        >
          <View
            style={[styles.circle, { backgroundColor: this.state.value }]}
          />
          <Text style={styles.text}>Color</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.open}
          onRequestClose={() => {
            /**/
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView style={styles.modalScrollViewContainer}>
              <ListView
                dataSource={this.state.colors}
                renderRow={(rowData: any) => this.renderRow(rowData)}
                style={styles.listViewContainer}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                color={styleColors.main}
                onPress={() => this.close()}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
