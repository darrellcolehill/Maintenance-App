import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Searchbar, RadioButton, ActivityIndicator } from "react-native-paper";
import * as Api from "../../api";
import PostItem from "./PostItem";

export function Search({ navigation }) {
  const [query, setQuery] = useState("");
  const [queryMode, setQueryMode] = useState("posts");
  const [resultsMode, setResultsMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function getResults() {
    setSubmitted(true);
    setLoading(true);
    let data = null;
    if (queryMode === "posts") {
      data = await Api.searchPosts({ location: query });
    } else if (queryMode === "users") {
      data = { result: true }; // TODO implement user search
    }
    setResultsMode(queryMode);
    setResults(data.result);
    console.log("results", results);
    setLoading(false);
  }

  const renderPostItem = ({ item }) => {
    return (
      <PostItem
        item={item}
        onPress={() => navigation.navigate("Post content", { post: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={text => setQuery(text)}
        value={query}
        onSubmitEditing={() => getResults()}
      />

      <RadioButton.Group onValueChange={value => setQueryMode(value)} value={queryMode}>
        <View style={styles.radioOption}>
          <Text>Search for users</Text>
          <RadioButton value="users" />
        </View>
        <View style={styles.radioOption}>
          <Text>Search for posts by location</Text>
          <RadioButton value="posts" />
        </View>
      </RadioButton.Group>

      <View style={styles.resultsContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : results && results.length > 0 ? (
          (resultsMode === "users") ? (
            <Text>TODO implement user search</Text>
          ) : (
            <FlatList
              data={results}
              renderItem={renderPostItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        ) : (
          submitted ? (
            <Text>No results!</Text>
          ) : (
            <Text>Results will appear here</Text>
          )
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioOption: {
    marginVertical: 5,
    marginHorizontal: 10
  },
  resultsContainer: {
    flex: 1,
    margin: 10,
    padding: 5,
    borderColor: "black",
    borderWidth: 1
  }
})