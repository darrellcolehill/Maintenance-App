import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { AuthStore } from "../../stores/auth";

export function Profile() {
  return (
    <View style={styles.container}>
      <Title>Welcome to your profile!</Title>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        <Text style={styles.logout}>LOGOUT</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logout: {
    color: "white",
    fontWeight: "bold",
  }
});
