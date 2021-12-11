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
  const { currentUserId } = route.params;
  const { recipeKey } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  const [recipeItem, setRecipeItem] = useState(["Default"]);
  // const [fav, setfav] = useState(dataModel.initfavlist(userkey, recipeKey));

  useEffect(async () => {
    setRecipeItem(await dataModel.getRecipeKey(recipeKey));
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
          // onPress={() => {
          //   console.log(fav);
          //   fav
          //     ? dataModel.removefav(userkey)
          //     : dataModel.addtofav(userkey, {
          //         name: info.name,
          //         cuisine:info.cuisine,
          //         price:info.price,
          //         rating:info.rating,
          //         id: restId,
          //         category: "Restaurants",
          //       });
          //   setfav(!fav);
          // }}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              // name={fav ? "heart" : "heart-outline"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemImage}>
        <Image
          style={styles.imagestyle}
          source={{
            uri: recipeItem.image,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
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
      </View>

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
  imagestyle: {
    resizeMode: "center",
    paddingBottom: 30,
    width: 2000,
    height: 2000,
  },
  infoContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoItem: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  infotxt: {
    fontSize: 15,
  },
  buttonrow: {
    flex: 0.1,
    width: "100%",
    justifyContent:"center",
    alignItems:"center"
  },
});
