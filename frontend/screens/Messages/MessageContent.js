import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Text } from "react-native-paper";

// renders a full message. We come here when user clicks a message from the list
export function MessageContent({ route }) {
  const { item } = route.params;
  const { sender, message } = item;
  return (
    <View style={styles.container}>
      <Title>From: {sender}</Title>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
})
