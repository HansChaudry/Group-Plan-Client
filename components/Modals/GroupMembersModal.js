/* eslint-disable react/prop-types */
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
import React from "react";
import axios from "axios";

export default function GroupMembersModal(props) {
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState("");
  const getMembers = () => {
    axios
      .get(
        `https://groupplan.azurewebsites.net/recipes/group/members/${props.groupID}`
      )
      .then((response) => {
        setMembers(response.data.filter((member) => member.pk != props.owner));
        setOwner(
          response.data.filter((member) => member.pk === props.owner)[0]
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
      console.log(props.owner)
    getMembers();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.close(false);
      }}
    >
      <View style={MembersModalStyles.modalView}>
        <TouchableOpacity
          onPress={() => {
            props.close(false);
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Owner </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginBottom: 15,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {owner?.username}
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Members</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {members.map((member) => {
            return (
              <Text
                key={member.username}
                style={MembersModalStyles.membersText}
              >
                {member.username}
              </Text>
            );
          })}
          {/* Buttons */}
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {/* CLOSE BUTTON */}
            <TouchableOpacity
              onPress={() => {
                props.close(false);
              }}
              style={MembersModalStyles.closeButton}
            >
              <Text style={MembersModalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
