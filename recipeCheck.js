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

import { CheckBox } from 'react-native-elements';
import { getDataModel } from "./DataModel";

export function RecipeCheckScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { recipeItem } = route.params;
  const ingredientsList = setCheckStatus(recipeItem);

  useEffect(()=>{
    setCheckStatus()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
      <Text style={styles.listItemText}>Ingredients:</Text>
      <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={ingredientsList}
          renderItem={({item})=>{
            console.log(item.checkStatus)
            return (
            <View style={styles.listItem}>
              <CheckBox
                checked={item.checkStatus}
                onPress={() => changeCheckStatus(item, ingredientsList)}
              />
              <Text style={styles.listItemText}>{item.ingre}</Text>
            </View>
            );}
          }
        />
      </View>
    </View>
  );
}

function setCheckStatus(recipeItem) {
  var ingredientsList = [];
  for (const ingredient of recipeItem.ingredients) {
    var ingredientsStatus = {};
    ingredientsStatus["ingre"] = ingredient
    ingredientsStatus["checkStatus"] = false
    ingredientsList.push(ingredientsStatus)
  };
  return ingredientsList
};

function changeCheckStatus(item, ingredientsList) {
  for (const ingredient of ingredientsList) {
    if (ingredient == item) {
      ingredient['checkStatus'] = !item['checkStatus']
      console.log(ingredient['checkStatus'])
    }
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  // },
  // settingContainer: {
  //   paddingTop: 10,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },
  // listContainer: {
  //   flex: 0.5,
  //   paddingBottom: 30,
  //   paddingLeft: 30,
  //   paddingRight: 30,
  //   width: "100%",
  // },
  // listContentContainer: {
  //   justifyContent: "flex-start",
  // },
  // listItem: {
  //   flex: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   padding: 5,
  // },
  // listItemText: {
  //   flex: 0.5,
  //   fontSize: 18,
  // },
  // PrioItemText: {
  //   flex: 0.2,
  // },
  // listItemButtons: {
  //   flex: 0.3,
  //   flexDirection: "row",
  // },
  // menuContainer: {
  //   backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  // },
});
