import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
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
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
