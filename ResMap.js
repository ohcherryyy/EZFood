import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from 'react-native-maps';
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
                style={{ flex: 1 }}
                provider="google"
                region={{
                    latitude: 42.280826,
                    longitude: -83.743038,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                {reslist.map((marker) => (
                    <Marker
                    key={marker.key}
                    coordinate={{latitude: marker.location['latitude'], longitude: marker.location['longitude']}}
                    title={marker.name}
                    >
                        <Callout>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("ResDetail", {
                                    userkey: userkey ? userkey : currentUserId,
                                    restId: marker.key,
                                    })
                                }
                            >
                                <Text>Name: {marker.name}</Text>
                                <Text>Cuisine: {marker.cuisine}</Text>
                                <Text>Rating: {marker.rating}</Text>
                                <Image
                                    style={{ height: 100, width:70 }}
                                    source={{
                                        uri: marker.image,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
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
      paddingTop: 50,
    },
    titleContainer: {
      flex: 0.1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
      paddingLeft:10,
      paddingRight:10
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
    mapstyle:{
        flex:0.9,
        width:"100%",
        height:"100%"
    }
  });
