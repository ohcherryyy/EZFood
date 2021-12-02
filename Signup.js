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
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function SignupScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confmpsw, setconfirm] = useState("");
  const dataModel = getDataModel();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");

  return (
    <View style={loginStyles.body}>
      <View style={loginStyles.loginContainer}>
        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Email: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter email address"
              autoCapitalize="none"
              spellCheck={false}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Password: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>

        <View style={loginStyles.loginRow}>
          <View style={loginStyles.loginLabelContainer}>
            <Text style={loginStyles.loginLabelText}>Confirm Password: </Text>
          </View>
          <View style={loginStyles.loginInputContainer}>
            <TextInput
              style={loginStyles.loginInputBox}
              placeholder="Confirm password"
              secureTextEntry={true}
              value={confmpsw}
              onChangeText={(text) => {
                setconfirm(text);
              }}
            />
          </View>
          <Text
          style={
            password === confmpsw
              ? loginStyles.loginLabelTextRight
              : loginStyles.loginLabelTextWrong
          }
        >
          Confirm
        </Text>
        </View>
        
        

        <View style={loginStyles.modeSwitchContainer}>
          <Text>
            Existing user?
            <Text
              onPress={() => {
                setMode("login");
              }}
              style={{ color: "blue" }}
            >
              {" "}
              Log In{" "}
            </Text>
            instead!
          </Text>
        </View>

        <View style={loginStyles.loginButtonRow}>
          <Button
            title={"Next"}
            onPress={async () => {
              try {
                const credential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                const authUser = credential.user;
                // await updateProfile(authUser, { displayName: displayName });
                const user = await dataModel.getUserForAuthUser(authUser);
                navigation.navigate("Budget", { currentUserId:user.key});
              } catch (error) {
                Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
              }
              setEmail("");
              setPassword("");
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
  loginLabelTextRight: {
    fontSize: 18,
    color: "green",
  },
  loginLabelTextWrong: {
    fontSize: 18,
    color: "grey",
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
