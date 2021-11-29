import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import * as Api from "../../api";
import { AuthStore } from "../../stores/auth";



export function PlaceOffer({ route , navigation }) {
    const { post } = route.params;
    const [offer, setOffer] = useState("");

    async function submitOffer(offer, author, buildingLocation ) {

      AuthStore.startLoading();

      let response = await Api.makeOffer(offer, author, buildingLocation);
  
      AuthStore.stopLoading();
      if(response == "Invalid"){
        createOneButtonAlertInvalid();
      }
      else{ createOneButtonAlertSuccess();
      }
  }

    const createOneButtonAlertSuccess = () =>
    Alert.alert(
      "Offer successfully placed",
      "We have notified all involved parties.",
      [
        { text: "OK", onPress: () => navigation.navigate("Homepage") }
      ]
    );

    const createOneButtonAlertInvalid = () =>
    Alert.alert(
      "Invalid entry",
      "Please check entry field and try again.",
      [
        { text: "OK" }
      ]
    );

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
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity 
            style={styles.button} 
            title="SUBMIT" 
            onPress={() => submitOffer(offer, author, location )}
            activeOpacity={0.7}
            >
              <Text style={styles.text}>SUBMIT</Text>
            </TouchableOpacity>
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
        backgroundColor: "white",
        margin: 12,
        padding: 5,
        textAlignVertical: "top",
      },

      button: {
        width: "80%",
        height: 40,
        alignSelf: "center",
        backgroundColor: "mediumseagreen",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },

      text: {
        color: "white",
        fontWeight: "bold"
      }
    
})