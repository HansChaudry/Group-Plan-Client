/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import MuiCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { CreateRecipesStyles } from "../styles";

export default function CreateRecipePage() {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [mealImage, setMealImage] = useState(null);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addStep = () => setSteps([...steps, ""]);

  const handleCreate = async () => {
    if (mealName && ingredients.length > 0 && steps.length > 0) {
      const info = await AsyncStorage.getItem("sessionId");
      const mealIngredients = "[" + ingredients.toString() + "]";
      const mealInstructions = "[" + steps.toString() + "]";
      const data = new FormData();
      data.append("recipe_name", mealName);
      data.append("recipe_ingredients", mealIngredients);
      data.append("recipe_instructions", mealInstructions);
      if (mealImage) {
        data.append("imageFile", {
          uri: mealImage,
          type: "image/jpg",
          name: "recipeImg",
        });
      }

      axios
        .post(
          `https://groupplan.azurewebsites.net/recipes/createRecipe/`,
          data,
          {
            withCredentials: true,
            headers: {
              Coookie: info.split(";")[0].replace(/"/g, ""),
              "Content-Type": "multipart/form-data",
            },
          } // Assuming you want to send the 'group' data in the request
        )
        .then((response) => {
          navigation.navigate("RecipesPage");
        })
        .catch((error) => {
          Alert.alert("Recipe Creation error", error.response.data.message, [
            {
              text: "OK",
              onPress: () => {
                // do something
              },
            },
          ]);
        });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const onCreatePressed = () => {
    console.log("Meal created");
    navigation.navigate("Meal");
  };

  const uploadImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [310, 175],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setMealImage(pickerResult.assets[0].uri);
    }
  };

  const onIngredientChange = (text, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = text;
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const onStepChange = (text, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = text;
    setSteps(updatedSteps);
  };

  const removeStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  return (
    <SafeAreaView style={CreateRecipesStyles.container}>
      <StatusBar barStyle="default" />
      <View style={CreateRecipesStyles.pageContainer}>
        {/* MIDDLE */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={CreateRecipesStyles.middleContainer}
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ ...CreateRecipesStyles.section, marginBottom: 5 }}>
            <Text style={CreateRecipesStyles.sectionLabel}>Name</Text>
            <TextInput
              style={{
                ...CreateRecipesStyles.input,
                width: "100%",
                borderColor: "black",
              }}
              placeholder="Title of meal"
              value={mealName}
              onChangeText={(text) => setMealName(text)}
            />
          </View>
          <View style={CreateRecipesStyles.section}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={CreateRecipesStyles.sectionLabel}>Image</Text>
              {mealImage ? (
                <TouchableOpacity onPress={uploadImage}>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    Change Image
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>

            <TouchableOpacity onPress={uploadImage}>
              {mealImage ? (
                <View>
                  <Image
                    source={{ uri: mealImage }}
                    style={CreateRecipesStyles.imagePreview}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                    onPress={() => setMealImage(null)}
                  >
                    <MuiCIcon name="trash-can-outline" size={35} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={CreateRecipesStyles.imageUpload}>
                  <Image
                    source={require("../assets/icons/upload.png")}
                    style={{ width: 30, height: 30, tintColor: "#FFBA00" }}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      color: "#FFBA00",
                    }}
                  >
                    Upload Image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={CreateRecipesStyles.section}>
            <Text style={CreateRecipesStyles.sectionTitle}>Ingredients</Text>
            {ingredients.map((ingredient, index) => (
              <View style={CreateRecipesStyles.inputContainer} key={index}>
                <TextInput
                  key={index}
                  style={[
                    CreateRecipesStyles.input,
                    CreateRecipesStyles.multiLineInput,
                  ]}
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChangeText={(text) => onIngredientChange(text, index)}
                />
                <TouchableOpacity
                  style={CreateRecipesStyles.removeButton}
                  onPress={() => {
                    removeIngredient(index);
                  }}
                >
                  <MuiCIcon name="trash-can-outline" size={35} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={addIngredient}
              style={CreateRecipesStyles.addMoreButton}
            >
              <MuiCIcon name="plus" size={35} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={CreateRecipesStyles.section}>
            <Text style={CreateRecipesStyles.sectionTitle}>Steps</Text>
            {steps.map((step, index) => (
              <View style={CreateRecipesStyles.inputContainer} key={index}>
                <TextInput
                  key={index}
                  style={[
                    CreateRecipesStyles.input,
                    CreateRecipesStyles.multiLineInput,
                  ]}
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChangeText={(text) => onStepChange(text, index)}
                  multiline={true}
                />
                <TouchableOpacity
                  style={CreateRecipesStyles.removeButton}
                  onPress={() => {
                    removeStep(index);
                  }}
                >
                  <MuiCIcon name="trash-can-outline" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={addStep}
              style={CreateRecipesStyles.addMoreButton}
            >
              <MuiCIcon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 0,

              backgroundColor: "#FFBA00",
              width: "90%",
              padding: 15,
              marginBottom: 10,
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={handleCreate}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
