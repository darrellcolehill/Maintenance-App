import React from 'react';
import { Button, TextInput } from 'react-native-paper';

function SignupForm() {
  return (
    <>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Button mode="contained" icon="plus-circle">
        Sign up
      </Button>
    </>
  );
}

export default SignupForm;
