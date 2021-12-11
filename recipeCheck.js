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
  const { recipeKey } = route.params;
  const [ingredients, setIngredients] = useState(["Default"]);

  useEffect(async () => {
    setIngredients(await dataModel.setCheckStatus(recipeKey));
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Ingredients
          </Text>
        </View>
        <View style={styles.titleButton}>
          
        </View>
      </View>

      <View style={styles.listContainer}>
      <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item})=>{
           // console.log(item.checkStatus)
          
            return (
            <View style={styles.listItem}>
              <CheckBox
                checked={item.CheckStatus}
                onPress={() => dataModel.setCheck(item.ingre)}
              />
              <Text style={styles.listItemText}>{item.ingre}</Text>
            </View>
            );}
            
          }
        />
        
      </View>
      <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("recipeCook", {recipeKey: recipeKey})}
        >
            <Text style={styles.listItemText}>Start to Cook!</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
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
    flex: 0.5,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
  },
  listContentContainer: {
    justifyContent: "flex-start",
  },
  listItem: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  listItemText: {
    flex: 0.5,
    fontSize: 18,
  },
  PrioItemText: {
    flex: 0.2,
  },
  listItemButtons: {
    flex: 0.3,
    flexDirection: "row",
  },
  menuContainer: {
    backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
