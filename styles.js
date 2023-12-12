import { StyleSheet } from "react-native";

const fonts = {
  bold: "Poppins_600SemiBold",
  regular: "Poppins_400Regular",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFBA00",
    width: "100%",
    padding: 10,
  },
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  topNavtitle: {
    fontSize: 30,
    color: "black",
    fontFamily: fonts.bold,
  },
  landingPageContainer: {
    backgroundColor: "green",
  },
  recipesMiddleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  recipesList: {
    width: "100%",
  },
  addRecipebtn: {
    backgroundColor: "#88B361", // You can change the color as needed
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 30,
  },
  addRecipeBtnText: {
    color: "white",
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});

export const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export const NavStyles = StyleSheet.create({
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFBA00",
    width: "100%",
    padding: 10,
  },
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  topNavtitle: {
    fontSize: 30,
    color: "black",
    fontFamily: fonts.bold,
    textAlign: "center",
  },
});

export const LandingPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    width: "100%",
  },
  coloredHalf: {
    width: "75%",
    height: "100%",
    backgroundColor: "#88B361",
    position: "absolute",
    top: 0,
    left: "13%",
    zIndex: -1,
  },
  LandingPageBtn: {
    width: "60%", // Adjust the width as needed
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFBA00",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFBA00",
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  LandingPageBtnText: { color: "white", fontSize: 18, fontFamily: fonts.bold },
  image: {
    width: "50%",
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const LoginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBA00",
  },
  LoginPageTitle: {
    fontSize: 40,
    marginBottom: 20,
    color: "white",
    fontFamily: fonts.bold,
    flexDirection: "row",
    width: "100%",
  },
  LoginPageInput: {
    width: 350,
    height: 50,
    borderColor: "black",
    borderWidth: 1.5,
    marginBottom: 20,
    padding: 12,
    borderRadius: 10,
    fontSize: 15.5,
    fontFamily: fonts.regular,
    backgroundColor: "white",
  },
  LoginPageBtn: {
    width: 225,
    padding: 15,
    backgroundColor: "#FFBA00",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    color: "white",
  },
  LoginPageBtnText: { color: "black", fontSize: 25, fontFamily: fonts.bold },
  usernameInput: {
    marginTop: 30,
  },
});

export const RecipesPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  recipesList: {
    alignItems: "center",
  },
  addRecipebtn: {
    backgroundColor: "#FFBA00", // You can change the color as needed
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
    width: "90%",
  },
  addRecipeBtnText: {
    color: "white",
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});

export const CreateRecipesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pageContainer: {
    height: "100%",
  },
  middleContainer: {
    alignItems: "center",
    backgroundColor: "white",
  },
  section: {
    width: "90%",
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#FFBA00",
    borderWidth: 1,
    borderRadius: 10,
    width: "88%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 10,

    paddingBottom: 15,
    overflow: "hidden",
    justifyContent: "center",
  },
  multiLineInput: {
    height: 50,
    textAlign: "left",
    paddingTop: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageUpload: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 0,
    resizeMode: "cover",
  },
  addMoreButton: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#88B361",
    borderRadius: 10,
    backgroundColor: "#88B361",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  removeButton: {
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBA00",
    flex: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export const RecipeDetailsModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: fonts.bold,
    textAlign: "left",
  },
  sectionContent: {
    textAlign: "left",
    fontFamily: fonts.regular,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#888",
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  exportButton: {
    padding: 10,
    backgroundColor: "#88B631",
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.bold,
  },
});

export const SignUpPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBA00",
  },
  SignUpPageTitle: {
    fontSize: 40,
    marginBottom: 20,
    color: "white",
    fontFamily: fonts.bold,
    flexDirection: "row",
    width: "100%",
  },
  SignUpPageInput: {
    width: 350,
    height: 50,
    borderColor: "black",
    borderWidth: 1.5,
    marginBottom: 20,
    padding: 12,
    borderRadius: 10,
    fontSize: 15.5,
    fontFamily: fonts.regular,
    backgroundColor: "white",
  },
  SignUpPageBtn: {
    width: 200,
    padding: 15,
    backgroundColor: "#FFBA00",
    borderRadius: 5,
    alignItems: "center",
  },
  SignUpPageBtnText: { color: "black", fontSize: 25, fontFamily: fonts.bold },
});

export const SettingsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  middleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
});

