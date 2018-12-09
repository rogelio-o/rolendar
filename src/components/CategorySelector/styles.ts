import { StyleSheet } from "react-native";
import styleColors from "../../config/styleColors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleColors.main,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 15,
  },
  headerTextContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerButton: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
