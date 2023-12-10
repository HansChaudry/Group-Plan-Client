/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { GroupCardStyles } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function GroupCard(props) {
  // NAVIGATION
  const handleJoin = async (x) => {
    const groupId = await x._dispatchInstances.memoizedProps.testID;
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .post(
        `https://groupplan.azurewebsites.net/recipes/group/add`,
        {
          group_id: groupId,
        },
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        } // Assuming you want to send the 'group' data in the request
      )
      .then(() => {
        props.updateUserGroups();
      });
  };
  return (
    <View style={GroupCardStyles.GroupContainer}>
      <View style={GroupCardStyles.GroupNameContainer}>
        <Text style={GroupCardStyles.GroupName}>{props.group.fields.name}</Text>
      </View>

      <TouchableOpacity
        style={GroupCardStyles.GroupBtn}
        onPress={handleJoin}
        testID={`${props.group.pk}`}
      >
        {props.group.fields.privacy === "PUBLIC" ? (
          <Text style={GroupCardStyles.GroupBtnText}>Join</Text>
        ) : (
          <Text style={GroupCardStyles.GroupBtnText}>Request</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
