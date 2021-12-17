import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getDataModel } from "./DataModel";

export function RestMapScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { reslist } = route.params;
  console.log(reslist);
  const { currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleitem}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Map</Text>
        </View>
        <View style={styles.titleButton}></View>
      </View>
      <MapView
        style={styles.mapstyle}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: 42.280826,
          longitude: -83.743038,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {reslist.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={{
              latitude: marker.location["latitude"],
              longitude: marker.location["longitude"],
            }}
            title={marker.name}
          >
            <Callout
            onPress={() =>
              navigation.navigate("ResDetail", {
                userkey: userkey ? userkey : currentUserId,
                restId: marker.key,
              })}>
                <Image
                  style={styles.listItemimgContainer}
                  source={{
                    uri: marker.image,
                  }}
                />
                <View style={styles.listItemCont}>
                  <Text numberOfLines={100} style={styles.listItemContTitle}>
                    {marker.name}
                  </Text>
                  <View style={styles.listItemConDetail}>
                    <Text style={styles.listItemText}>{marker.cuisine}</Text>
                    <Text style={styles.listItemText}>{marker.price} </Text>
                    <Text style={styles.listItemText}>{marker.rating}/5</Text>
                  </View>
                </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  titleContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
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
  mapstyle: {
    flex: 0.9,
    width: "100%",
    height: "100%",
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
    alignItems: "flex-start",
    flexDirection: "row",
  },
  listItemText: {
    flex: 0.3,
    fontSize: 15,
  },
});
