import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Button, TextInput } from "react-native";
import { Title, Text, BottomNavigation } from "react-native-paper";
import * as Api from "../../api";

async function submitOffer(offer, author, buildingLocation ) {

    AuthStore.startLoading();

    let response = await Api.makeOffer(offer, author, buildingLocation);
}

export function PlaceOffer({ route , navigation }) {
    const { post } = route.params;
    const [offer, setOffer] = useState("");
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
            <TextInput
                style={styles.input}
                onChangeText={text => setOffer(text)}
                placeholder="Place Offer"
            />
            <Button onPress={() => submitOffer(offer, author, location )}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      margin: 10,
      flex: 2
    },
    input: {
        alignSelf: "center",
        borderWidth: 1,
        width: "98%",
        height: 40,
        backgroundColor: "white",
        margin: 12,
        padding: 5
      },
    
})