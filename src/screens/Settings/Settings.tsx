import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";
import { NavigationScreenProps } from "react-navigation";
import WeekDay from "./WeekDay";

const DAYS: number[] = [0, 1, 2, 3, 4, 5, 6];

export default class Settings extends React.Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props);
  }

  public render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {DAYS.map((day: number) => (
            <WeekDay day={day} key={day} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
