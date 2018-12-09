import { StyleSheet } from "react-native";
import styleColors from "../../../../config/styleColors";

export default StyleSheet.create({
  quickActionsContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  quickActionsInnerContainer: {
    flex: 1,
    flexDirection: "row",
    width: 124,
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
  quickActionsUpdateSubtasksContainer: {
    backgroundColor: styleColors.info,
  },
  quickActionsIcon: {
    fontSize: 32,
    color: "#fff",
  },
});
