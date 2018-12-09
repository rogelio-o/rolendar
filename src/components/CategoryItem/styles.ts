import { StyleSheet } from "react-native";
import styleColors from "../../config/styleColors";

export default StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: styleColors.softGray,
    backgroundColor: "white",
    flexDirection: "row",
  },
  itemColorContainer: {
    width: 20,
    height: 20,
  },
  itemTextContainer: {
    paddingLeft: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
