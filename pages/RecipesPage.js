import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RecipesPageStyles, RecipeCardStyles } from "../styles";
import TopNav from "../components/TopNav";
import RecipeDetailsModal from "../components/Modals/RecipeDetailsModal";

export default function RecipesPage(props) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedMeal, setFocusedMeal] = useState(0);

  const getUserRecipes = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .get(
        `https://groupplan.azurewebsites.net/recipes/getUserRecipes/`,
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  };
  const openMealModal = (index) => {
    //prints the meal that should be shown in the modal
    setFocusedMeal(index);
    setModalVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      getUserRecipes();
    }
  }, [props, isFocused]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="default" />
      <View style={RecipesPageStyles.container}>
        <TopNav />
        <TouchableOpacity
          style={RecipesPageStyles.addRecipebtn}
          onPress={() => {
            navigation.navigate("Create Recipe Page");
          }}
        >
          <Text style={RecipesPageStyles.addRecipeBtnText}>Add Recipe</Text>
        </TouchableOpacity>
        <ScrollView
          // style={RecipesPageStyles.recipesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={RecipesPageStyles.recipesList}
        >
          {recipes.map((recipe, index) => (
            <TouchableOpacity
              style={{
                ...RecipeCardStyles.recipeContainer,
                width: width * 0.9,
              }}
              key={recipe.pk}
              onPress={() => {
                openMealModal(index);
              }}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png",
                }}
                style={{
                  height: 175,

                  borderRadius: 10,
                  backgroundColor: "lightblue",
                }}
              />
              <View style={RecipeCardStyles.recipeBottomBox}></View>
              <Text style={RecipeCardStyles.recipeName}>
                {recipe.fields.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <RecipeDetailsModal
          show={modalVisible}
          close={setModalVisible}
          meal={recipes[focusedMeal]}
        />
      </View>
    </SafeAreaView>
  );
}
