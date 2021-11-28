import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api";

export function AddLocation( {navigation }) {
    let [location, setLocation] = useState("");

    const createOneButtonAlertInvalid = () =>
    Alert.alert(
      "Field cannot be empty",
      "Please enter a valid location.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const createOneButtonAlertSuccess = () =>
    Alert.alert(
      "Location successfully added",
      "You are now a registered owner of a new location!",
      [
        { text: "OK", onPress: () => navigation.navigate("User Profile") }
      ]
    );

    const submitLocation = async () => {
        if(location == null || location == ""){
            createOneButtonAlertInvalid();
        }
        else{
        await Api.setOwnLocation({ location: location }); /* need to change to addLocation */
        createOneButtonAlertSuccess();
        }
      }
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Please enter your location:</Text>
            <TextInput style={styles.inputStyle} placeholder="Location" onChangeText={text => setLocation(text)} />
            <Button mode="contained" icon="floppy" onPress={() => submitLocation()}>
                <Text style={styles.logout}>SAVE</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20
    },
    logout: {
        fontWeight: "bold",
        color: "white"
    },
    inputStyle: {
        margin: 6
    }
})