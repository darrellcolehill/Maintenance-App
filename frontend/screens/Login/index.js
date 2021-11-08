import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import LoginForm from "./LoginForm";
import { observer } from "mobx-react";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api";

const Login = observer(function ({ navigation }) {
  async function handleLogin(username, password) {
    AuthStore.startLoading();
    let response = await Api.login(username, password);
    let token = response.token;
    AuthStore.stopLoading();

    AuthStore.login(username, token);
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
