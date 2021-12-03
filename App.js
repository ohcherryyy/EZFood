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

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Restaurant" component={RestaurantScreen} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
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
        <Tab.Screen name="recipeCheck" component={RecipeCheckScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

// function App() {
//   return (
//     <NavigationContainer>
//     </NavigationContainer>
//   );
// }

// export default App;
