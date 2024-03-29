import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AuthStore } from "../../stores/auth";
import * as Api from "../../api";

function Login({ navigation }) {

  const createOneButtonAlert = () =>
    Alert.alert(
      "Invalid Login Attempt",
      "Incorrect Username/Password",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


  async function submitLogin(username, password) {

      AuthStore.startLoading();

      let response = await Api.login(username, password);

		if(response.token)
		{
			let {token, roles} = response;
			// NOTE: roles is looks like [{"rating": x, "role": y}]
			// so each "role" is actually a rating and a role

      let isLandlord = false; 
      let isTenant = false; 
      let isHandyman = false;
      let isHomeowner = false;
    
      for(var i = 0; i < roles.length; i++)
      {
        if(roles[i].role == "LANDLORD")
        {
          isLandlord = true;
        }
        else if(roles[i].role == "TENANT")
        {
          isTenant = true;
        }
        else if(roles[i].role == "HANDYMAN")
        {
          isHandyman = true;
        }
        else
        {
          isHomeowner = true;
        }
      }

      AuthStore.login(username, token, isLandlord, isTenant, isHandyman, isHomeowner);

      AuthStore.stopLoading();

      /*
            AuthStore.login(username, token);

            // checking if the user has a landlord role
            let isLandlord = false;
            roles.forEach(item => {
              if (item.role == "LANDLORD")
                isLandlord = true;
            })

            console.log(`${(isLandlord)?"Is":"Is not"} a landlord`)
            AuthStore.setIsLandlord(isLandlord);
          }
            
          else{
            console.log("Prevented unauthorized login")
            AuthStore.stopLoading();
            createOneButtonAlert();
          }
      */
    }
    else{
      console.log("Prevented unauthorized login")
      AuthStore.stopLoading();
      createOneButtonAlert();
    }
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
          <Text style={styles.textFonts}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity // register account element
          style={styles.registerButton}
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.8}
        >
          <Text style={styles.textFonts}>REGISTER ACCOUNT</Text>
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
    height: 150,
    width: 150,
    top: "10%",
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
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Login;
