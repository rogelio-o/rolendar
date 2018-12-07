import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {},
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
    backgroundColor: "tomato",
  },
  quickActionsUpdateContainer: {
    backgroundColor: "blue",
  },
  quickActionsIcon: {
    fontSize: 32,
    color: "#fff",
  },
});
