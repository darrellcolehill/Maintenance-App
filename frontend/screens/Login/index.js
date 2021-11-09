import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api";

function Login({ navigation }) {
  async function submitLogin(username, password) {
    AuthStore.startLoading();
    let response = await Api.login(username, password);
    let token = response.token;
    AuthStore.stopLoading();

    AuthStore.login(username, token);
  }

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={styles.background} behavior="height">
      <ImageBackground // the background image
        style={styles.background}
        source={require("../../assets/background.jpg")}
      >
        <TouchableOpacity // login element
          style={styles.loginButton}
          onPress={() => submitLogin(username, password)}
          activeOpacity={0.8}
        >
          <Text style={styles.textFonts}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity // register account element
          style={styles.registerButton}
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.8}
        >
          <Text style={styles.textFonts}>Register for a new account!</Text>
        </TouchableOpacity>

        <TextInput // username box element
          style={styles.input}
          onChangeText={text => setUsername(text)}
          placeholder="Username"
        ></TextInput>

        <TextInput // password box element
          style={styles.input}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
        ></TextInput>

        <Image // logo image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        ></Image>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  input: {
    position: "relative",
    top: "40%",
    alignSelf: "center",
    borderWidth: 1,
    width: "70%",
    height: "5%",
    backgroundColor: "white",
    padding: 10,
    margin: 12,
    flex: 0.0275,
  },

  loginButton: {
    width: "80%",
    height: "7%",
    alignSelf: "center",
    backgroundColor: "mediumseagreen",
    position: "absolute",
    bottom: "15%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "40%",
    width: "40%",
    top: "5%",
  },
  registerButton: {
    width: "80%",
    height: "7%",
    alignSelf: "center",
    backgroundColor: "mediumseagreen",
    position: "absolute",
    bottom: "5%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textFonts: {
    fontSize: 25,
  },
});

export default Login;
