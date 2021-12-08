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
  Switch,
} from "react-native";
import { getDataModel } from "./DataModel";
import { SearchBar } from "react-native-elements";

export function RestaurantScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  dataModel.getBudget(userkey);
  const [search, setSearch] = useState("");
  const [reslist, setReslist] = useState(dataModel.getRes());
  const [filtershow, setfiltershow] = useState(false);
  const [budget, setBudget] = useState(dataModel.getshowbudget());
  const [meal, setmeal] = useState(0);

  useEffect(() => {
    dataModel.subscribeToResUpdates(() => {
      setReslist(dataModel.getRes());
      setBudget(dataModel.getshowbudget());
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
            dataModel.searchRestaurants(value);
            setSearch(value);
          }}
        />
      </View>
      <View style={styles.filtercontainer}>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setfiltershow(!filtershow)}>
            <Text style={styles.filtertext}>Meal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterItem}>
          <Switch
            value={budget}
            onValueChange={() => {
              dataModel.changeshowbudget();
              if (!budget) {
                dataModel.budgetRes(meal);
              } else {
                dataModel.initResOnSnapshot();
              }
            }}
          ></Switch>
        </View>
      </View>
      <View style={styles.filterCont}>
        <View style={styles.filterOption}>
          <TouchableOpacity
            onPress={() => {
              setmeal(0);
            }}
          >
            <Text style={styles.filterOptionItem}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setmeal(1);
            }}
          >
            <Text style={styles.filterOptionItem} color="red">
              Lunch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setmeal(2);
            }}
          >
            <Text style={styles.filterOptionItem}>Dinner</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={reslist}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                // onPress={() => navigation.navigate("Restaurant")}
              >
                {/* <Image
                  style={styles.listItemimgContainer}
                  source={{
                    uri: item.image,
                  }}
                /> */}
                <View style={styles.listItemCont}>
                  <Text numberOfLines={100} style={styles.listItemContTitle}>
                    {item.name}
                  </Text>
                  <View style={styles.listItemConDetail}>
                    <Text style={styles.listItemText}>{item.cuisine}</Text>
                    <Text style={styles.listItemText}>{item.price} </Text>
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
    flex: 0.2,
  },
  listContainer: {
    flex: 0.8,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
  },
  listContentContainer: {
    justifyContent: "flex-start",
  },
  listItem: {
    flex: 1,
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
  filtercontainer: {
    flex: 0.17,
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
});
