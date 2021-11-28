import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, TextInput, Title } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import PostItem from "../Home/PostItem";
import * as Api from "../../api"

export function LandlordFeed({ navigation }) {
  let username = AuthStore.username;
  let [posts, setPosts] = useState([])
  let [isRefreshing, setIsRefreshing] = useState(false)
  let [location, setLocation] = useState("");

  const getPosts = async () => {
    let data = await Api.getLFeed();
    if (data.message === "NEED_LOCATION") {
      setPosts(data.message);
    } else {
      setPosts(data.result)
    }
    setIsRefreshing(false)
  }

  const submitLocation = async () => {
    await Api.setOwnLocation({ location: location });
    await getPosts();
  }

  const renderItem = ({ item }) => {
    return (
      <PostItem
        item={item}
        onPress={() => navigation.navigate("Tenant post", { post: item })}
      />
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Title>Posts from users in your building:</Title>
      {posts === "NEED_LOCATION" ? (
        <>
          <Text>Please enter your location.</Text>
          <TextInput placeholder="Location" onChangeText={text => setLocation(text)} />
          <Button mode="contained" icon="floppy" onPress={() => submitLocation()}>
            <Text style={styles.logout}>SAVE</Text>
          </Button>
        </>
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
