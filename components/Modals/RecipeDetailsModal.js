/* eslint-disable react/prop-types */
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { RecipeDetailsModalStyles } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";

export default function RecipeDetailsModal(props) {
  //CONVERTING INGREDIENTS TO AN ARRAY
  const ingredientsString =
    (props.meal && props.meal.fields && props.meal.fields.ingredients) || "";
  const ingredientsArray = ingredientsString
    .replace("[", "")
    .replace("]", "")
    .split(",");

  //CONVERTING INSTRUCTIONS TO AN ARRAY
  const instructionsString =
    (props.meal && props.meal.fields && props.meal.fields.instructions) || "";
  const instructionsArray = instructionsString
    .replace("[", "")
    .replace("]", "")
    .split(",");

  const saveToLocalMeals = async (meals) => {
    try {
      await AsyncStorage.setItem("localMeals", JSON.stringify(meals));
    } catch (error) {
      console.error("Error saving local meals", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.close(false);
      }}
    >
      <View style={RecipeDetailsModalStyles.modalView}>
        <TouchableOpacity
          onPress={() => {
            props.close(false);
          }}
        >
          {/* NAME */}
          <Text
            style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
          >
            {props.meal?.fields?.name}
          </Text>

          <View>
            {/* INGREDIENTS */}
            <Text style={RecipeDetailsModalStyles.sectionHeader}>
              INGREDIENTS:
            </Text>
            <Text style={RecipeDetailsModalStyles.sectionContent}>
              {ingredientsArray.join(", ")}
            </Text>

            {/* INSTRUCTIONS */}
            <Text style={RecipeDetailsModalStyles.sectionHeader}>
              INSTRUCTIONS:
            </Text>
            <View>
              {instructionsArray.map((instruction, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <Text style={{ marginRight: 5 }}>{index + 1}.</Text>
                  <Text>{instruction}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Buttons */}
          <View style={RecipeDetailsModalStyles.buttonContainer}>
            {/* CLOSE BUTTON */}
            <TouchableOpacity
              onPress={() => {
                props.close(false);
              }}
              style={RecipeDetailsModalStyles.closeButton}
            >
              <Text style={RecipeDetailsModalStyles.buttonText}>Close</Text>
            </TouchableOpacity>

            {/* EXPORT BUTTON */}
            <TouchableOpacity
              onPress={async () => {
                var localMeals = await AsyncStorage.getItem("localMeals");

                if (localMeals) {
                  localMeals = JSON.parse(localMeals);
                } else {
                  localMeals = [];
                }
                saveToLocalMeals([
                  ...localMeals,
                  {
                    mealName: props.meal.fields.name,
                    ingredients: ingredientsArray.map((ingredient) => ({
                      name: ingredient,
                      checked: false,
                    })),
                  },
                ]);
                props.close(false);
              }}
              style={RecipeDetailsModalStyles.exportButton}
            >
              <Text style={RecipeDetailsModalStyles.buttonText}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
