import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import LoadingSpinner from "../screens/LoadingSpinner";
import { observer } from "mobx-react";
import { AuthStore } from "../stores/auth";

const Stack = createNativeStackNavigator();

const AuthNavigator = observer(function () {
  let loading = AuthStore.loading;
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
});

export default AuthNavigator;
