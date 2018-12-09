import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  // @ts-ignore
  createAppContainer,
  NavigationScreenProp,
  NavigationRoute,
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "../../screens/Calendar";
import Categories from "../../screens/Categories";
import Tasks from "../../screens/Tasks";
import Settings from "../../screens/Settings";
import CreateCategory from "../../screens/CreateCategory";
import UpdateCategory from "../../screens/UpdateCategory/UpdateCategory";
import CreateTask from "../../screens/CreateTask";
import UpdateTask from "../../screens/UpdateTask/UpdateTask";
import Subtasks from "../../screens/Subtasks";
import CreateSubtask from "../../screens/CreateSubtask";
import styleColors from "../../config/styleColors";

export default createAppContainer(
  createBottomTabNavigator(
    {
      Calendar: {
        screen: Calendar,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }: { tintColor: string | null }) => (
            <Ionicons
              name="ios-calendar"
              size={25}
              color={tintColor ? tintColor : "black"}
            />
          ),
        }),
      },
      Tasks: createStackNavigator(
        {
          Categories: {
            screen: Categories,
            navigationOptions: ({
              navigation,
            }: {
              navigation: NavigationScreenProp<NavigationRoute>;
            }) => ({
              title: "Categories",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
              headerRight: (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CreateCategory", {
                      loadCategories: navigation.getParam("loadCategories"),
                    })
                  }
                  style={{ paddingRight: 15 }}
                >
                  <Ionicons name="ios-add" size={32} color="white" />
                </TouchableOpacity>
              ),
            }),
          },
          CreateCategory: {
            screen: CreateCategory,
            navigationOptions: () => ({
              title: "New Category",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
            }),
          },
          UpdateCategory: {
            screen: UpdateCategory,
            navigationOptions: () => ({
              title: "Update Category",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
            }),
          },
          Tasks: {
            screen: Tasks,
            navigationOptions: ({
              navigation,
            }: {
              navigation: NavigationScreenProp<NavigationRoute>;
            }) => ({
              title: `Tasks of ${navigation.getParam("category").name}`,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
              headerRight: (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CreateTask", {
                      loadTasks: navigation.getParam("loadTasks"),
                      category: navigation.getParam("category"),
                    })
                  }
                  style={{ paddingRight: 15 }}
                >
                  <Ionicons name="ios-add" size={32} color="white" />
                </TouchableOpacity>
              ),
            }),
          },
          CreateTask: {
            screen: CreateTask,
            navigationOptions: () => ({
              title: "New Task",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
            }),
          },
          UpdateTask: {
            screen: UpdateTask,
            navigationOptions: () => ({
              title: "Update Task",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
            }),
          },
          Subtasks: {
            screen: Subtasks,
            navigationOptions: ({
              navigation,
            }: {
              navigation: NavigationScreenProp<NavigationRoute>;
            }) => ({
              title: `Subtasks of ${navigation.getParam("task").name}`,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
              headerRight: (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CreateSubtask", {
                      loadTasks: navigation.getParam("loadTasks"),
                      task: navigation.getParam("task"),
                    })
                  }
                  style={{ paddingRight: 15 }}
                >
                  <Ionicons name="ios-add" size={32} color="white" />
                </TouchableOpacity>
              ),
            }),
          },
          CreateSubtask: {
            screen: CreateSubtask,
            navigationOptions: ({
              navigation,
            }: {
              navigation: NavigationScreenProp<NavigationRoute>;
            }) => ({
              title: `New Subtask of ${navigation.getParam("task").name}`,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: styleColors.main,
              },
            }),
          },
        },
        {
          navigationOptions: () => ({
            tabBarIcon: ({ tintColor }: { tintColor: string | null }) => (
              <Ionicons
                name="ios-list"
                size={25}
                color={tintColor ? tintColor : "black"}
              />
            ),
          }),
        }
      ),
      Settings: {
        screen: Settings,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }: { tintColor: string | null }) => (
            <Ionicons
              name="ios-settings"
              size={25}
              color={tintColor ? tintColor : "black"}
            />
          ),
        }),
      },
    },
    {
      swipeEnabled: false,
      animationEnabled: true,
      tabBarOptions: {
        showLabel: true,
        showIcon: true,
        inactiveBackgroundColor: styleColors.main,
        activeBackgroundColor: "#ff8e7a",
        activeTintColor: "white",
        inactiveTintColor: "white",
        style: {
          backgroundColor: styleColors.main,
        },
      },
    }
  )
);
