import React from "react";
import { Text, TouchableOpacity } from "react-native";
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
                backgroundColor: "tomato",
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
                backgroundColor: "tomato",
              },
            }),
          },
          Tasks: {
            screen: Tasks,
            navigationOptions: () => ({
              title: "Tasks",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "tomato",
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
        inactiveBackgroundColor: "tomato",
        activeBackgroundColor: "#ff8e7a",
        activeTintColor: "white",
        inactiveTintColor: "white",
      },
    }
  )
);
