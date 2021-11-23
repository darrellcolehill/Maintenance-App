import React from "react";
import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api"

export function Home({ navigation }) {
  let username = AuthStore.username;
  let [searchBar, setSearchBar] = useState("");
  
  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme="True"
        placeholder="Search..."
        onChangeText={text => setSearchBar(text)}
        value={searchBar}
      />

      <Text>Welcome, {username}!</Text>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        Sign out
      </Button>
      <Text style={{ fontSize: 22 }}>
        Note: delete below later. Grant is making the home screen
      </Text>
      <Button onPress={() => navigation.navigate("New post")} mode="contained">
        Create a post
      </Button>
      <Button onPress={() => getLastPost()} mode="contained">
        Fetch your last post
      </Button>
      <Button onPress={() => navigation.navigate("Post content", { post: post })} mode="contained">
        View your last post
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
