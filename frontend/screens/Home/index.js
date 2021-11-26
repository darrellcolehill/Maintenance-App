import React, {useEffect} from "react";
import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { Text, Button, List } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api"

function PostItem({ item, onPress }) {
  const { caption, location } = item;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>

      <List.Item
        title={location}
        description={caption}
        left={props => <List.Icon {...props} icon="folder" />}
      />

    </TouchableOpacity>
  );
}

export function Home({ navigation }) {
  let username = AuthStore.username;
  let [searchBar, setSearchBar] = useState("");
  let [posts, setPosts] = useState([])
  let [isRefreshing, setIsRefreshing] = useState(false)

  const renderItem = ({ item }) => {
    return (
      <PostItem
        item={item}
        onPress={() => navigation.navigate("Post content", { post: item })}
      />
    );
  };

  const getPosts = async () => {
    let data = await Api.getFeed();
    setPosts(data.result)
	setIsRefreshing(false)
  }

  useEffect(() => {
    getPosts();
}, []);

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
          onPress={() => navigation.navigate("Create a Post")}>
          <Image source={require("../../assets/createPostImg.png")}
            style={styles.postImage}>
          </Image>
          <Text style={styles.screenText}>Create a post</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> Active posts:</Text>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
		  onRefresh={() => {setIsRefreshing(true); getPosts();}}
	  	  refreshing={isRefreshing}
        />
      </View>
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

  separator: {
    fontSize: 16,
    margin: 3,
  },

  logout: {
    color: "white",
    fontWeight: "bold",
  }
});
