import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

import { CheckBox } from "react-native-elements";
import { getDataModel } from "./DataModel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function RecipeCheckScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { recipeKey,currentUserId } = route.params;
  const [ingredients, setIngredients] = useState(["Default"]);
  const [change,setchange]=useState(false)

  useEffect(async () => {
    await dataModel.setCheckStatus(recipeKey)
    setIngredients(dataModel.getingredientlist());
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleitem}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ingredients</Text>
        </View>
        <View style={styles.titleButton}></View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.nutritionCont}
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          extraData={change}
          renderItem={({ item }) => {
            return (
              <View style={styles.nutritionitem}>
                <CheckBox
                  containerStyle={{ padding: 0 }}
                  checked={item.checkStatus}
                  onPress={() => {
                    dataModel.setCheck(item.ingre);
                    setchange(!change)
                  }}
                />
                <Text style={{ fontSize: 17 }}>{item.ingre}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.editbutton}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() =>
            navigation.navigate("recipeCook", { recipeKey: recipeKey, currentUserId:currentUserId})
          }
        >
          <Text style={styles.listItemText}>Start to Cook!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  titleButton: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleitem: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingContainer: {
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listContainer: {
    flex: 0.8,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
  },
  nutritionCont: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  nutrirow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nutritionitem: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  editbutton: {
    flex: 0.05,
    width: "100%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonstyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});
