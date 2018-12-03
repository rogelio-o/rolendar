import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  iconContainer: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    fontSize: 32,
    color: "white",
  },
});
