/* eslint-disable react/prop-types */
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupMembersModal from "../components/Modals/GroupMembersModal";
import RecipeDetailsModal from "../components/Modals/RecipeDetailsModal";
import { DetailedGroupPageStyles, RecipeCardStyles } from "../styles";
import { Bar } from "react-native-progress";
import MuiCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CountdownTimer from "../components/CountDownTimer";

import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function DetailedGroupPage({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();
  const [group, setGroup] = useState(route.params.group);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [mealModalVisible, setMealModalVisible] = useState(false);
  const [memberModalsVisible, setMemberModalsVisible] = useState(false);
  const [pollSummary, setPollSummary] = useState({
    user_count: 0,
    summary: {},
  });
  const [pollPreview, setPollPreview] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getcurrentRecipe();
      _pollPreview();
    }
  }, [group, isFocused]);

  const getcurrentRecipe = () => {
    if (!group.current_recipe) {
      return;
    }
    axios
      .get(
        `https://groupplan.azurewebsites.net/recipes/getRecipe/${group.current_recipe}`
      )
      .then((response) => {
        setCurrentRecipe(response.data[0].fields);
      })
      .catch((error) => console.log(error));
  };

  const startPoll = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .put(
        `https://groupplan.azurewebsites.net/recipes/startPoll/${route.params.group.pk}/`,
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        setGroup((prev) => {
          return { ...prev, current_poll: true };
        });
      })
      .catch((error) => console.log(error));
  };

  const generatePollPreview = (container) => {
    const preview = [];
    const x = Object.entries(container.summary);
    x.sort((a, b) => b[1].votes - a[1].votes);

    for (var element in Object.fromEntries(x)) {
      preview.push(
        <Bar
          progress={container.summary[element].votes / container.user_count}
          width={Dimensions.get("window").width * 0.9}
          height={35}
          animated={true}
          style={{ marginBottom: 15 }}
          color="#88B361"
          // #88B361#FFBA00
          key={element}
        >
          <Text
            style={{
              position: "absolute",
              color: "black",
              fontSize: 15,
              textAlign: "center",
              padding: 8,
            }}
          >
            {element.includes("N/A") ? "N/A" : element}
          </Text>
        </Bar>
      );
    }
    return preview.slice(0, 3);
  };
  const _pollPreview = async () => {
    const info = await AsyncStorage.getItem("sessionId");

    axios
      .get(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/recipes/getPoll/summary/${route.params.group.id}`,
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        setPollSummary(response.data);
        setPollPreview(generatePollPreview(response.data));
      })
      .catch((error) => console.log(error));
  };

  const handleLeaveGroup = async (groupId) => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .put(
        `http://${
          Platform.OS === "ios" ? "localhost" : "10.0.2.2"
        }:8000/recipes/group/removeUser`,
        {
          group_id: groupId,
        },
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        } // Assuming you want to send the 'group' data in the request
      )
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <SafeAreaView style={DetailedGroupPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={DetailedGroupPageStyles.container}>
        <View style={DetailedGroupPageStyles.topContainer}>
          <TouchableOpacity
            style={DetailedGroupPageStyles.button}
            onPress={() => {
              setMemberModalsVisible(true);
            }}
          >
            <Text style={DetailedGroupPageStyles.buttonText}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...DetailedGroupPageStyles.button,
              backgroundColor: "red",
            }}
            onPress={() => {
              handleLeaveGroup(route.params.group.id);
            }}
          >
            <Text style={DetailedGroupPageStyles.buttonText}>Leave Group</Text>
          </TouchableOpacity>
        </View>

        <View style={DetailedGroupPageStyles.groupContainer}>
          <View style={DetailedGroupPageStyles.currentMeal}>
            <View style={{ width: "93%", marginBottom: 5 }}>
              <Text style={DetailedGroupPageStyles.sectionTitle}>
                Current Meal
              </Text>
            </View>

            <TouchableOpacity
              style={{
                ...RecipeCardStyles.recipeContainer,
                width: width * 0.9,
              }}
              key={currentRecipe?.pk}
            >
              <Image
                source={{
                  uri: currentRecipe.recipe_image
                    ? currentRecipe.recipe_image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png",
                }}
                style={{
                  height: 175,
                  borderRadius: 10,
                }}
              />
              <View style={RecipeCardStyles.recipeBottomBox}></View>
              <Text style={RecipeCardStyles.recipeName}>
                {currentRecipe.name ? currentRecipe.name : "N/A"}
              </Text>
            </TouchableOpacity>
          </View>

          {group.current_poll ? (
            <TouchableOpacity
              style={DetailedGroupPageStyles.currentPoll}
              onPress={() => {
                navigation.navigate("Poll Page", {
                  pollSummary: pollSummary?.summary,
                  groupID: route.params.group.id,
                });
              }}
            >
              <View
                style={{
                  width: "90%",
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={DetailedGroupPageStyles.sectionTitle}>
                  Current Poll{": "}
                  <CountdownTimer pollDateTime={group.current_poll_time} />
                </Text>
                <Text
                  style={{
                    ...DetailedGroupPageStyles.sectionTitle,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  View
                  <MuiCIcon name="arrow-right" size={20} color="#88B361" />
                </Text>
              </View>

              <View>
                {pollPreview.map((preview) => {
                  return preview;
                })}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={DetailedGroupPageStyles.startPoll}
              onPress={() => {
                startPoll();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Start Poll
              </Text>
              <View></View>
            </TouchableOpacity>
          )}
        </View>

        <RecipeDetailsModal
          show={mealModalVisible}
          close={setMealModalVisible}
          meal={currentRecipe}
        />
        <GroupMembersModal
          show={memberModalsVisible}
          close={setMemberModalsVisible}
          owner={group.owner}
          groupID={route.params.group.id}
        />
      </View>
    </SafeAreaView>
  );
}
