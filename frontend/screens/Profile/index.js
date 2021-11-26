import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { List, FAB } from 'react-native-paper';
import * as Api from "../../api";

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
      </Button>
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