export const GroupsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 0,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: "black",
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  middleContainer: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  searchInput: {
    width: "92%",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  createBtn: {
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  createBtnText: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  pickerContainer: {
    marginTop: 1,
    width: "100%",
    fontFamily: fonts.regular,
  },
  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  groupName: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export const GroupCardStyles = StyleSheet.create({
  UserGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  UserGroupNameContainer: {
    flex: 1,
    padding: 10,

    backgroundColor: "",
  },
  UserGroupName: {
    fontSize: 20,
    fontFamily: fonts.bold,
    // fontWeight: "bold",
  },
  UserGroupCurrentMeal: {
    fontSize: 15,
    fontFamily: fonts.regular,
    // fontWeight: "bold",
  },

  GroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  GroupNameContainer: {
    flex: 1,
    padding: 10,

    marginLeft: 10,
    marginRight: 10,
  },
  GroupName: {
    fontSize: 20,
    fontFamily: fonts.regular,
    // fontWeight: "bold",
  },
  GroupBtn: {
    width: 125,
    backgroundColor: "#88B361",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 14,
    maxWidth: 1000,
  },
  GroupBtnText: {
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});

export const MembersModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    backgroundColor: "#888",
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: fonts.bold,
  },

  membersText: {
    fontFamily: fonts.regular,
    fontSize: 15,
  },
});

export const CartPageStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 700,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  middleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  checklistContainer: {
    width: "100%",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  ingredientName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  importButton: {
    alignSelf: "center",
    backgroundColor: "#88B361",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 30,
    marginRight: 50,
  },
  importButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  closeModalButton: {
    alignSelf: "center",
    backgroundColor: "#9e4f4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 30,
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: "center",
  },

  modalTitle: {
    fontSize: 23,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    fontFamily: fonts.bold,
  },
  recipeBottomBox: {
    backgroundColor: "lightgrey",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  recipeName: {
    bottom: 5,
    color: "black",
    fontSize: 20,
    fontFamily: fonts.bold,
    width: "100%",
    paddingLeft: 10,
    textAlign: "center",
  },

  mealContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  mealImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc", // Gray color as a placeholder
  },

  clearButton: {
    backgroundColor: "#9e4f4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 30,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  mealList: {
    paddingBottom: 15,
    width: "100%",
  },

  checklistItemContainer: {
    marginBottom: 20,
  },
});

export const DetailedGroupPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  groupContainer: {
    flex: 1,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  currentPoll: {
    alignItems: "center",
    height: 200,
    marginTop: 30,
  },
  startPoll: {
    justifyContent: "center",
    backgroundColor: "#88B361",
    height: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  currentMeal: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#88B361",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    padding: 10,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  mealContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  mealNameContainer: {
    flex: 1,
    padding: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mealImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc", // Gray color as a placeholder
  },
});

export const PollPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pollPageTopContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  pollPageBtn: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#88B361",
    paddingHorizontal: 32,
    paddingVertical: 2,
  },
  pollPageBtnText: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  recipesContainer: {
    paddingHorizontal: "10%",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  pollPageBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
});

export const TabBarStyles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    elevation: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 95,
    width: "100%",
    shadow: {
      shadowColor: "#FFBA00",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  },
  tabBarOptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  tabBarOptionIMG: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});

export const CreateGroupModalStyles = StyleSheet.create({
  //MODAL
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "#FFBA00",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontFamily: fonts.regular,
    marginBottom: 15,
    textAlign: "center",
  },
  groupInput: {
    height: 50,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: fonts.regular,
    backgroundColor: "white",
  },

  groupTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  groupTypeText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: fonts.regular,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },

  modalButtonsText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },

  groupTypeButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  groupTypeButtonSelected: {
    backgroundColor: "white",
  },
  groupTypeButtonText: {
    color: "black",
    fontFamily: fonts.regular,
  },
});

export const RecipeCardStyles = StyleSheet.create({
  recipeContainer: {
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    shadow: {
      shadowColor: "#FFBA00",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  },
  recipeBottomBox: {
    backgroundColor: "black",
    opacity: 0.4,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  recipeName: {
    position: "absolute",
    bottom: 5,
    color: "white",
    fontSize: 20,
    fontFamily: fonts.bold,
    opacity: 1,
    elevation: 20,
    paddingLeft: 10,
  },
});

export const AddPollRecipeModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: fonts.bold,
    textAlign: "left",
  },
  sectionContent: {
    textAlign: "left",
    fontFamily: fonts.regular,
  },
  recipesContainer: {
    width: "100%",
    paddingVertical: 15,
  },
  listItemContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  addButtonContainer: {
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#88B361",
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: 16,
  },
});
