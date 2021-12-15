import React, { cloneElement, useEffect, useState } from "react";
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
  const { recipeKey, currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  const [recipeItem, setRecipeItem] = useState(["Default"]);
  const [fav, setfav] = useState(dataModel.initfavlist(currentUserId, recipeKey));

  useEffect(async () => {
    setRecipeItem(await dataModel.getRecipeKey(recipeKey));
    setfav(dataModel.initfavlist(currentUserId, recipeKey));
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
            {recipeItem.name}
          </Text>
        </View>
        <View style={styles.titleButton}>
          <TouchableOpacity
          onPress={() => {   
            fav
              ? dataModel.removefav(currentUserId)
              : dataModel.addtofav(currentUserId, {
                  name: recipeItem.name,
                  cooktime:recipeItem.cooktime,
                  mealtype:recipeItem.mealtype,
                  rating:recipeItem.rating,
                  image:recipeItem.image,
                  id: recipeKey,
                  category: "Recipes",
                });
            setfav(!fav);
          }}
          >
            <MaterialCommunityIcons
              name={fav ? "heart" : "heart-outline"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.imgContainer} source={{ uri: recipeItem.image }} />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Cooking time: </Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{recipeItem.cooktime} min</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Meal type:</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{recipeItem.mealtype}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Rating: </Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{recipeItem.rating}/5</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <View style={styles.infotitletwo}>
              <Text style={styles.infotitletxt}>Rating:</Text>
            </View>
            <View style={styles.infoContenttwo}>
              <Text style={styles.infocontenttxt}></Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infotitletwo}>
              <Text style={styles.infotitletxt}>Price:</Text>
            </View>
            <View style={styles.infoContenttwo}>
              <Text style={styles.infocontenttxt}></Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.itemImage}>
        <Image
          style={styles.imagestyle}
          source={{
            uri: recipeItem.image,
          }}
        />
      </View> */}

      {/* <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infotxt}>
            Cooking Time: {recipeItem.cooktime}min
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infotxt}>Meal Type: {recipeItem.mealtype} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infotxt}>Rating: {recipeItem.rating}/5</Text>
        </View>
      </View>
      <View style={styles.buttonrow}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() =>
            navigation.navigate("recipeCheck", { recipeKey: recipeKey })
          }
        >
          <Text style={styles.listItemText}>Start to Prepare!</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.listItemCont}>
        
        <View style={styles.listItemConDetail}>
          <Text style={styles.listItemText}>
            Cooking Time: {recipeItem.cooktime}min
          </Text>
          <Text style={styles.listItemText}>
            Meal Type: {recipeItem.mealtype}{" "}
          </Text>
          <Text style={styles.listItemText}>Rating: {recipeItem.rating}/5</Text>
          <Text style={styles.listItemText}>Nutrition:</Text>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={recipeItem.nutrition}
            renderItem={({ item }) => {
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
            renderItem={({ item }) => {
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
          onPress={() =>
            navigation.navigate("recipeCheck", { recipeKey: recipeKey })
          }
        >
          <Text style={styles.listItemText}>Start to Prepare!</Text>
        </TouchableOpacity>
      </View> */}
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
  itemImage: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    flex: 0.2,
    justifyContent: "center",
    resizeMode: "cover",
    width: 350,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  infoContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  infoRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitle: {
    flex: 0.4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoContent: {
    flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitletwo: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoContenttwo: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitletxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infocontenttxt: {
    fontSize: 16,
  },
  infoItem: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonrow: {
    flex: 0.1,
    width: "100%",
    justifyContent:"center",
    alignItems:"center"
  },
});
