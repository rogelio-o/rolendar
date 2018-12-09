import { StyleSheet } from "react-native";
import styleColors from "../../config/styleColors";

export default StyleSheet.create({
  container: {},
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
  quickActionsUpdateContainer: {
    backgroundColor: styleColors.info,
  },
  quickActionsTasksContainer: {
    backgroundColor: styleColors.warning,
  },
  quickActionsIcon: {
    fontSize: 25,
    color: "#fff",
  },
});
