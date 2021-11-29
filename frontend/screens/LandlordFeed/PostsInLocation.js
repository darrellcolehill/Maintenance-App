import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import PostItem from "../Home/PostItem";
import * as Api from "../../api";

export function PostsInLocation({ navigation, route }) {
  const { location } = route.params;
  const EMPTY = 'empty';
  const [posts, setPosts] = useState(null);
  let [isRefreshing, setIsRefreshing] = useState(false);

  const getPosts = async () => {
    let data = await Api.getLBuildingsPosts(location);
    if (data.result === [])
      setPosts(EMPTY);
    else
      setPosts(data.result)
    setIsRefreshing(false)
  }

  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PostItem
        item={item}
        onPress={() => navigation.navigate("Tenant post", { post: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Posts in {location}</Text>
      {posts === null ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => { setIsRefreshing(true); getPosts(); }}
          refreshing={isRefreshing}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})