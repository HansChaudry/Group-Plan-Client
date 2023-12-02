import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DetailedGroupPage from "./pages/DetailedGroupPage";
import AppTabs from "./AppTabs";
import { Image } from "react-native";
const Stack = createStackNavigator();
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const OnBoard = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Recipe Page"
          component={CreateRecipePage}
          options={{
            headerStyle: {
              backgroundColor: "#FFBA00",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackTitle: "Back",
            headerBackTitleStyle: {
              color: "black",
              fontWeight: "bold",
            },
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="Detailed Group Page"
          component={DetailedGroupPage}
          options={({ route }) => ({
            headerTitle: route.params.group.fields.name,
            headerStyle: {
              backgroundColor: "#FFBA00",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackTitle: "Back",
            headerBackTitleStyle: {
              color: "black",
              fontWeight: "bold",
            },
            headerTintColor: "black",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return <OnBoard />;
}
