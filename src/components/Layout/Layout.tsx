import {
  createBottomTabNavigator,
  createStackNavigator,
  // @ts-ignore
  createAppContainer,
} from "react-navigation";
import Calendar from "../../screens/Calendar";
import Categories from "../../screens/Categories";
import Tasks from "../../screens/Tasks";
import Settings from "../../screens/Settings";

export default createAppContainer(
  createBottomTabNavigator(
    {
      Calendar: {
        screen: Calendar,
      },
      Tasks: createStackNavigator({
        Categories: {
          screen: Categories,
        },
        Tasks: {
          screen: Tasks,
        },
      }),
      Settings: {
        screen: Settings,
      },
    },
    {
      swipeEnabled: false,
      animationEnabled: true,
      tabBarOptions: {
        showLabel: true,
        showIcon: true,
      },
    }
  )
);
