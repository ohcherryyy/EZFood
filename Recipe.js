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
import { SearchBar } from "react-native-elements";

export function RecipeScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { userId } = route.params;
  const userkey = dataModel.getUserForID(userId);
  const [search, setSearch] = useState("");
  const [reclist, setReclist] = useState(dataModel.getRecipes());
  const [cooktime, setCooktime] = useState("");
  const [filtershow, setfiltershow] = useState(false);

  useEffect(() => {
    dataModel.subscribeToRecUpdates(() => {
      setReclist(dataModel.getRecipes());
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <SearchBar
          containerStyle={styles.searchbarstyle}
          placeholder="Find your recipe"
          platform="ios"
          value={search}
          onChangeText={(value) => {
            dataModel.searchRecipes(value);
            setSearch(value);
          }}
        />
      </View>
      <View style={styles.filtercontainer}>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setfiltershow(!filtershow)}>
            <Text style={styles.filtertext}>Cook time</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setfiltershow(!filtershow)}>
            <Text style={styles.filtertext}>Category</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setfiltershow(!filtershow)}>
            <Text style={styles.filtertext}>Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
      {filtershow ? (
        <View style={styles.filterCont}>
          <View style={styles.filterOption}>
            <TouchableOpacity onPress={() => dataModel.initRecipeOnSnapshot()}>
              <Text style={styles.filterOptionItem}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("cooktime", 1, 30)}
            >
              <Text style={styles.filterOptionItem} color="red">0-30 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("cooktime", 30, 60)}
            >
              <Text style={styles.filterOptionItem}>30-60 min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("cooktime", 60, null)}
            >
              <Text style={styles.filterOptionItem}>60 min</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOption}>
            <TouchableOpacity onPress={() => dataModel.initRecipeOnSnapshot()}>
              <Text style={styles.filterOptionItem}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                dataModel.filterRecipes("mealtype", null, "appetizers")
              }
            >
              <Text style={styles.filterOptionItem}>Appetizers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                dataModel.filterRecipes("mealtype", null, "main dish")
              }
            >
              <Text style={styles.filterOptionItem}>Main dish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                dataModel.filterRecipes("mealtype", null, "dessert")
              }
            >
              <Text style={styles.filterOptionItem}>Desserts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOption}>
            <TouchableOpacity onPress={() => dataModel.initRecipeOnSnapshot()}>
              <Text style={styles.filterOptionItem}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("rating", 4, 5)}
            >
              <Text style={styles.filterOptionItem}>4-5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("rating", 2, 4)}
            >
              <Text style={styles.filterOptionItem}>2-4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dataModel.filterRecipes("rating", 0, 2)}
            >
              <Text style={styles.filterOptionItem}>0-2</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View
        style={filtershow ? styles.listContainerexpand : styles.listContainer}
      >
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
                  <Text numberOfLines={100} style={styles.listItemContTitle}>
                    {item.name}
                  </Text>
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
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  searchbar: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: -20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchbarstyle: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  //   filter: {
  //     flex: 0.1,
  //     width: "100%",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  filtercontainer: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
  filterItem: {
    flex: 0,
  },
  filtertext: {
    fontSize: 15,
  },
  filterCont: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 25,
    paddingRight: 0,
    width: "100%",
  },
  filterOption: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  filterOptionItem: {
    fontSize: 15,
  },

  listContainerexpand: {
    flex: 0.75,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  listContainer: {
    flex: 0.85,
    paddingTop: 20,
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
    resizeMode: "cover",
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  listItemCont: {
    flex: 0.8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingLeft: 20,
  },
  listItemContTitle: {
    flex: 0.7,
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemConDetail: {
    flex: 0.3,
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
