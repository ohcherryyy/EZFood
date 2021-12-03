import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import CheckCircleOutlined from "@ant-design/icons";
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

export function RecipeScreen({ navigation, route }) {
  const dataModel = getDataModel();
    const { userId } = route.params;
    const userkey = dataModel.getUserForID(userId);
  const [search, setSearch] = useState("");
  const [reclist, setReclist] = useState(dataModel.getRecipes());

  useEffect(() => {
    dataModel.subscribeToUpdates(() => {
      setReclist(dataModel.getRecipes());
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}></View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={reclist}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                // onPress={() => navigation.navigate("Restaurant")}
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
        />
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
  searchbar: {
    flex: 0.2,
  },
  listContainer: {
    flex: 0.8,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  listContentContainer: {
    justifyContent: "center",
  },
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 30,
    width: "100%",
    height: 100,
  },
  listItemimgContainer: {
    flex: 0.2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    resizeMode: "center",
    width: 100,
    height: 100,
  },
  listItemCont: {
    flex: 0.8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingLeft: 20,
  },
  listItemContTitle: {
    flex: 0.4,
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemConDetail: {
    flex: 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  listItemText: {
    flex: 0.3,
    fontSize: 15,
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
