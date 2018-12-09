import { StyleSheet } from "react-native";
import styleColors from "../../config/styleColors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  quickActionsContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  quickActionsInnerContainer: {
    flex: 1,
    flexDirection: "row",
    width: 186,
  },
  quickActionsItemContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionsDeleteContainer: {
    backgroundColor: styleColors.danger,
  },
  quickActionsIcon: {
    fontSize: 25,
    color: "#fff",
  },
});
