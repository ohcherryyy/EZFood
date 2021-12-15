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
import { color } from "react-native-elements/dist/helpers";

export function CommentScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { userkey, resname, restId } = route.params;
  const [username, setusername] = useState("user");
  const [rating, setrating] = useState(0);
  const [content, setcontent] = useState("");

  useEffect(() => {
    dataModel.addUserListener(async () => {
      const userinfo = await dataModel.getCurrentUserDisplayName(userkey);
      setusername(userinfo[0]);
    });
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Write your comment
          </Text>
        </View>
        <View style={styles.titleButton}></View>
      </View>
      <View style={styles.commentContainers}>
        <View style={styles.commentrow}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{resname}</Text>
        </View>
        <View style={styles.commentrow}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{username}</Text>
        </View>
        <View style={styles.commentrow}>
          <Rating
            fractions={1}
            startingValue={0}
            onFinishRating={(value) => setrating(value)}
            imageSize={30}
          />
          <Text style={{ fontSize: 17, color: "grey" }}>
            {" "}
            Rating: {rating}/5
          </Text>
        </View>
        <View style={styles.inputboxrow}>
          <TextInput
            style={styles.commentInputBox}
            multiline={true}
            onChangeText={(text) => setcontent(text)}
            placeholder="How do you feel about this restaurant? How does the food taste? What do you recommend? "
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity
          style={content?styles.buttonstyle:styles.buttonstyleunav}
            onPress={() => {
              let info = {
                content: content,
                rating: rating,
                time: new Date(),
                userid: userkey,
                username: username,
                thumbs: []
              };
              dataModel.updatecomment(restId,info)
              navigation.navigate("ResDetail", {
                userkey: userkey,
                restId: restId,
              })
            }}
          >
            <Text style={content ? { color: "black" } : { color: "lightgrey" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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
  commentContainers: {
    flex: 0.7,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  commentrow: {
    flex: 0.08,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  inputboxrow: {
    flex: 0.55,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
  },
  commentInputBox: {
    width: "100%",
    height: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: "2%",
  },
  submit: {
    flex: 0.08,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
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
  buttonstyleunav: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
  },
});
