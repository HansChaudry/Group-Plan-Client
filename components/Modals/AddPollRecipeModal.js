/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { AddPollRecipeModalStyles } from "../../styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function AddPollRecipeModal(props) {
  const [recipeNames, setRecipeNames] = useState([
    "Recipe 1",
    "Recipe Uno",
    "Recipe One",
  ]);
  const [selected, setSelected] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const addRecipe = async () => {
    if (selected === null) {
      props.close(false);
      return;
    }
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .put(
        `https://groupplan.azurewebsites.net/recipes/addRecipe/${props.groupID}`,
        // eslint-disable-next-line no-undef
        (data = {
          recipe_id: userRecipes[selected].id,
        }),
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        props.close(false);
      })
      .catch((error) => console.log(error));
  };
  const getRecipes = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .get(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/recipes/getUserRecipes/`,
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        const formatedRecipes = [];
        response.data.map((recipe) => {
          formatedRecipes.push({ name: [recipe.fields.name], id: recipe.pk });
        });
        setUserRecipes(formatedRecipes);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      style={{ opacity: 0.5 }}
      onRequestClose={() => {
        props.close(false);
      }}
    >
      <View style={AddPollRecipeModalStyles.modalView}>
        <Text style={AddPollRecipeModalStyles.sectionHeader}>
          Choose one of your Recipes
        </Text>
        <ScrollView
          contentContainerStyle={AddPollRecipeModalStyles.recipesContainer}
        >
          {userRecipes.map((recipe, index) => {
            return (
              <View
                style={AddPollRecipeModalStyles.listItemContainer}
                key={recipe.id}
              >
                <BouncyCheckbox
                  size={25}
                  fillColor="#FFBA00"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "red", borderRadius: 5 }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={selected == index ? true : false}
                  disableBuiltInState
                  onPress={() =>
                    selected === index ? setSelected(null) : setSelected(index)
                  }
                />
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}
                >
                  {recipe.name[0]}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={AddPollRecipeModalStyles.addButtonContainer}>
          <TouchableOpacity
            style={{
              ...AddPollRecipeModalStyles.addButton,
              backgroundColor: selected != null ? "#88B361" : "red",
            }}
            onPress={selected != null ? addRecipe : () => props.close(false)}
          >
            <Text style={AddPollRecipeModalStyles.addButtonText}>
              {selected != null ? "Add Recipe" : "Close"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
