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
  const { userId } = route.params;
  const userkey = dataModel.getUserForId(userId);
  const [search, setSearch] = useState("");
  const [reslist, setReslist] = useState(dataModel.getRes());

  useEffect(() => {
    dataModel.subscribeToUpdates(() => {
      setReslist(dataModel.getRes());
    });
  });

  
}
