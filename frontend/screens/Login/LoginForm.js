import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

function LoginForm(props) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  return (
    <>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={() => props.handler(username, password)}>
        Log In
      </Button>
    </>
  );
}

export default LoginForm;
