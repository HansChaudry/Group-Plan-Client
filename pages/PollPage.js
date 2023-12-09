/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { PollPageStyles } from "../styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AddPollRecipeModal from "../components/Modals/AddPollRecipeModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function PollPage({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getPollRecipes();
    }
  }, [isFocused, modalVisible]);

  const showModal = () => {
    setmodalVisible(true);
  };

  const getPollRecipes = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .get(
        `https://groupplan.azurewebsites.net/recipes/getPoll/recipes/${route.params.groupID}`,
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

  const addUserVote = async () => {
    const info = await AsyncStorage.getItem("sessionId");

    axios
      .put(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/recipes/addVote/${route.params.groupID}/`,
        {
          recipe_id: recipes[selected].recipe,
        },
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        } // Assuming you want to send the 'group' data in the request
      )
      .then((response) => {
        console.log(response.data);
        navigation.goBack();
      });
  };

  return (
    <SafeAreaView style={PollPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={PollPageStyles.container}>
        <View style={PollPageStyles.pollPageTopContainer}>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              marginBottom: 10,
              marginTop: 10,
              fontSize: 20,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Recipes
          </Text>
          <TouchableOpacity
            style={PollPageStyles.pollPageBtn}
            onPress={showModal}
          >
            <Text style={PollPageStyles.pollPageBtnText}>Add Recipe</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={PollPageStyles.recipesContainer}>
          {recipes.map((recipe, index) => {
            return (
              <View
                key={recipe.recipeName}
                style={PollPageStyles.listItemContainer}
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
                <Text style={{ fontFamily: "Poppins_400Regular" }}>
                  {recipe.recipeName}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={PollPageStyles.pollPageBottomContainer}>
          <TouchableOpacity
            style={{ ...PollPageStyles.pollPageBtn, width: "90%" }}
            onPress={() => {
              if (selected == null) {
                Alert.alert("Voting Error", "You must choose one recipe", [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]);
              } else {
                addUserVote();
              }
            }}
          >
            <Text style={PollPageStyles.pollPageBtnText}>Vote</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddPollRecipeModal
        visible={modalVisible}
        close={setmodalVisible}
        groupID={route.params.groupID}
      />
    </SafeAreaView>
  );
}
