/* eslint-disable react/prop-types */
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { RecipeDetailsModalStyles } from "../../styles";
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
              onPress={() => {
                // EXPORT BUTTON LOGIC TO BE ADDED
                console.log("Export button pressed");
              }}
              style={RecipeDetailsModalStyles.exportButton}
            >
              <Text style={RecipeDetailsModalStyles.buttonText}>Export</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
