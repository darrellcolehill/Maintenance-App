import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import SignupForm from './SignupForm';

function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <Title>Welcome, new user!</Title>
      <SignupForm />
      <Button mode="contained" onPress={() => navigation.navigate('Login')}>
        Already have an account?
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});

export default Signup;
