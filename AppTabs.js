import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage";
import GroupsPage from "./pages/GroupsPage";
import RecipesPage from "./pages/RecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import DetailedGroupPage from "./pages/DetailedGroupPage";
import CartPage from "./pages/CartPage";
import PollPage from "./pages/PollPage";
import { TabBarStyles } from "./styles";
import { StyleSheet, View, Text, Image } from "react-native";
const Tab = createBottomTabNavigator();

const AppTabs = ({ navigator }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: TabBarStyles.tabBar,
        headerShown: false,
      }}
      initialRouteName="HomePage"
    >
      <Tab.Screen
        name="GroupsPage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={TabBarStyles.tabBarOptionContainer}>
              <Image
                source={require("./assets/icons/users.png")}
                style={{
                  ...TabBarStyles.tabBarOptionIMG,
                  tintColor: focused ? "#FFBA00" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#FFBA00" : "#748c94", fontSize: 12 }}
              >
                Groups
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="RecipesPage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={TabBarStyles.tabBarOptionContainer}>
              <Image
                source={require("./assets/icons/fork_knife.png")}
                style={{
                  ...TabBarStyles.tabBarOptionIMG,
                  tintColor: focused ? "#FFBA00" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#FFBA00" : "#748c94", fontSize: 12 }}
              >
                Recipes
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={TabBarStyles.tabBarOptionContainer}>
              <Image
                source={require("./assets/icons/home.png")}
                style={{
                  ...TabBarStyles.tabBarOptionIMG,
                  tintColor: focused ? "#FFBA00" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#FFBA00" : "#748c94", fontSize: 12 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CartPage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={TabBarStyles.tabBarOptionContainer}>
              <Image
                source={require("./assets/icons/shopping-cart.png")}
                style={{
                  ...TabBarStyles.tabBarOptionIMG,
                  tintColor: focused ? "#FFBA00" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#FFBA00" : "#748c94", fontSize: 12 }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AccountSettingsPage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={TabBarStyles.tabBarOptionContainer}>
              <Image
                source={require("./assets/icons/user.png")}
                style={{
                  ...TabBarStyles.tabBarOptionIMG,
                  tintColor: focused ? "#FFBA00" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#FFBA00" : "#748c94", fontSize: 12 }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
