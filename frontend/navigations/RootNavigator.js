import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { observer } from "mobx-react";
import { AuthStore } from "../stores/auth";
import ScratchpadNavigator from "./ScratchpadNavigator";

/* Set to false to see the actual application, true to see scratchpad */
const useScratchpad = false;

const RootNavigator = observer(function () {
  let loggedIn = AuthStore.loggedIn;
  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});

let nav;
if (useScratchpad) {
  nav = ScratchpadNavigator;
} else {
  nav = RootNavigator;
}

export default nav;
