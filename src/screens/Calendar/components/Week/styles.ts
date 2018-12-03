import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    marginTop: 25,
    paddingTop: 10,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
  },
  headerLeft: {
    flex: 1,
    paddingLeft: 20,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  headerMiddle: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    fontSize: 32,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  daysContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  daysInnerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  activeDayContainer: {
    backgroundColor: "white",
  },
  arrowsContainer: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  arrowsButton: {
    fontSize: 32,
    color: "white",
  },
  dayWeekDay: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  activeWeekDay: {
    color: "tomato",
  },
  dayMonthDay: {
    textAlign: "center",
    color: "white",
  },
  activeMonthDay: {
    color: "tomato",
  },
});
