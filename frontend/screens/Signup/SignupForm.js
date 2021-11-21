import React from "react";
import { useState } from "react";
import { Button, TextInput, Checkbox} from "react-native-paper";


function SignupForm() {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  return (
    <>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Checkbox.Item label="Item" status="checked" onPress = {() => console.log()} />
      <Button mode="contained" icon="plus-circle">
        Sign up
      </Button>
    </>
  );
}

export default SignupForm;
