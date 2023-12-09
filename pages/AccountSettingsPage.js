import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import TopNav from "../components/TopNav";
import { SettingsPageStyles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AccountSettingsPage() {
  const navigation = useNavigation();

  const removeUserData = async () => {
    await AsyncStorage.removeItem("sessionId");
    await AsyncStorage.removeItem("userId");
  };

  const handleLogout = async () => {
    try {
      const info = await AsyncStorage.getItem("sessionId");

      const response = await axios.post(
        `https://groupplan.azurewebsites.net/users/logout/`,
        {},
        {
          withCredentials: true,
          headers: { Cookie: info.split(";")[0].replace(/"/g, "") },
        }
      );

      removeUserData();

      if (response.data) {
        navigation.navigate("LoginPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={SettingsPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={SettingsPageStyles.container}>
        <TopNav />
        <View style={SettingsPageStyles.middleContainer}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Account Settings
          </Text>

          <TouchableOpacity
            style={{
              width: 200,
              padding: 15,
              backgroundColor: "red",
              borderRadius: 5,
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={handleLogout}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
