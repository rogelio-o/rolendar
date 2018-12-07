import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "tomato",
  },
  quickActionsIcon: {
    fontSize: 32,
    color: "#fff",
  },
});
