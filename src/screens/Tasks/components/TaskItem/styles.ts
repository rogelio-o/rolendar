import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
  },
  itemCheckboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  itemDoneCheckboxContainer: {
    backgroundColor: "black",
  },
  itemUndoneCheckboxContainer: {},
  itemTextContainer: {
    paddingLeft: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemDescriptionText: {
    marginTop: 10,
    color: "#ccc",
  },
});
