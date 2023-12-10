import { Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NavStyles } from "../styles";

export default function TopNav() {
  const navigation = useNavigation();
  // Group Button -> Group Page
  const handleGroupPress = () => {
    navigation.navigate("GroupsPage");
  };

  // Settings Button -> Settings Page
  const handleSettingPress = () => {
    navigation.navigate("AccountSettingsPage");
  };
  return (
    <View style={NavStyles.topNavContainer}>
      <Text style={NavStyles.topNavtitle}>Group Plan</Text>
    </View>
  );
}
