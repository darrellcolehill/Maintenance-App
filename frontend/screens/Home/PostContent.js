import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
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
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.caption}>{caption}</Text>
        </ScrollView>
      </View>
      <Text>Claim status: {ClaimStatus}</Text>
      <Text>Privacy status: {PrivacyStatus}</Text>
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
    height: "30%",
    padding: 5,
  },
  caption: {
    fontSize: 19
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center"
  }
})
