/* eslint-disable no-undef */
import React from "react";
import { LandingPageStyles } from "../styles";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <View style={LandingPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={LandingPageStyles.coloredHalf} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: "40%" }}>
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              height: "10%",
            }}
          >
            <Image
              source={require("../assets/images/landingIMG1.png")}
              style={{ ...LandingPageStyles.image }}
            />
          </View>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              height: "58%",
            }}
          >
            <Image
              source={require("../assets/images/landingIMG2.png")}
              style={{ ...LandingPageStyles.image }}
            />
          </View>
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
              height: "30%",
            }}
          >
            <Image
              source={require("../assets/images/landingIMG3.png")}
              style={{ ...LandingPageStyles.image }}
            />
          </View>
        </View>
        <View style={LandingPageStyles.bottomView}>
          <Text
            style={{
              fontSize: 60,
              color: "white",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Group
          </Text>
          <Text
            style={{
              fontSize: 60,
              color: "white",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Plan
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Poppins_400Regular",
            }}
          >
            A Meal Planning Community
          </Text>

          <TouchableOpacity
            style={LandingPageStyles.LandingPageBtn}
            onPress={() => {}}
          >
            <Text
              style={{
                ...LandingPageStyles.LandingPageBtnText,
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...LandingPageStyles.LandingPageBtn,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                ...LandingPageStyles.LandingPageBtnText,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
