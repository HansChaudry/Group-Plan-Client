import { ScrollView, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { HomePageStyles } from "../styles";
import axios from "axios";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import HomeMealCard from "../components/Cards/HomeMealCard";

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
        <ScrollView showsVerticalScrollIndicator={false}>
          {meals.map((element) => {
            return (
              <HomeMealCard
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
