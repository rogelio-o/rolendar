import { StyleSheet } from "react-native";
import styleColors from "../../config/styleColors";

export default StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  innerContainer: {
    marginBottom: 25,
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 6,
    flexDirection: "row",
  },
  text: {
    color: "#bbb",
  },
  circle: {
    width: 15,
    height: 15,
    marginRight: 6,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: styleColors.main,
  },
  modalScrollViewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalRow: {
    height: 60,
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
});
