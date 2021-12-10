import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { getDataModel } from "./DataModel";

export function RecipeDetailScreen({ navigation, route }) {
    const dataModel = getDataModel();
    const { currentUserId } = route.params;
    const { recipeItem } = route.params;
    const userkey = dataModel.getUserForID(currentUserId);
  
    return (
      <View style={styles.container}>
          {/* <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={recipeItem}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.listItem}
                //   onPress={() => navigation.navigate("recipeDetail", {recipeItem: item})}
                >
                  <Image
                    style={styles.listItemimgContainer}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <View style={styles.listItemCont}>
                    <Text style={styles.listItemContTitle}>{item.name}</Text>
                    <View style={styles.listItemConDetail}>
                      <Text style={styles.listItemText}>{item.cooktime}min</Text>
                      <Text style={styles.listItemText}>{item.mealtype} </Text>
                      <Text style={styles.listItemText}>{item.rating}/5</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          /> */}
        <Image
        style={styles.itemImage}
        source={{
            uri: recipeItem.image,
        }}
        />
        <View style={styles.listItemCont}>
            <Text style={styles.listItemContTitle}>{recipeItem.name}</Text>
            <View style={styles.listItemConDetail}>
                <Text style={styles.listItemText}>Cooking Time: {recipeItem.cooktime}min</Text>
                <Text style={styles.listItemText}>Meal Type: {recipeItem.mealtype} </Text>
                <Text style={styles.listItemText}>Rating: {recipeItem.rating}/5</Text>
                <Text style={styles.listItemText}>Nutrition:</Text>
                { recipeItem.nutrition.map((item, key)=>(
                <Text key={key} style={styles.TextStyle}>{ item }</Text>)
                )}
                <Text style={styles.listItemText}>Ingredients:</Text>
                { recipeItem.ingredients.map((item, key)=>(
                <Text key={key} style={styles.TextStyle}>{ item }</Text>)
                )}
            </View>
            <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => navigation.navigate("recipeCheck", {recipeItem: recipeItem})}
                >
                    <Text style={styles.listItemText}>Start Now!</Text>
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
      justifyContent: "center",
    },
    itemImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        resizeMode: "center",
        paddingBottom: 30,
        width: 800,
        height:800,
    },

  });
  

