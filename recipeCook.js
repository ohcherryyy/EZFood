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
  const { recipeKey,currentUserId } = route.params;
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
      <Image style={styles.imgContainer} source={{ uri: recipeItem.image }} />
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
      <View style={styles.editbutton}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() =>
            navigation.navigate("Home", {params: { currentUserId: currentUserId },
              
            })
          }
        >
          <Text style={styles.listItemText}>Finish!</Text>
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
  imgContainer: {
    flex: 0.2,
    justifyContent: "center",
    resizeMode: "cover",
    width: 350,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },

  listItemCont: {
    flex: 0.5,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
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
