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
    const dataModel=getDataModel()
    const { currentUserId } = route.params;
    const userkey = dataModel.getUserForID(currentUserId);
    const [userDisplayName, setUserDisplayName] = useState('User');
    const auth=getAuth()
    // subscribe to updates, specifying the callback
    useEffect(()=>{
      dataModel.addUserListener(async () => {
        setUserDisplayName(await dataModel.getCurrentUserDisplayName(userkey));
      });
    }, []);
  
    return (
      <View style={styles.container}>
        <Text> Hi, {userDisplayName}! </Text>
        <Button
          title='Sign out'
          onPress={()=> {
            dataModel.disconnectOnSignout();
            signOut(auth)
          }}
        />
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 400,
      height: 100,
      resizeMode: 'contain'
    },
  
    mainImage: {
      height: 400,
      width: 300,
      resizeMode: 'contain'
    },
    cameraContainer: {
      flex: 1,
    },
    camera: {
      flex: 0.85,
    },
    cameraControls: {
      flex: 0.15, 
      justifyContent: 'flex-start', 
      alignItems: 'center',
      padding: '5%',
      width: '100%',
      backgroundColor: '#222'
    },
    snapText: {
      fontSize: 36,
      color: 'white'
    },
  });
