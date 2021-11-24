import React from "react";
import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { Text, Button } from "react-native-paper";
import { AuthStore } from "../../stores/auth";

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

      <View style={styles.container} /* Code for createPost button*/ >
        <TouchableOpacity 
        style={styles.postButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigation("CreatePost")}>
          <Image source={require("../../assets/createPostImg.png")}
                 style={styles.postImage}>
          </Image>
          <Text style={styles.screenText}>Create a post</Text>
        </TouchableOpacity>
      </View>

      <Text> Welcome, {username}!</Text>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        <Text style={styles.logout}>Sign out</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  postButton: {
    backgroundColor: 'slategray',
    borderRadius: 8,
    width: "95%",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: "30%",
    margin: 10,
  },

  postImage: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    height: "25%",
    width: "75%"
  },

  screenText: {
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    margin: 3,
  },

  logout: {
    color: "white",
    fontWeight: "bold",
  }
});
