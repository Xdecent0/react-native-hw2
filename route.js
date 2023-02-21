import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const OtherStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from "./Screens/Login";
import Registration from "./Screens/Registration";
import Home from "./Screens/Home";
import Comments from "./Screens/Comments";
import Map from "./Screens/Map";

export const useRoute = (authorized) => {
  if (!authorized) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <OtherStack.Navigator>
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={Comments}
      />
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={Map}
      />
    </OtherStack.Navigator>
  );
};
