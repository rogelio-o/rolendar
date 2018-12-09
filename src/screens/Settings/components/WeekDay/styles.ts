import { StyleSheet } from "react-native";
import styleColors from "../../../../config/styleColors";

export default StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: styleColors.softGray,
    backgroundColor: "white",
    flexDirection: "row",
  },
  dayContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  unselectedDayContainer: {
    borderColor: styleColors.gray,
  },
  dayText: {},
  unselectedDayText: {
    color: "black",
  },
  selectedDayText: {
    color: "white",
    fontWeight: "bold",
  },
  categoryContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  categoryText: {},
  unselectedCategoryText: {
    color: styleColors.gray,
  },
  selectedCategoryText: {
    color: "black",
  },
  activityIndicator: {},
});
