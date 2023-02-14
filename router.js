import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./Screens/Home";
import { Registration } from "./Screens/RegistrationScreen";
import { Login } from "./Screens/LoginScreen";
import Comment from "./Screens/CommentsScreen";
import Map from "./Screens/MapScreen";

const OtherStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
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
        name="Comment"
        component={Comment}
      />
      <OtherStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={Map}
      />
    </OtherStack.Navigator>
  );
};
