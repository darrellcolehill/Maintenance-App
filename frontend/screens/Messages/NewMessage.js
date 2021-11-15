import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

// the screen for composing a new message
export function NewMessage() {
  const [recipient, setRecipient] = useState("")
  const [content, setContent] = useState("")

  // For test case ID 26 from Test Plan in Deliverable 2
  const charLimit = 200

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
        onPress={() => console.log(`Submitted! recipient=<${recipient}>, content=<${content}>`)}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
})
