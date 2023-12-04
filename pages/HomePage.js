import {
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HomePageStyles } from "../styles";
import axios from "axios";
import TopNav from "../components/TopNav";
import Carousel, { Pagination } from "react-native-snap-carousel";

import HomeRecipeCard from "../components/Cards/HomeRecipeCard";

const HomePage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=American&c=Pasta"
      )
      .then((response) => {
        const meals = response.data.meals;

        setMeals(meals);
      })
      .catch((error) => console.log(error));
    console.log;
  }, []);

  return (
    <SafeAreaView style={HomePageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={HomePageStyles.container}>
        {/* TOP */}
        <TopNav />

        {/* MIDDLE */}
        {/* <Carousel
          data={["hello", "Hola", "Hi"]}
          renderItem={(element) => (
            <View>
              <Text>{element}</Text>
            </View>
          )}
          sliderWidth={Dimensions.get("window").width * 0.9}
          itemWidth={Dimensions.get("window").width * 0.8}
        /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {meals.map((element) => {
            return (
              <HomeRecipeCard
                name={element.strMeal}
                id={element.idMeal}
                key={element.idMeal}
                image={element.strMealThumb}
                meal={element}
              />
            );
          })}
        </ScrollView>

        {/* BOTTOM */}
        {/* <BottomNav /> */}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
