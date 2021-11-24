import React from "react";
import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

      <View style={styles.container}>
        <TouchableOpacity style={styles.postButton}>
          <Image>source={require("../../assets/createPostImg.png")}</Image>
        </TouchableOpacity>
      </View>

      <Text>Welcome, {username}!</Text>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        Sign out
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
  }
});
