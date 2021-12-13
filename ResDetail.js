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
  Image
} from "react-native";
import { getDataModel } from "./DataModel";
import { SearchBar } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function RestDetailScreen({ navigation, route }) {
  const { userkey, restId } = route.params;
  const tablist = ["menu", "comment"];
  const dataModel = getDataModel();
  const [info, setinfo] = useState(["Default"]);
  const [tab, settab] = useState(tablist[0]);
  const [menulist, setmenulist] = useState(["Nothing found"]);
  const [fav, setfav] = useState(dataModel.initfavlist(userkey, restId));
  const displaymenu = dataModel.showbudget;

  useEffect(async () => {
    setinfo(await dataModel.getresinfo(restId));
    setmenulist(await dataModel.menuOnSnapshot(restId));
    setfav(dataModel.initfavlist(userkey, restId));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="black" size={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleitem}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{info.name}</Text>
        </View>
        <View style={styles.titleButton}>
          <TouchableOpacity
            onPress={() => {
              fav
                ? dataModel.removefav(userkey)
                : dataModel.addtofav(userkey, {
                    name: info.name,
                    cuisine: info.cuisine,
                    price: info.price,
                    rating: info.rating,
                    image: info.image,
                    id: restId,
                    category: "Restaurants",
                  });
              setfav(!fav);
            }}
          >
            <MaterialCommunityIcons
              name={fav ? "heart" : "heart-outline"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.imgContainer} source={{uri:info.image}} />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Address:</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{info.address}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Time:</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{info.time}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infotitle}>
            <Text style={styles.infotitletxt}>Cuisine:</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infocontenttxt}>{info.cuisine}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <View style={styles.infotitletwo}>
              <Text style={styles.infotitletxt}>Rating:</Text>
            </View>
            <View style={styles.infoContenttwo}>
              <Text style={styles.infocontenttxt}>{info.rating}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infotitletwo}>
              <Text style={styles.infotitletxt}>Price:</Text>
            </View>
            <View style={styles.infoContenttwo}>
              <Text style={styles.infocontenttxt}>{info.price}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabItems}>
          <TouchableOpacity onPress={() => settab(tablist[0])}>
            <Text
              style={tab === "menu" ? styles.tabSelected : styles.tabUnselected}
            >
              Menu
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabItems}>
          <TouchableOpacity onPress={() => settab(tablist[1])}>
            <Text
              style={
                tab === "comment" ? styles.tabSelected : styles.tabUnselected
              }
            >
              Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        {tab === "menu" ? (
          <FlatList
            contentContainerStyle={styles.menuContainer}
            data={menulist}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.menuRow}>
                  <View style={styles.menuname}>
                    <Text
                      style={
                        displaymenu
                          ? {
                              fontSize: 17,
                              color: item.req ? "black" : "grey",
                            }
                          : styles.txtorginal
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.menuprice}>
                    <Text
                      style={
                        displaymenu
                          ? {
                              fontSize: 17,
                              color: item.req ? "black" : "grey",
                            }
                          : styles.txtorginal
                      }
                    >
                      ${item.price}
                    </Text>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        ) : (
          <View></View>
        )}
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:30
  },
  titleContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
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
  imgContainer:{
    flex:0.2,
    justifyContent:"center",
    resizeMode:"cover",
    width:350,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20
  },
  infoContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:20
  },
  infoRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitle: {
    flex: 0.25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoContent: {
    flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitletwo: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoContenttwo: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infotitletxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infocontenttxt: {
    fontSize: 16,
  },
  infoItem: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabContainer: {
    flex: 0.03,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom:10
  },
  tabItems: {
    flex: 0.25,
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
  listContainer: {
    flex: 0.57,
    width: "100%",
    paddingBottom:20
  },
  menuContainer: {
    justifyContent: "center",
  },
  menuRow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuTitletxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuname: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuprice: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  txtorginal: {
    fontSize: 17,
    color: "black",
  },
});
