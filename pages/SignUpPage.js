import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignUpPageStyles } from "../styles";
import axios from "axios";

export default function SignUpPage() {
  const navigation = useNavigation();
  const [btnColor, setBtnColor] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUpPress = () => {
    const requiredFields = [
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    ];

    if (requiredFields.some((field) => field === "")) {
      setInvalidInputs(true);
      return;
    }

    setBtnColor(true);
    axios
      .post(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/users/register/`,
        // eslint-disable-next-line no-undef
        (data = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          username: username,
          password1: password,
          password2: confirmPassword,
        })
      )
      .then((response) => {
        if (response.data[0] === undefined) {
          const messages = {};

          for (const key in response.data) {
            messages[key] = response.data[key]
              .map((element) => element.message)
              .join("");
          }

          const errorString = Object.entries(messages)
            .map(
              ([key, value]) =>
                `\n${key.charAt(0).toUpperCase() + key.slice(1)}:\n${value}\n`
            )
            .join("");

          setBtnColor(false);
          setInvalidInputs(true);

          Alert.alert("Sign Up Error", errorString, [
            {
              text: "OK",
              onPress: () => {
                // do something
              },
            },
          ]);
        } else {
          setBtnColor(false);
          setInvalidInputs(false);
          setFirstName("");
          setLastName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          navigation.navigate("LoginPage");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={SignUpPageStyles.container}
    >
      <View style={SignUpPageStyles.container}>
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <Text
            style={{
              ...SignUpPageStyles.SignUpPageTitle,
            }}
          >
            Become a
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 25,
            marginRight: 15,
          }}
        >
          <Text
            style={{
              ...SignUpPageStyles.SignUpPageTitle,
              textAlign: "right",
            }}
          >
            Group Planner !!!
          </Text>
        </View>

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={{
            ...SignUpPageStyles.SignUpPageInput,
            borderWidth: invalidInputs ? 3 : 1.5,
            borderColor: invalidInputs ? "red" : "black",
          }}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity
          style={{
            ...SignUpPageStyles.SignUpPageBtn,
            backgroundColor: btnColor ? "#88B361" : "#FFBA00",
          }}
          disabled={btnColor ? true : false}
          onPress={() => {
            // handleSignUpPress();
          }}
        >
          <Text style={SignUpPageStyles.SignUpPageBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => {
            // Navigate back to the landing page
            navigation.goBack();
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Back to Landing Page
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
