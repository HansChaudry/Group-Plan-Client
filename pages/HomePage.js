import {
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HomePageStyles, RecipeCardStyles } from "../styles";
import axios from "axios";
import TopNav from "../components/TopNav";
import Carousel from "react-native-snap-carousel";

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);

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

    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=American&c=Breakfast"
      )
      .then((response) => {
        const meals = response.data.meals;

        setBreakfast(meals);
      })
      .catch((error) => console.log(error));

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

        {/* MIDDLE */}
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
            paddingLeft: "6%",
          }}
        >
          Recommended
        </Text>
        <Carousel
          data={meals}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...RecipeCardStyles.recipeContainer,
                width: "100%",
              }}
              onPress={() => console.log("clicked")}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ height: 175, borderRadius: 10 }}
              />
              <View style={RecipeCardStyles.recipeBottomBox}></View>
              <Text style={RecipeCardStyles.recipeName}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get("window").width * 0.9}
          itemWidth={Dimensions.get("window").width * 0.8}
        />
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
            paddingLeft: "6%",
          }}
        >
          Breakfast
        </Text>
        <Carousel
          data={breakfast}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...RecipeCardStyles.recipeContainer,
                width: "100%",
              }}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ height: 175, borderRadius: 10 }}
              />
              <View style={RecipeCardStyles.recipeBottomBox}></View>
              <Text style={RecipeCardStyles.recipeName}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get("window").width * 0.9}
          itemWidth={Dimensions.get("window").width * 0.8}
        />
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
            paddingLeft: "6%",
          }}
        >
          Dinner
        </Text>
        <Carousel
          data={dinner}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...RecipeCardStyles.recipeContainer,
                width: "100%",
              }}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ height: 175, borderRadius: 10 }}
              />
              <View style={RecipeCardStyles.recipeBottomBox}></View>
              <Text style={RecipeCardStyles.recipeName}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get("window").width * 0.9}
          itemWidth={Dimensions.get("window").width * 0.8}
        />

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
