import React from "react";
import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet } from "react-native";
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
});
