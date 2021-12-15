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

export function FavoriteScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  const [favlist, setfavlist] = useState(dataModel.getfav());
  const tablist = ["Restaurants", "Recipes"];
  const [tab, settab] = useState(tablist[0]);

  useEffect(() => {
    dataModel.favOnsnapshot(userkey);
    dataModel.subscribeToResUpdates(() => {
      setfavlist(dataModel.getfav());
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleitem}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabItems}>
          <TouchableOpacity onPress={() => settab(tablist[0])}>
            <Text
              style={
                tab === "Restaurants"
                  ? styles.tabSelected
                  : styles.tabUnselected
              }
            >
              Restaurants
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabItems}>
          <TouchableOpacity onPress={() => settab(tablist[1])}>
            <Text
              style={
                tab === "Recipes" ? styles.tabSelected : styles.tabUnselected
              }
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {tab === tablist[0] ? (
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={favlist}
            renderItem={({ item }) => {
              if (item.category === tablist[0]) {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate("ResDetail", {
                        userkey: userkey,
                        restId: item.id,
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
                      <Text
                        numberOfLines={100}
                        style={styles.listItemContTitle}
                      >
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
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            keyExtractor={(item, index) => index.toString()}
            data={favlist}
            renderItem={({ item }) => {
              if (item.category === tablist[1]) {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate("recipeDetail", {
                        recipeKey: item.key,
                        currentUserId: userkey,
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
                      <Text
                        numberOfLines={100}
                        style={styles.listItemContTitle}
                      >
                        {item.name}
                      </Text>
                      <View style={styles.listItemConDetail}>
                        <Text style={styles.listItemText}>
                          {item.cooktime}min
                        </Text>
                        <Text style={styles.listItemText}>
                          {item.mealtype}{" "}
                        </Text>
                        <Text style={styles.listItemText}>{item.rating}/5</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      )}
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
  titleitem: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
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
    resizeMode: "cover",
    width: 100,
    height: 60,
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
  listItemButtons: {
    flex: 0.3,
    flexDirection: "row",
  },
  tabContainer: {
    flex: 0.03,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  tabItems: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  tabSelected: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  tabUnselected: {
    fontSize: 15,
  },
});
