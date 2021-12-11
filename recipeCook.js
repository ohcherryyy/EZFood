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
import { List } from "react-native-paper";

export function RecipeCookScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { recipeKey } = route.params;
  const [recipeItem, setRecipeItem] = useState(["Default"]);

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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Instructions</Text>
        </View>
        <View style={styles.titleButton}></View>
      </View>
      <View style={styles.itemImage}>
        <Image
          style={styles.imagestyle}
          source={{
            uri: recipeItem.image,
          }}
        />
      </View>
      <View style={styles.listItemCont}>
        <List.AccordionGroup>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={recipeItem.instructions}
            renderItem={({ index, item }) => {
              let step = index + 1;
              return (
                <List.Accordion title={"Step " + step} id={step}>
                  <List.Item title={item} titleNumberOfLines={10} />
                </List.Accordion>
              );
            }}
          />
        </List.AccordionGroup>
      </View>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate("Home", {
            
            screen: "Recipe",
          })
        }
      >
        <Text style={styles.listItemText}>Finish!</Text>
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

  listItemCont: {
    flex: 0.5,
    width: "100%",
  },
  listItemText: {
    flex: 0.5,
    fontSize: 18,
  },
  listItem: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
});
