import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { data } from "./sampleData";
import { List, FAB } from 'react-native-paper';

// renders each item in the list of messages
function MessageItem({ item, onPress }) {
  const { message, sender } = item;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <List.Item
        title={`From: ${sender}`}
        description={message}
        left={props => <List.Icon {...props} icon="message" />}
      />
    </TouchableOpacity>
  );
}

// renders the messages screen with a list of messages
export function Messages({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <MessageItem
        item={item}
        onPress={() => navigation.navigate("Message content", { item: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB 
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("New message")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 32,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
