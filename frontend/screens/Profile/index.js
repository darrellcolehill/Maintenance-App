import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image,} from "react-native";
import { Button, Text,} from "react-native-paper";
import StarRating from 'react-native-star-rating';
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api";

//replace with data from database
const ROLES = ['Tenant', 'Landlord', 'Handyman', 'Homeowner'];
const SCORES = [2.5, 4.8, 3.2, 1.6];
const IS_TENANT = true, IS_LANDLORD = true, IS_HANDYMAN = true, IS_HOMEOWNER = true;

var roleCount;

// Renders a rating component
const Rating = () => {
  roleCount++;
  var roleTitle = ROLES[roleCount];

  return (
      <View style={styles.ratingInfo}>
        <View style={styles.ratingTitleContainer}>
          <Text style={styles.ratingTitle}>{roleTitle}</Text>
        </View>
          <View style={styles.starContainer}>
            <StarRating style={styles.stars}
              maxStars={5}
              rating={SCORES[roleCount]}
              starSize={25}
              emptyStarColor={'slategray'}
              halfStarColor={'slategray'}
              fullStarColor={'slategray'}
            ></StarRating>
          </View>
      </View>
  );
}

// Component for not rendering rating but keeping count
const MissingRating = () => {
  roleCount++;

  return null;
}

export function Profile({ navigation }) {
  let username = AuthStore.username;
  roleCount = -1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} source={{uri: 'https://i.imgur.com/lHeVHrG.png'}}></Image>
          </View>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        {IS_TENANT ? <Rating></Rating> : <MissingRating></MissingRating>}
        {IS_LANDLORD ? <Rating></Rating> : <MissingRating></MissingRating>}
        {IS_HANDYMAN ? <Rating></Rating> : <MissingRating></MissingRating>}
        {IS_HOMEOWNER ? <Rating></Rating> : <MissingRating></MissingRating>}
      </View>
      {IS_LANDLORD ?
      <View style={styles.addressButtonContainer}>
        <Button style={styles.addressButton}>
          <Text style={styles.addressButtonText}>View Addresses</Text>
        </Button>
      </View>
      : null}
      <View style={styles.logoutContainer}>
<<<<<<< Updated upstream
      <Button style={styles.logoutButton} onPress={() => AuthStore.logout()} mode="contained">
        <Text style={styles.logoutText}>LOGOUT</Text>
      </Button>
=======
        <Button style={styles.logoutButton} onPress={() => AuthStore.logout()} mode="contained">
          <Text style={styles.logoutText}>LOGOUT</Text>
        </Button>
>>>>>>> Stashed changes
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

  addressButtonContainer: {
    height: '15%',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  addressButton: {
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor: 'slategray',
  },

  addressButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  logoutContainer: {
    height: '15%',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
  },

  logoutButton: {
    backgroundColor: 'slategray',
    alignSelf: 'center',
  },

  logoutText
  : {
    color: "white",
    fontWeight: "bold",
  }
});