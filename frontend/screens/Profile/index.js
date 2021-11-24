import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { List, FAB } from 'react-native-paper';
import * as Api from "../../api";

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
