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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function RecipeDetailScreen({ navigation, route }) {
    const dataModel = getDataModel();
    const { currentUserId } = route.params;
    const { recipeKey } = route.params;
    const userkey = dataModel.getUserForID(currentUserId);
    const [recipeItem, setRecipeItem] = useState(["Default"]);

    useEffect(async () => {
        setRecipeItem(await dataModel.getRecipeKey(recipeKey));
      }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.titleButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={26} />
          </TouchableOpacity>
        </View>
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
                <FlatList
                    contentContainerStyle={styles.listContentContainer}
                    data={recipeItem.nutrition}
                    renderItem={({item})=>{
                        return (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>{item}</Text>
                        </View>
                        );
                    }}
                />
                <FlatList
                    contentContainerStyle={styles.listContentContainer}
                    data={recipeItem.ingredients}
                    renderItem={({item})=>{
                        return (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>{item}</Text>
                        </View>
                        );
                    }}
                />
            </View>
            <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => navigation.navigate("recipeCheck", {recipeKey: recipeKey})}
                >
                    <Text style={styles.listItemText}>Start to Prepare!</Text>
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
  

