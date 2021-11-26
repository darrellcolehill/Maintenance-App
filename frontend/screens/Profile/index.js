<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { List, FAB } from 'react-native-paper';
import * as Api from "../../api";

=======
import React from "react";
import { View, StyleSheet, Image } from "react-native";
>>>>>>> Stashed changes
import { Button, Text, Title } from "react-native-paper";
import { AuthStore } from "../../stores/auth";

// renders each item in the list of messages
function RatingItem({ item}) {

  return (
    <TouchableOpacity>

     <List.Item
         title={`${item.role}`}
         description= {`${item.rating}`}
       />

    </TouchableOpacity>
  );
}


export function Profile() {
<<<<<<< Updated upstream

  const [ratingData, setRatingData] = useState([]);

  const getRatings = async () => {

    let response = await Api.getCurrentUserRatings();

    setRatingData(response.ratings);

    console.log(ratingData);
  }


  const renderItem = ({ item }) => {
    return (
      <RatingItem
        item={item}
      />
    );
  };


  useEffect(() => {
    getRatings();
}, []);


  return (
    <View style={styles.container}>

      <Text>Your ratings</Text>
      <FlatList
        data={ratingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Title>Welcome to your profile!</Title>
      <Button onPress={() => AuthStore.logout()} mode="contained">
        <Text style={styles.logout}>LOGOUT</Text>
=======
  let username = AuthStore.username;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: 'https://i.imgur.com/lHeVHrG.png'}}></Image>
          </View>
        </View>
      </View>
      <View style={styles.logoutContainer}>
      <Button style={styles.logoutButton} onPress={() => AuthStore.logoutText
        ()} mode="contained">
        <Text style={styles.logoutText}>LOGOUT</Text>
>>>>>>> Stashed changes
      </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  headerBlock: {
    height: "75%",
    width: "100%",
    backgroundColor: 'slategray',
    alignItems: "center",
    justifyContent: "flex-start",
  },

  usernameContainer: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  username: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },

  imageContainer: {
    height: "75%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 150 ,
    height: 150,
  },

  logoutContainer: {
    justifyContent: "flex-end",
    paddingTop: 5,
    paddingBottom: 5,
  },

  logoutButton: {
    backgroundColor: 'slategray',
  },

  logoutText
  : {
    color: "white",
    fontWeight: "bold",
  }
});
