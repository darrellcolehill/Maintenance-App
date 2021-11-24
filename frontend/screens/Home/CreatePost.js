import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Text } from "react-native-paper";
import { TextInput, Button, RadioButton } from "react-native-paper";
import * as Api from "../../api";
import { AuthStore } from "../../stores/auth";

// TODO add image picker.

function getDateString() {
    // collecting the pieces of the date...
    let date = new Date();
    let day = date.getDate();
    let monthIndex = date.getMonth();
    const months = "January February March April May June July August September October November December"
    let monthName = months.split(" ")[monthIndex];
    let fullYear = date.getFullYear();
    
    // ... and then putting them together
    let dateString = `${monthName} ${day}, ${fullYear}`;
    return dateString;  
}

export function CreatePost({ navigation }) {
  const charLimit = 200; // we might not need this
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [PrivacyStatus, setPrivacyStatus] = useState("public");

  async function handleSubmit() {
    let dateString = getDateString();

    await Api.makePost({
      PrivacyStatus: PrivacyStatus,
      ClaimStatus: 0,
      date: dateString,
      image: null, // TODO change after adding image picker
      author: AuthStore.username,
      caption: caption,
      location: location
    });
    navigation.goBack();
  }

  // need: image
  return (
    <View style={styles.container}>
      <TextInput
        label="Location"
        onChangeText={text => setLocation(text)}
      />
      <TextInput
        label="Caption"
        multiline
        onChangeText={text => setCaption(text)}
        maxLength={charLimit}
        right={<TextInput.Affix text={`${caption.length}/${charLimit}`} />}
      />
      <RadioButton.Group onValueChange={value => setPrivacyStatus(value)} value={PrivacyStatus}>
        <View style={styles.radioOption}>
          <Text>Public</Text>
          <RadioButton value="public" />
        </View>
        <View style={styles.radioOption}>
          <Text>Private</Text>
          <RadioButton value="private" />
        </View>
      </RadioButton.Group>
      <Button
        icon="send"
        mode="contained"
        onPress={() => handleSubmit()}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  radioOption: {
    marginVertical: 5,
    marginHorizontal: 10
  }
})
