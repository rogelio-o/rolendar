import { StyleSheet } from "react-native";
import styleColors from "../../../../config/styleColors";

export default StyleSheet.create({
  taskContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  taskInnerContainer: {
    flexDirection: "row",
  },
  headerContainer: {},
  doneIconContainer: {
    paddingRight: 10,
    width: 35,
  },
  doneIcon: {
    fontSize: 32,
    color: styleColors.main,
  },
  nameContainer: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionText: {
    color: styleColors.gray,
  },
});
