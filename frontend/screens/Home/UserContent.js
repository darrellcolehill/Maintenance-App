import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList} from "react-native";
import { Text,} from "react-native-paper";
import StarRating from 'react-native-star-rating';
import * as Api from "../../api";

function Rating ({item, user}) {

  

  return (
      <View style={styles.ratingInfo}>
        <View style={styles.ratingTitleContainer}>
          <Text style={styles.ratingTitle}>{item.role}</Text>
        </View>
          <View style={styles.starContainer}>
            <StarRating style={styles.stars}
              maxStars={5}
              rating={item.rating}
              starSize={25}
              emptyStarColor={'slategray'}
              halfStarColor={'slategray'}
              fullStarColor={'slategray'}
              selectedStar={(rating) => Api.giveUserRatings(user, rating, item.role)}
            ></StarRating>
          </View>
      </View>
  );
  return null;
}

export function UserContent({ route }) {
  const user = route.params.user;

  const [ratings, setRatingsData] = useState([]);

  const getRatings = async () => {
        
    let response = await Api.getUserRatings(user.username);

    setRatingsData(response.ratings);
  }

const renderItem = ({ item }) => {
  return (
    <Rating
      item={item}
      user={user.username}
    />
  );
};

  useEffect(() => {
    getRatings();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} source={{uri: 'https://i.imgur.com/lHeVHrG.png'}}></Image>
          </View>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <FlatList
          data={ratings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
    height: '30%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },

  headerBlock: {
    flex: 1,
    width: "100%",
    backgroundColor: 'slategray',
    alignItems: "center",
    justifyContent: "center",
  },

  usernameContainer: {
    flex: .25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  username: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },

  profilePicContainer: {
    flex: .75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  profilePic: {
    width: 120,
    height: 120,
  },

  ratingContainer: {
    height: '40%',
    width: '95%',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  ratingInfo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
  },

  ratingTitleContainer: {
    height: 20,
    justifyContent: 'center',
  },

  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center',
  },

  starContainer: {
    alignContent: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
    height: 30,
  },

  stars: {
    alignSelf: 'center',
  },
});