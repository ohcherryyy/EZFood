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
  Image,
} from "react-native";
import { getDataModel } from "./DataModel";
import { SearchBar } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function RestaurantScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;
  // console.log("params")
  // console.log(currentUserId)
  const userkey = dataModel.getUserForID(currentUserId);
  // console.log("initial")
  // console.log(userkey)
  dataModel.getBudget(userkey ? userkey : currentUserId);
  const [search, setSearch] = useState("");
  const [reslist, setReslist] = useState(dataModel.getRes());
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
          placeholder="Find your restaurants"
          platform="ios"
          value={search}
          onChangeText={(value) => {
            dataModel.searchRestaurants(value);
            setSearch(value);
          }}
        />
        <View style={styles.mapstyle}>
          <TouchableOpacity
            
            onPress={() => navigation.navigate("ResMap", {reslist: reslist, currentUserId: userkey})}
          >
            <MaterialCommunityIcons name="map" size={25} color={"#1a0ec2"}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filtercontainer}>
        <View style={styles.filterItem}>
          <View style={styles.filterTitle}>
            <Text style={styles.filtertext}>Meal</Text>
          </View>
          <View style={styles.filterCont}>
            <TouchableOpacity onPress={() => setmeal(0)}>
              <Text
                style={meal === 0 ? { color: "#1a0ec2" } : { color: "black" }}
              >
                Breakfast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmeal(1)}>
              <Text
                style={meal === 1 ? { color: "#1a0ec2" } : { color: "black" }}
              >
                Lunch
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmeal(2)}>
              <Text
                style={meal === 2 ? { color: "#1a0ec2" } : { color: "black" }}
              >
                Dinner
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterItem}>
          <View style={styles.filterTitle}>
            <Text style={styles.filtertext}>Budget control</Text>
          </View>
          <View style={styles.filterCont}>
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
      </View>

      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={reslist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() =>
                  navigation.navigate("ResDetail", {
                    userkey: userkey ? userkey : currentUserId,
                    restId: item.key,
                  })
                }
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
    justifyContent: "center",
    paddingTop: 50,
  },
  searchbar: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchbarstyle: {
    flex: 0.9,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  mapstyle: {
    flex: 0.1,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  filtercontainer: {
    flex: 0.1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  filterItem: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  filterCont: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  filtertext: {
    fontSize: 15,
    fontWeight: "bold",
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
