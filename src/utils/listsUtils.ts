import { SwipeableListViewDataSource } from "react-native";

export const createDataSource = (
  ds: SwipeableListViewDataSource,
  initialTasks: any[]
): SwipeableListViewDataSource => {
  const dataBlob: { [key: string]: any } = {};
  const rowsIds: string[] = [];
  initialTasks.forEach(task => {
    dataBlob[task.id] = task;
    rowsIds.push(task.id);
  });

  return ds.cloneWithRowsAndSections({ "0": dataBlob }, ["0"], [rowsIds]);
};
