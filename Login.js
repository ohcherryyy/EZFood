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
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dataModel = getDataModel();
  const auth = getAuth();

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

        <View style={loginStyles.modeSwitchContainer}>
          <Text>
            New user?
            <Text
              onPress={() => {
                navigation.navigate("Signup")
              }}
              style={{ color: "blue" }}
            >
              {" "}
              Sign up{" "}
            </Text>
            instead!
          </Text>
        </View>
        <View style={loginStyles.loginButtonRow}>
          <Button
            title={"Log in"}
            onPress={async () => {
                try {
                  const credential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                  );
                  const authUser = credential.user;
                  const user = await dataModel.getUserForAuthUser(authUser);
                  navigation.navigate("Restaurant", { currentUserId: user.key });
                } catch (error) {
                  Alert.alert("Login Error", error.message, [{ text: "OK" }]);
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
