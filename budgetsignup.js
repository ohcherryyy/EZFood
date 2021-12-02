import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
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
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function SignupBudgetScreen({ navigation, route }) {
  const dataModel = getDataModel();
  const { currentUserId } = route.params;

  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");
  const [budget, setBudget] = useState("");
  const [breakfast, setBreak] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  return (
    <View style={loginStyles.body}>
      <View style={loginStyles.loginContainer}>
        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>UserName: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter username"
              autoCapitalize="none"
              spellCheck={false}
              value={displayName}
              onChangeText={(text) => {
                setDisplayName(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Monthly Budget: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter budget"
              value={budget}
              onChangeText={(text) => {
                setBudget(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Breakfast: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter breakfast ratio"
              autoCapitalize="none"
              spellCheck={false}
              value={breakfast}
              onChangeText={(text) => {
                setBreak(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Lunch: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter lunch ratio"
              autoCapitalize="none"
              spellCheck={false}
              value={lunch}
              onChangeText={(text) => {
                setLunch(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Dinner: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter dinner ratio"
              autoCapitalize="none"
              spellCheck={false}
              value={dinner}
              onChangeText={(text) => {
                setDinner(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginButtonRow}>
          <Button
            title={"Sign up"}
            onPress={async() => {
                let info={
                    displayName: displayName,
                    budget: budget,
                    breakfast:breakfast,
                    lunch:lunch,
                    dinner:dinner
                }
                dataModel.updateItem(currentUserId, info)
            }}
          />
        </View>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  loginContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  loginRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  loginLabelContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  loginLabelText: {
    fontSize: 18,
  },
  loginInputContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  loginInputBox: {
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: "2%",
  },
  modeSwitchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginButtonRow: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
