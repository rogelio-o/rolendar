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

interface IProp {
  initialValue: string;
  onChangeValue: (value: string) => void;
}

interface IState {
  value: string;
  open: boolean;
  colors: ListViewDataSource;
}

const COLORS: string[] = ["#f00", "#0f0"];

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
      <View>
        <TouchableOpacity onPress={() => this.open()}>
          <View style={styles.container}>
            <View
              style={[styles.circle, { backgroundColor: this.state.value }]}
            />
            <Text style={styles.text}>Color</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.open}
        >
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView style={styles.modalScrollViewContainer}>
              <ListView
                dataSource={this.state.colors}
                renderRow={(rowData: any) => this.renderRow(rowData)}
              />
            </ScrollView>
            <View>
              <Button
                title="Cancel"
                color="tomato"
                onPress={() => this.close()}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
