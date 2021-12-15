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
import { getAuth, signOut } from "@firebase/auth";

export function ProfileScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;
  const userkey = dataModel.getUserForID(currentUserId);
  const [userDisplayName, setUserDisplayName] = useState("User");
  const [budget, setBudget] = useState("");
  const [day, setDay] = useState("");
  const [breakfast, setBreak] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [mode, setMode] = useState("view");
  const auth = getAuth();

  useEffect(() => {
    dataModel.addUserListener(async () => {
      const userinfo = await dataModel.getCurrentUserDisplayName(userkey);
      setUserDisplayName(userinfo[0]);
      setBudget(userinfo[1]);
      setDay(userinfo[2]);
      setBreak(userinfo[3]);
      setLunch(userinfo[4]);
      setDinner(userinfo[5]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <View style={styles.usernameCont}>
          {mode === "view" ? (
            <Text style={styles.usertxt}> Hi, {userDisplayName}! </Text>
          ) : (
            <TextInput
              style={styles.budgetInputBox}
              placeholder="enter your username "
              value={userDisplayName}
              onChangeText={(text) => {
                setUserDisplayName(text);
              }}
            />
          )}
        </View>
        <View style={styles.logoutContainer}>
          <Button
            title="Sign out"
            onPress={() => {
              dataModel.disconnectOnSignout();
              signOut(auth);
            }}
          />
        </View>
      </View>
      <View style={styles.budgetContainer}>
        <View style={styles.budgetTitle}>
          <View style={styles.titletxt}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Budget Option
            </Text>
          </View>
          <View style={styles.editbutton}>
            <Button
              title={mode === "view" ? "Edit" : "Cancel"}
              onPress={() => {
                setMode(mode === "view" ? "edit" : "view");
              }}
            />
          </View>
        </View>
        {mode === "view" ? (
          <View style={styles.budgetRowContainer}>
            <View style={styles.budgetRow}>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>Monthly Budget: </Text>
              </View>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>{budget}</Text>
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>Dining out days: </Text>
              </View>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>{day}</Text>
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>Breakfast: </Text>
              </View>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>{breakfast}</Text>
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>Lunch: </Text>
              </View>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>{lunch}</Text>
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>Dinner: </Text>
              </View>
              <View style={styles.budgetViewContainer}>
                <Text style={styles.budgetLabelText}>{dinner}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.budgetRowContainer}>
            <View style={styles.budgetRow}>
              <View style={styles.budgetLabelContainer}>
                <Text style={styles.budgetLabelText}>Monthly budget:</Text>
              </View>
              <View style={styles.budgetInputContainer}>
                <TextInput
                  style={styles.budgetInputBox}
                  placeholder="enter monthly budget "
                  value={budget.toString()}
                  onChangeText={(text) => {
                    setBudget(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetLabelContainer}>
                <Text style={styles.budgetLabelText}>Dining out days:</Text>
              </View>
              <View style={styles.budgetInputContainer}>
                <TextInput
                  style={styles.budgetInputBox}
                  placeholder="enter days for dining out "
                  value={day.toString()}
                  onChangeText={(text) => {
                    setDay(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetLabelContainer}>
                <Text style={styles.budgetLabelText}>Breakfast:</Text>
              </View>
              <View style={styles.budgetInputContainer}>
                <TextInput
                  style={styles.budgetInputBox}
                  placeholder="enter breakfast ratio "
                  value={breakfast.toString()}
                  onChangeText={(text) => {
                    setBreak(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetLabelContainer}>
                <Text style={styles.budgetLabelText}>Lunch:</Text>
              </View>
              <View style={styles.budgetInputContainer}>
                <TextInput
                  style={styles.budgetInputBox}
                  placeholder="enter lunch ratio "
                  value={lunch.toString()}
                  onChangeText={(text) => {
                    setLunch(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.budgetRow}>
              <View style={styles.budgetLabelContainer}>
                <Text style={styles.budgetLabelText}>Dinner:</Text>
              </View>
              <View style={styles.budgetInputContainer}>
                <TextInput
                  style={styles.budgetInputBox}
                  placeholder="enter dinner ratio "
                  value={dinner.toString()}
                  onChangeText={(text) => {
                    setDinner(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.budgetButtonRow}>
              <Button
                title={"Update"}
                onPress={async () => {
                  let info = {
                    displayName: userDisplayName,
                    budget: Number(budget),
                    day: Number(day),
                    breakfast: Number(breakfast),
                    lunch: Number(lunch),
                    dinner: Number(dinner),
                  };
                  dataModel.updateItem(userkey, info);
                  setMode("view")
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  usernameContainer: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingLeft:20,
    paddingRight:20
  },
  usernameCont: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  usertxt: {
    fontSize: 25,
  },
  logoutContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  budgetContainer: {
    flex: 0.9,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingLeft:20,
    paddingRight:20,
  },
  budgetTitle: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titletxt: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  editbutton: {
    flex: 0.5,
  },
  budgetRowContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  budgetRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  budgetLabelContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  budgetViewContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  budgetLabelText: {
    fontSize: 18,
  },
  budgetInputContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    
  },
  budgetInputBox: {
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: "2%",
  },
  
  budgetButtonRow: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // logo: {
  //   width: 400,
  //   height: 100,
  //   resizeMode: "contain",
  // },
  // mainImage: {
  //   height: 400,
  //   width: 300,
  //   resizeMode: "contain",
  // },
  // cameraContainer: {
  //   flex: 1,
  // },
  // camera: {
  //   flex: 0.85,
  // },
  // cameraControls: {
  //   flex: 0.15,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   padding: "5%",
  //   width: "100%",
  //   backgroundColor: "#222",
  // },
  // snapText: {
  //   fontSize: 36,
  //   color: "white",
  // },
});
