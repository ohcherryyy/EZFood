import React, { useEffect, useState } from "react";
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
import { Rating } from "react-native-elements";
import { getDataModel } from "./DataModel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function RestDetailScreen({ navigation, route }) {
  const { userkey, restId } = route.params;
  const tablist = ["menu", "comment"];
  const dataModel = getDataModel();
  const [info, setinfo] = useState(dataModel.getresinfo(restId));
  const [tab, settab] = useState(tablist[0]);
  const [menulist, setmenulist] = useState(["Nothing found"]);
  const [fav, setfav] = useState(false);
  const displaymenu = dataModel.showbudget;
  const [commentlist, setcommentlist] = useState(
    dataModel.initcomment(restId, userkey)
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const infolist = await dataModel.getresinfo(restId);
        setinfo(infolist);
        const menu =await dataModel.menuOnSnapshot(restId);
        setmenulist(menu);
        const favorite = dataModel.initfavlist(userkey, restId);
        setfav(favorite);
        setcommentlist(dataModel.initcomment(restId, userkey));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
        
  }, [navigation]);

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
      <Image style={styles.imgContainer} source={{ uri: info.image }} />
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

      {tab === "menu" ? (
        <View style={styles.listContainer}>
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
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.menuContainer}
            data={commentlist}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              // setlike(item.like);
              return (
                <View style={styles.commentcontainer}>
                  <View style={styles.commentrow}>
                    <View style={styles.rowleft}>
                      <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        {item.username}
                      </Text>
                    </View>
                    <View style={styles.rowright}>
                      <Rating
                        readonly
                        fractions={1}
                        startingValue={item.rating}
                        imageSize={20}
                      />
                    </View>
                  </View>
                  <View style={styles.commentrow}>
                    <Text>{item.content}</Text>
                  </View>
                  <View style={styles.commentrow}>
                    <View style={styles.rowleft}>
                      <TouchableOpacity
                        onPress={async () => {
                          item.like
                            ? await dataModel.cancellikes(restId, item.key, userkey)
                            : await dataModel.thumbsup(restId, item.key, userkey);
                          setcommentlist(dataModel.initcomment(restId, userkey))
                        }}
                      >
                        <MaterialCommunityIcons
                          size={18}
                          name={item.like ? "thumb-up" : "thumb-up-outline"}
                        />
                      </TouchableOpacity>
                      <Text> {item.thumbs.length}</Text>
                    </View>
                    <View style={styles.rowright}>
                      <Text style={{ color: "grey", fontStyle: "italic" }}>
                        Comment on
                      </Text>
                      <Text style={{ color: "grey", fontStyle: "italic" }}>
                        {item.time.toDate().toLocaleDateString("en-us", {
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
      )}
      {tab === "menu" ? (
        <View></View>
      ) : (
        <View style={styles.editbutton}>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() =>
              navigation.navigate("comment", {
                userkey: userkey,
                resname: info.name,
                restId: restId,
              })
            }
          >
            <Text>Comment</Text>
          </TouchableOpacity>
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
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
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
  imgContainer: {
    flex: 0.2,
    justifyContent: "center",
    resizeMode: "cover",
    width: 350,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  infoContainer: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
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
    paddingBottom: 20,
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
    flex: 0.4,
    width: "100%",
    paddingBottom: 10,
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
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuTitletxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuname: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuprice: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  txtorginal: {
    fontSize: 17,
    color: "black",
  },
  commentcontainer: {
    width: "100%",
    flex: 0.75,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
  },
  commentrow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  rowleft: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowright: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editbutton: {
    flex: 0.05,
    width: "100%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonstyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});
