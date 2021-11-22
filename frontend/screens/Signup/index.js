import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Title, TextInput, Checkbox } from "react-native-paper";
import SignupForm from "./SignupForm";
import * as Api from "../../api";


function Signup({ navigation }) {

    const [isTenant, setTenant] = useState(false);
    const [isLandlord, setLandlord] = useState(false);
    const [isHandyman, setHandyman] = useState(false);
    const [isHomeowner, setHomeowner] = useState(false);

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    const [hasError, sethasError] = useState(true);


    async function submitSignup(username, password, email, isTenant, isLandlord, isHandyman, isHomeowner) {

        let response = await Api.signup(username, password, email, isTenant, isLandlord, isHandyman, isHomeowner);

        if(response.message == "Successfully signed up!") navigation.navigate("Login");
        else navigation.navigate("Signup");
    }



  return (

    <View style={styles.container}>

      <Title>Welcome, new user!</Title>

            <TextInput placeholder="Username" onChangeText={text => setUsername(text)} />
            <TextInput placeholder="Password" onChangeText={text => setPassword(text)} />
            <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />

            <Text>Please check which role(s) you would like to have access to</Text>
            <Checkbox.Item label="Tenant" status={isTenant ? 'checked' : 'unchecked'} onPress={() => { setTenant(!isTenant);}} />
            <Checkbox.Item label="Landlord" status={isLandlord ? 'checked' : 'unchecked'} onPress={() => { setLandlord(!isLandlord);}} />
            <Checkbox.Item label="Handyman" status={isHandyman ? 'checked' : 'unchecked'} onPress={() => { setHandyman(!isHandyman);}} />
            <Checkbox.Item label="Homeowner" status={isHomeowner ? 'checked' : 'unchecked'} onPress={() => { setHomeowner(!isHomeowner);}} />

            <Button mode="contained" icon="plus-circle" onPress={() => submitSignup(username, password, email, isTenant, isLandlord, isHandyman, isHomeowner)}>
              Sign up
            </Button>

      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Already have an account?
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});

export default Signup;
