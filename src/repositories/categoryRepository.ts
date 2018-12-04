import { AsyncStorage } from "react-native";
import ICategory from "../models/ICategory";

const KEY: string = "CATEGORIES";
const CATEGORIES: { [name: string]: ICategory } = {};
let LOADED_CATEGORIES: boolean = false;

const toArray = (obj: { [name: string]: ICategory }): ICategory[] => {
  return Array.from(Object.keys(obj), k => obj[k]);
};

const save = async (): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(toArray(CATEGORIES)));
};

const load = async (): Promise<void> => {
  const str: string | null = await AsyncStorage.getItem(KEY);
  LOADED_CATEGORIES = true;

  if (str !== null) {
    const array: ICategory[] = JSON.parse(str);
    array.forEach(category => (CATEGORIES[category.id] = category));
  }
};

export async function deleteCategory(id: string): Promise<void> {
  delete CATEGORIES[id];

  save();
}

export async function saveCategory(category: ICategory) {
  CATEGORIES[category.id] = category;

  save();
}

export async function findCategoryById(id: string) {
  if (LOADED_CATEGORIES) {
    return CATEGORIES[id];
  } else {
    await load();

    return CATEGORIES[id];
  }
}

export async function findAllCategories(): Promise<ICategory[]> {
  if (LOADED_CATEGORIES) {
    return Promise.resolve(toArray(CATEGORIES));
  } else {
    await load();

    return toArray(CATEGORIES);
  }
}
