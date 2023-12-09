/* eslint-disable react/prop-types */
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";

import GroupCard from "./Cards/GroupCard";
import UserGroupCard from "./Cards/UserGroupCard";

export default function GroupsCollection(props) {
  const height = useWindowDimensions().height - 400;
  return (
    <View style={{ height: height }}>
      <ScrollView style={styles.topContainer}>
        {props.groups.map((group) => {
          if (props.showbtn) {
            return (
              <GroupCard
                key={group.id}
                group={group}
                updateUserGroups={props.updateUserGroups}
              />
            );
          } else {
            return <UserGroupCard group={group} key={group.id} />;
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
  join_button: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#88B361",
    marginLeft: "auto",
    width: "auto",
    height: 30,
  },
});

// navigation.navigate("DetailedGroupPage", { group: group });
