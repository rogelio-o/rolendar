import IWeekDay from "../models/IWeekDay";
import { AsyncStorage } from "react-native";
import { IWeekDayRaw } from "../models/storage/IWeekDayRaw";
import ICategory from "../models/ICategory";
import { findCategoryById } from "./categoryRepository";

const KEY: string = "WEEK_DAY:";

export const findWeekDayByDay = async (day: number): Promise<IWeekDay> => {
  const str: string | null = await AsyncStorage.getItem(KEY + day);

  if (str === null) {
    return { day };
  } else {
    const raw: IWeekDayRaw = JSON.parse(str);
    const category: ICategory | undefined = raw.categoryId
      ? await findCategoryById(raw.categoryId)
      : undefined;
    return { day, category };
  }
};

export const saveWeekDay = async (weekDay: IWeekDay): Promise<void> => {
  const categoryId: string | undefined = weekDay.category
    ? weekDay.category.id
    : undefined;
  const raw: IWeekDayRaw = { categoryId };
  await AsyncStorage.setItem(KEY + weekDay.day, JSON.stringify(raw));
};
