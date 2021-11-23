import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Title, Text } from "react-native-paper";

// renders a full message. We come here when user clicks a message from the list
export function PostContent({ route }) {
  const { post } = route.params;
  if (!post) {
    return (
      <View style={styles.container}>
        <Text>No data. Either the requested post doesn't exist, or it is empty.</Text>
      </View>
    )
  }
  const { date, image, author, caption,
    location, PrivacyStatus, ClaimStatus } = post;
  return (
    <View style={styles.container}>
      <Title>Posted by {author} on {date}</Title>
      <View style={styles.box}>
        <Text style={styles.caption}>{caption}</Text>
      </View>
      <Text>Claim status: {ClaimStatus === 1 ? "Claimed" : "Unclaimed"}</Text>
      <Text>Privacy status: {PrivacyStatus === 1 ? "Private" : "Public"}</Text>
      <Text>Location: {location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 2
  },
  box: {
    borderColor: "black",
    borderWidth: 1,
    height: "50%",
    padding: 5,
  },
  caption: {
    fontSize: 19
  }
})
