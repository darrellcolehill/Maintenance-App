import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { Title, Text, BottomNavigation } from "react-native-paper";
import { AuthStore } from "../../stores/auth";

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
      {AuthStore.isHandyman &&
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => navigation.navigate("Place an Offer", {post: post})}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>PLACE OFFER</Text>
        </TouchableOpacity>
      </View>
      }
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
    height: 40,
    width: "80%",
    backgroundColor: "mediumseagreen",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
})
