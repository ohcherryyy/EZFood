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
} from "react-native";
import { getDataModel } from "./DataModel";

export function RestaurantScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  const [search, setSearch] = useState("");
  const [reslist, setReslist] = useState(dataModel.getRes());

  useEffect(() => {
    dataModel.subscribeToUpdates(() => {
      setReslist(dataModel.getRes());
    });
  });

  return (
    <View style={styles.container}>
        <View style={styles.searchbar}></View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={reslist}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.name}</Text>    
              </View>
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
  },
  searchbar:{
    flex:0.2,

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
});
