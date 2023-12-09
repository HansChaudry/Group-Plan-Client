/* eslint-disable react/prop-types */
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateGroupModalStyles } from "../../styles";

export default function CreateGroupModal(props) {
  const [groupType, setGroupType] = useState("PUBLIC");
  const [groupName, setGroupName] = useState("");

  const createGroup = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .post(
        `https://groupplan.azurewebsites.net/recipes/group/`,
        { name: groupName, privacy: groupType },
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        } // Assuming you want to send the 'group' data in the request
      )
      .then((response) => {
        props.close(!props.modalVisible);
        props.userGroups();
        setGroupName("");
      })
      .catch((error) => {
        Alert.alert("Group Creation error", error.response.data.message, [
          {
            text: "OK",
            onPress: () => {
              // do something
            },
          },
        ]);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.close(!props.modalVisible);
      }}
    >
      <View style={CreateGroupModalStyles.modalView}>
        <Text style={CreateGroupModalStyles.modalText}>New Group?!</Text>
        <TextInput
          style={CreateGroupModalStyles.groupInput}
          placeholder="Group Title"
          value={groupName}
          onChangeText={(groupNameInput) => {
            setGroupName(groupNameInput);
          }}
          // Add appropriate onChangeText and value props here
        />
        <View style={CreateGroupModalStyles.groupTypeContainer}>
          <TouchableOpacity
            style={[
              CreateGroupModalStyles.groupTypeButton,
              groupType === "PUBLIC" &&
                CreateGroupModalStyles.groupTypeButtonSelected,
            ]}
            onPress={() => setGroupType("PUBLIC")}
          >
            <Text style={CreateGroupModalStyles.groupTypeButtonText}>
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              CreateGroupModalStyles.groupTypeButton,
              groupType === "PRIVATE" &&
                CreateGroupModalStyles.groupTypeButtonSelected,
            ]}
            onPress={() => setGroupType("PRIVATE")}
          >
            <Text style={CreateGroupModalStyles.groupTypeButtonText}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
        <View style={CreateGroupModalStyles.modalButtons}>
          <TouchableOpacity
            onPress={() => {
              props.close(!props.modalVisible);
            }}
          >
            <Text style={CreateGroupModalStyles.modalButtonsText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={createGroup}>
            <Text style={CreateGroupModalStyles.modalButtonsText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
