import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView, Marker, Callout} from "react-native-maps";

export function RestMapScreen({ navigation, route }) {

    const { resList } = route.params;
    const { currentUserId } = route.params;
    const userkey = dataModel.getUserForID(currentUserId);

    return (
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
            {resList.map((marker, index) => (
                <Marker
                  key={index}
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
      );
}