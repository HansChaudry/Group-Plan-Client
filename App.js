import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DetailedGroupPage from "./pages/DetailedGroupPage";
import PollPage from "./pages/PollPage";
import AppTabs from "./AppTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Stack = createStackNavigator();
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const OnBoard = (props) => {
  // const [authorized, setAuthorized] = useState(false);

  // const isAuthorized = async () => {
  //   try {
  //     const user = await AsyncStorage.getItem("sessionId");

  //     if (user) {
  //       const response = await axios.post(
  //         `https://groupplan.azurewebsites.net/users/user/authorized`,
  //         {
  //           withCredentials: true,
  //           headers: { Cookie: user.split(";")[0].replace(/"/g, "") },
  //         }
  //       );
  //       if (response.data) {
  //         setAuthorized(true);
  //       }
  //     } else {
  //       setAuthorized(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   setAuthorized(false);
  //   isAuthorized();
  // }, [props]);

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
            headerTitle: route.params.group.name,
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
        <Stack.Screen
          name="Poll Page"
          component={PollPage}
          options={({ route }) => ({
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
