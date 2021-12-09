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

export function RestDetailScreen({ navigation, route }) {
  const { currentUserId, restId } = route.params;
  console.log("user" + currentUserId);
  console.log("res" + restId);
  return (
    <View style={styles.container}>
      <Text style={styles.filtertext}>{currentUserId}</Text>
      <Text style={styles.filtertext}>{restId}</Text>
      <Button title="Return" onPress={()=>navigation.goBack()}/>
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
    flex: 1,
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
