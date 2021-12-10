import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { LoginScreen } from "./Login"
import { SignupScreen } from './Signup';
import { SignupBudgetScreen } from './budgetsignup';
import { RestaurantScreen } from './Restaurant';
import { RecipeCheckScreen } from './recipeCheck';
import { RecipeScreen } from './Recipe';
import { FavoriteScreen } from './Favorite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileScreen } from './Profile';
import { RecipeDetailScreen } from './recipeDetail';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTabs({route}) {
  const userId=route.params.currentUserId
  return (
    <Tab.Navigator
      activeColor="#1a0ec2"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#A2D8EF' }}
      shifting={true}
    >
        <Tab.Screen
          name="Restaurant"
          component={RestaurantScreen}
          initialParams={{currentUserId:userId}}
          options={{
            tabBarLabel: 'Recipe',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="silverware" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Recipe"
          component={RecipeScreen}
          initialParams={{currentUserId:userId}}
          options={{
            tabBarLabel: 'Recipe',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chef-hat" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          initialParams={{currentUserId:userId}}
          options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{currentUserId:userId}}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"   
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Budget" component={SignupBudgetScreen} />
        <Stack.Screen name="recipeCheck" component={RecipeCheckScreen} />
        <Stack.Screen name="recipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
