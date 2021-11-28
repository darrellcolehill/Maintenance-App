import React from "react";
import { Text } from "react-native-paper";
//import { Item } from "react-native-paper/lib/typescript/components/List/List";

export function UserContent({ route }) {
  const user  = route.params.user;
  //console.log(route.params.user);
  //console.log(user);

  // TODO: use code in profile to show ratings for searched user
  return (
    <Text>Just a placeholder! </Text>
  )
}
