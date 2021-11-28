import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { TextInput, Button, RadioButton } from "react-native-paper";
import * as Api from "../../api";
import { AuthStore } from "../../stores/auth";
import * as ImagePicker from "expo-image-picker"

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
  const [image, setImage] = useState(null);

  async function handleSubmit() {
    let dateString = getDateString();

    await Api.makePost({
      PrivacyStatus: PrivacyStatus,
      ClaimStatus: 0,
      date: dateString,
      image: image,
      author: AuthStore.username,
      caption: caption,
      location: location
    });
    navigation.goBack();
  }


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage("data:image/png;base64," + result.base64);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
      <Button
        icon="camera"
        mode="contained"
        onPress={pickImage}>
        <Text style={styles.text} >CHOOSE AN IMAGE</Text>
      </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
        <Text style={styles.text} >SUBMIT</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  radioOption: {
    marginVertical: 5,
    marginHorizontal: 10
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
})
