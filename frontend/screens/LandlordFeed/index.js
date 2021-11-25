import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { AuthStore } from "../../stores/auth";

export function LandlordFeed({ navigation }) {
  let username = AuthStore.username;
  return (
    <View style={styles.container}>
      <Text> Users in your building's posts:</Text>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        Sign out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
