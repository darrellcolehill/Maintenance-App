import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import PostItem from "../Home/PostItem";
import * as Api from "../../api"

export function LandlordFeed({ navigation }) {
  let username = AuthStore.username;
  let [posts, setPosts] = useState([])
  let [isRefreshing, setIsRefreshing] = useState(false)

  const renderItem = ({ item }) => {
    return (
      <PostItem
        item={item}
        onPress={() => navigation.navigate("Tenant post", { post: item })}
      />
    );
  };

  const getPosts = async () => {
    let data = await Api.getLFeed();
    setPosts(data.result)
    setIsRefreshing(false)
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Users in your building's posts:</Text>
      <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => { setIsRefreshing(true); getPosts(); }}
          refreshing={isRefreshing}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
