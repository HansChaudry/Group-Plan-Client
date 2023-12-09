import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import MuiIcon from "react-native-vector-icons/MaterialIcons";
import MuiCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GroupsCollection from "../components/GroupsCollection";
import { GroupsPageStyles } from "../styles";
import CreateGroupModal from "../components/Modals/CreateGroupModal";

// Add other imports as needed

export default function GroupPage() {
  // NAVIGATION
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //CREATE GROUP
  const [modalVisible, setModalVisible] = useState(false);

  //PICKER
  const [selectedValue, setSelectedValue] = useState(0);

  //Groups is an empty array, this will hold data from api & setgroups will fetch data from backend
  const [searchedGroups, setSearchedGroups] = useState([]);

  //empty string that later on holds text enterted by user input
  const [searchText, setSearchText] = useState("");

  const [userGroups, setUserGroups] = useState([]);

  const [recommendedGroups, setRecommendedGroups] = useState([]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const cancelSearch = () => {
    setSearchText("");
    // searchedGroups([]);
    Keyboard.dismiss();
  };

  //------------------FOR DISPLAYING PUBLIC/PRIVATE GROUPS -------------------------------------------------------------------------
  const getGroups = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    if (searchText === "") {
      return;
    }
    axios
      .get(
        `https://groupplan.azurewebsites.net/recipes/searchGroups/${searchText}`,
        {
          withCredentials: true,
          headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
        }
      )
      .then((response) => {
        setSearchedGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getUserGroups = async () => {
    const info = await AsyncStorage.getItem("sessionId");
    axios
      .get(`https://groupplan.azurewebsites.net/recipes/getUserGroups/`, {
        withCredentials: true,
        headers: { Coookie: info.split(";")[0].replace(/"/g, "") },
      })
      .then((response) => {
        setUserGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  const createGroup = async () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      getUserGroups();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={GroupsPageStyles.container}>
      <StatusBar barStyle="default" />
      <View style={GroupsPageStyles.container}>
        <Text style={GroupsPageStyles.title}>Group Plan</Text>
        <View style={GroupsPageStyles.topContainer}>
          <TextInput
            style={GroupsPageStyles.searchInput}
            placeholder="Search public and private groups..."
            onChangeText={handleSearchTextChange}
            value={searchText}
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={getGroups}
          />
          <Pressable onPress={getGroups}>
            <MuiIcon
              name="search"
              size={40}
              color="#FFBA00"
              style={{ backgroundColor: "#fff", borderRadius: 5, padding: 5 }}
            />
          </Pressable>
        </View>
        <View style={GroupsPageStyles.middleContainer}>
          <TouchableOpacity
            style={{
              ...GroupsPageStyles.createBtn,
              backgroundColor: searchText ? "red" : "#FFBA00",
            }}
            onPress={searchText ? cancelSearch : createGroup}
          >
            <Text style={GroupsPageStyles.createBtnText}>
              {searchText ? "Cancel search" : "Create Group"}
            </Text>
          </TouchableOpacity>
          {searchText ? (
            <GroupsCollection
              groups={searchedGroups}
              showbtn={true}
              updateUserGroups={getUserGroups}
            />
          ) : (
            <View style={GroupsPageStyles.pickerContainer}>
              <SelectDropdown
                data={["My Groups", "Recommened Groups"]}
                renderDropdownIcon={() => {
                  return (
                    <MuiCIcon
                      name="chevron-down"
                      size={30}
                      color="#FFBA00"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: 5,
                        padding: 5,
                        position: "absolute",
                      }}
                    />
                  );
                }}
                buttonStyle={{
                  width: "100%",
                  borderWidth: 2,
                  borderColor: "#FFBA00",
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                buttonTextStyle={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                }}
                selectedRowTextStyle={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 18,
                }}
                selectedRowStyle={{}}
                onSelect={(selectedItem, index) => {
                  setSelectedValue(index);
                }}
                defaultValueByIndex={0}
              />
              {selectedValue ? (
                <GroupsCollection
                  groups={recommendedGroups}
                  showbtn={true}
                  updateUserGroups={getUserGroups}
                />
              ) : (
                <GroupsCollection
                  groups={userGroups}
                  showbtn={false}
                  updateUserGroups={getUserGroups}
                />
              )}
            </View>
            //add switch for user groups and recommened groups
          )}
        </View>

        <CreateGroupModal
          modalVisible={modalVisible}
          close={setModalVisible}
          userGroups={getUserGroups}
        />
      </View>
    </SafeAreaView>
  );
}
