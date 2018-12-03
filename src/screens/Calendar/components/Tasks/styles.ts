import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerContainer: {
    flexDirection: "row",
  },
  doneIconContainer: {
    paddingRight: 10,
    width: 35,
  },
  doneIcon: {
    fontSize: 32,
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
    color: "#999",
  },
});
