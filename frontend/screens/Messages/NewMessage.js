import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Api from "../../api";
import { AuthStore } from "../../stores/auth";

// the screen for composing a new message
export function NewMessage({ navigation }) {
  const [recipient, setRecipient] = useState("")
  const [content, setContent] = useState("")

  // For test case ID 26 from Test Plan in Deliverable 2
  const charLimit = 200


  async function sendMessage(recipient, content) {

      AuthStore.startLoading();

      let response = await Api.sendMessage(recipient, content);

      //TODO: ADD NAVIGATION OR ALERT THAT MESSAGE IS SEND
        //if(response.message == "Successful") navigation.navigate("Messages");
        //else navigation.navigate("Signup");

      AuthStore.stopLoading();

	  navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <TextInput
        label="Recipient"
        value={recipient}
        onChangeText={text => setRecipient(text)}
      />
      <TextInput
        label="Message content"
        multiline
        onChangeText={text => setContent(text)}
        maxLength={charLimit}
        right={<TextInput.Affix text={`${content.length}/${charLimit}`} />}
      />
      <Button
        icon="send"
        mode="contained"
        onPress={() => sendMessage(recipient, content)}>
        <Text style={styles.logout}>SUBMIT</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  logout: {
    color: "white",
    fontWeight: "bold",
  }
})
