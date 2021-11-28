import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, TextInput, Title, List } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api"

// note: we use interchangeably the words 'building', 'location', and 'property'
export function LandlordFeed({ navigation }) {
  let username = AuthStore.username;
  let [items, setItems] = useState([]) // array of objects {id: xxx, location: xxx}
  let [isRefreshing, setIsRefreshing] = useState(false)

  const getBuildings = async () => {
    let data = await Api.getLBuildings();
    let result = data.result;
    setItems(result);
    setIsRefreshing(false)
  }

  useEffect(() => {
    getBuildings();
  }, []);

  const renderItem = ({ item }) => {
    const { location } = item;
    return (
      <TouchableOpacity
      onPress={() => navigation.navigate("Posts in location", { location: location })}
      >
        <List.Item
          title={location}
          left={props => <List.Icon {...props} icon="home" />}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Your properties</Title>
      <Text>Tap on a property to see all posts related to it!</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => { setIsRefreshing(true); getBuildings(); }}
        refreshing={isRefreshing}
      />
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
