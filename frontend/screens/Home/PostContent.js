import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Button } from "react-native";
import { Title, Text, BottomNavigation } from "react-native-paper";

// renders a full message. We come here when user clicks a message from the list
export function PostContent({ route , navigation }) {
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
  const [offer, setOffer] = useState("");

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
      <View style={styles.container}>
        <Button 
          title="PLACE OFFER"
          onPress={() => navigation.navigate("Place an Offer", {post: post})}
        />
      </View>
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
    alignSelf: "center",
    margin: 4,
  },
  input: {
    alignSelf: "center",
    borderWidth: 1,
    width: "70%",
    height: "5%",
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    flex: 0.0275,
  },
})
