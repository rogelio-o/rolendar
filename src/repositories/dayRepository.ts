import { AsyncStorage } from "react-native";
import IDay from "../models/IDay";
import IDayRaw from "../models/storage/IDayRaw";
import { findWeekDayByDay } from "./weekDayRepository";
import IWeekDay from "../models/IWeekDay";
import { findCategoryById } from "./categoryRepository";
import { findTaskById } from "./tasksRepository";

const KEY = "DAY:";

const formatDate = (date: Date): string => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const findDayByDate = async (date: Date): Promise<IDay> => {
  const str: string | null = await AsyncStorage.getItem(KEY + formatDate(date));

  if (str === null) {
    const baseZeroWeekDay = date.getDay();
    const weekDay: IWeekDay = await findWeekDayByDay(
      baseZeroWeekDay === 0 ? 6 : baseZeroWeekDay - 1
    );

    return { date, category: weekDay.category, tasks: [] };
  } else {
    const raw: IDayRaw = JSON.parse(str);

    return {
      date,
      category: raw.categoryId
        ? await findCategoryById(raw.categoryId)
        : undefined,
      tasks: await Promise.all(raw.tasksIds.map(findTaskById)),
    };
  }
};

export const saveDay = async (day: IDay): Promise<void> => {
  const raw: IDayRaw = {
    categoryId: day.category ? day.category.id : undefined,
    tasksIds: day.tasks.map(t => t.id),
  };

  await AsyncStorage.setItem(KEY + formatDate(day.date), JSON.stringify(raw));
};
