import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
   return (
      <View style={styles.container}>
         <AppNavigation />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});
