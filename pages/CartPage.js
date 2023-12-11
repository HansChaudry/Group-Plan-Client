import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TopNav from "../components/TopNav";
import axios from "axios";
import { CartPageStyles } from "../styles";

export default function CartPage(props) {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [chosenMealIngredients, setChosenMealIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getUserRecipes();
    loadLocalMeals();
  }, []);

  const getUserRecipes = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .get(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/recipes/getUserRecipes/`,
        {
          withCredentials: true,
          headers: { Cookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxToggle = (mealIndex, ingredientIndex) => {
    const updatedMeals = [...chosenMealIngredients];
    updatedMeals[mealIndex].ingredients[ingredientIndex].checked = !updatedMeals[mealIndex].ingredients[ingredientIndex].checked;
    setChosenMealIngredients(updatedMeals);
    saveLocalMeals(updatedMeals);
  };

  const handleImportMeal = () => {
    setModalVisible(true);
  };

  const convertStringToArray = (ingredientsString) => {
    return ingredientsString.replace("[", "").replace("]", "").split(",");
  };

  const handleRecipeSelection = (recipe) => {
    const ingredientsArray = convertStringToArray(recipe.fields.ingredients);

    setChosenMealIngredients((prevMeals) => [
      ...prevMeals,
      {
        mealName: recipe.fields.name,
        ingredients: ingredientsArray.map((ingredient) => ({
          name: ingredient,
          checked: false,
        })),
      },
    ]);

    setIngredients([]);
    setModalVisible(false);
    saveLocalMeals([...chosenMealIngredients, { mealName: recipe.fields.name, ingredients: ingredientsArray.map((ingredient) => ({ name: ingredient, checked: false })) }]);
  };

  const handleClearIngredients = () => {
    Alert.alert(
      "Clear ALL Meals and Ingredients",
      null,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setChosenMealIngredients([]);
            clearLocalMeals();
          },
        },
      ]
    );
  };

  const saveLocalMeals = async (meals) => {
    try {
      await AsyncStorage.setItem("localMeals", JSON.stringify(meals));
    } catch (error) {
      console.error("Error saving local meals", error);
    }
  };

  const loadLocalMeals = async () => {
    try {
      const localMeals = await AsyncStorage.getItem("localMeals");
      if (localMeals) {
        setChosenMealIngredients(JSON.parse(localMeals));
      }
    } catch (error) {
      console.error("Error loading local meals", error);
    }
  };

  const clearLocalMeals = async () => {
    try {
      await AsyncStorage.removeItem("localMeals");
    } catch (error) {
      console.error("Error clearing local meals", error);
    }
  };

  return (
    <SafeAreaView style={CartPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={CartPageStyles.container}>
        <TopNav />

        <View style={CartPageStyles.middleContainer}>
          <View style={{ flexDirection: 'row' }}>

            {/* IMPORT BUTTON */}
            <TouchableOpacity
              style={CartPageStyles.importButton}
              onPress={handleImportMeal}
            >
              <Text style={CartPageStyles.importButtonText}>
                {chosenMealIngredients.length > 0 ? "Add Meal" : "Import Meal"}
              </Text>
            </TouchableOpacity>

            {/* CLEAR BUTTON */}
            <TouchableOpacity
              style={CartPageStyles.clearButton}
              onPress={handleClearIngredients}
            >
              <Text style={CartPageStyles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          {/* MODAL */}
          <Modal
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={CartPageStyles.modalContainer}>
              <Text style={CartPageStyles.modalTitle}>Import Ingredients</Text>
              <ScrollView style={CartPageStyles.mealList}>
                {recipes.map((recipe) => (
                  <TouchableOpacity
                    style={CartPageStyles.mealContainer}
                    key={recipe.pk}
                    onPress={() => handleRecipeSelection(recipe)}
                  >
                    <View style={CartPageStyles.mealNameContainer}>
                      <Text style={CartPageStyles.mealName}>
                        {recipe.fields.name}
                      </Text>
                    </View>
                    <View style={CartPageStyles.mealImagePlaceholder}></View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={CartPageStyles.importButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={CartPageStyles.importButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          
          {/* CHECKLIST */}
          <ScrollView style={CartPageStyles.checklistContainer}>
            {chosenMealIngredients.map((meal, mealIndex) => (
              <View key={mealIndex} style={CartPageStyles.checklistItemContainer}>
                <Text style={{ alignSelf: "flex-start", fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
                  {meal.mealName}
                </Text>

                {meal.ingredients && meal.ingredients.map((ingredient, ingredientIndex) => (
                  <View style={CartPageStyles.checklistItem} key={ingredientIndex}>
                    <BouncyCheckbox
                      size={25}
                      fillColor="#FFBA00"
                      unfillColor="#FFFFFF"
                      iconStyle={{ borderColor: "red", borderRadius: 5 }}
                      innerIconStyle={{ borderWidth: 2 }}
                      isChecked={ingredient.checked}
                      onPress={() => handleCheckboxToggle(mealIndex, ingredientIndex)}
                    />
                    <Text style={CartPageStyles.ingredientName}>{ingredient.name}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

