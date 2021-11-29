import React from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Title, Text, Button } from "react-native-paper";
import * as Api from "../../api";
import { AuthStore } from "../../stores/auth";

// renders a full message. We come here when user clicks a message from the list
export function PostContentL({ route }) {
  const { post } = route.params;
  if (!post) {
    return (
      <View style={styles.container}>
        <Text>No data. Either the requested post doesn't exist, or it is empty.</Text>
      </View>
    )
  }
  const { id, date, image, author, caption,
    location, PrivacyStatus, ClaimStatus } = post;
  return (
    <View style={styles.container}>
      <Title>Posted by {author} on {date}</Title>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.caption}>{caption}</Text>
        </ScrollView>
      </View>
      <Text>Claim status: {ClaimStatus}</Text>
      <Text>Privacy status: {PrivacyStatus}</Text>
      <Text>Location: {location}</Text>
      {ClaimStatus == 0 ?
        <TouchableOpacity 
          style={styles.claimButton}
          activeOpacity={0.7}
          onPress={ () => Api.changeClaimStatus(id)}
          >
          <Text style={styles.claimText}>Mark As Claimed</Text>
        </TouchableOpacity>
      : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  box: {
    borderColor: "black",
    borderWidth: 1,
    height: "30%",
    padding: 5,
  },
  caption: {
    fontSize: 19
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 5,
  },

  claimButton: {
    width: "80%",
    height: 45,
    alignSelf: "center",
    backgroundColor: "mediumseagreen",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },

  claimText: {
    color: "white",
    fontWeight: "bold",
  },
})
