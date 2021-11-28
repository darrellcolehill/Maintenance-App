import React from "react";
import { View, StyleSheet, Image } from "react-native";
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


export function Profile( {navigation} ) {
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
        {AuthStore.isLandlord &&  /* checks if user is landlord, then renders button! */
          <Button style={styles.logoutButton} onPress={() =>  navigation.navigate("Add a location")}>
            <Text style={styles.logoutText}>ADD A LOCATION</Text>
          </Button>
        }
        <Button style={styles.logoutButton} onPress={() => AuthStore.logout()} mode="contained">
          <Text style={styles.logoutText}>LOGOUT</Text>
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
    margin: 5
  },

  logoutText
  : {
    color: "white",
    fontWeight: "bold",
  }
});