/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GroupCardStyles } from "../../styles";

export default function UserGroupCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={GroupCardStyles.UserGroupContainer}
      onPress={() => {
        navigation.navigate("Detailed Group Page", { group: props.group });
      }}
    >
      <View style={GroupCardStyles.UserGroupNameContainer}>
        <Text style={GroupCardStyles.UserGroupName}>
          {props.group.name}
        </Text>
        <Text style={GroupCardStyles.UserGroupCurrentMeal}>
          Current Recipe: {props.group.current_recipe_name}
        </Text>
      </View>
      <View>
        <Image
          source={
            props.group.current_poll
              ? require("../../assets/icons/poll.png")
              : null
          }
          style={{ width: 40, height: 40 }}
        />
      </View>
    </TouchableOpacity>
  );
}
