import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { data } from "./sampleData";
import FullMessage from "./MessageContent";
import { useNavigation } from "@react-navigation/native";

// renders each item in the list of messages
function MessageItem({ item, onPress, backgroundColor, textColor }) {
  const { message, sender } = item;

  // credit to user "KooiInc" https://stackoverflow.com/a/1199420
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const maxLength = 75; // max length of preview text
  let truncatedMessage = truncate(message, maxLength);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[textColor]}>From {sender}</Text>
      <Text style={[textColor]}>{truncatedMessage}</Text>
    </TouchableOpacity>
  );
}

// renders the messages screen with a list of messages
export function Messages() {
  const navigator = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#0e7587" : "#e0e0e0";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <MessageItem
        item={item}
        onPress={() => navigator.navigate("Message content", { item: item })}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
