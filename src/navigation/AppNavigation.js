import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import Search from '../screens/Search';
const AppNavigation = () => {
   const Stack = createStackNavigator();
   return (
      <NavigationContainer>
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={Search} />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default AppNavigation;
