import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HomePageStyles, RecipeCardStyles } from "../styles";
import axios from "axios";
import TopNav from "../components/TopNav";

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  // const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [selectedTab, setSelectedTab] = useState("recommened");

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=American&c=Lamb"
      )
      .then((response) => {
        const meals = response.data.meals;

        setMeals(meals);
      })
      .catch((error) => console.log(error));

    // axios
    //   .get(
    //     "https://www.themealdb.com/api/json/v1/1/filter.php?a=American&c=Breakfast"
    //   )
    //   .then((response) => {
    //     const meals = response.data.meals;

    //     setBreakfast(meals);
    //   })
    //   .catch((error) => console.log(error));

    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=American&c=Miscellaneous"
      )
      .then((response) => {
        const meals = response.data.meals;

        setDinner(meals);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={HomePageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={HomePageStyles.container}>
        {/* TOP */}
        <TopNav />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedTab === "recommened" ? 2 : 0,
              borderBottomColor: "#FFBA00",
              width: "50%",
            }}
            onPress={() => setSelectedTab("recommened")}
          >
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              Recommened
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedTab != "recommened" ? 2 : 0,
              borderBottomColor: "#FFBA00",
              width: "50%",
            }}
            onPress={() => setSelectedTab("dinner")}
          >
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              Dinner
            </Text>
          </TouchableOpacity>
        </View>

        {/* MIDDLE */}
        {selectedTab === "recommened" ? (
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
            {meals.map((item) => {
              return (
                <TouchableOpacity
                  style={{
                    ...RecipeCardStyles.recipeContainer,
                    width: "100%",
                  }}
                  onPress={() => console.log("clicked")}
                  key={item.strMeal}
                >
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ height: 175, borderRadius: 10 }}
                  />
                  <View style={RecipeCardStyles.recipeBottomBox}></View>
                  <Text style={RecipeCardStyles.recipeName}>
                    {item.strMeal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
            {dinner.map((item) => {
              return (
                <TouchableOpacity
                  style={{
                    ...RecipeCardStyles.recipeContainer,
                    width: "100%",
                  }}
                  onPress={() => console.log("clicked")}
                  key={item.strMeal}
                >
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ height: 175, borderRadius: 10 }}
                  />
                  <View style={RecipeCardStyles.recipeBottomBox}></View>
                  <Text style={RecipeCardStyles.recipeName}>
                    {item.strMeal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View
          style={{
            height: 65,

            backgroundColor: "transparent",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
