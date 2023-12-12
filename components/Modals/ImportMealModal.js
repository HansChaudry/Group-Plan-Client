import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MembersModalStyles } from "../../styles";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ImportMealModal(props) {
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedMeal, setFocusedMeal] = useState(0);

  const getUserRecipes = async () => {
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
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  };

  const openMealModal = (index) => {
    //prints the meal that should be shown in the modal
    console.log(recipes[index]);
    setFocusedMeal(index);
    setModalVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      getUserRecipes();
    }
  }, [props, isFocused]);

  return <text>testing</text>;
}
