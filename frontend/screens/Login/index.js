import React from "react";
import { View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import LoginForm from "./LoginForm";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { AuthStore } from "../../stores/auth";
import { performLogin } from "../../actions";

const Login = observer(function ({ navigation }) {
  function handleLogin(username, password) {
    performLogin(username, password);
  }

  return (
    <View style={styles.container}>
      <Title>Login</Title>
      {AuthStore.loading && <Text>LOADING...</Text>}
      <LoginForm handler={handleLogin} />
      <Button onPress={() => navigation.navigate("Signup")} mode="contained">
        Need an account?
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});

export default Login;
