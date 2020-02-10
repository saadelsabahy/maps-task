import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { StoreProvider } from './src/Context/reducer/ContextStore';

export default function App() {
   return (
      <StoreProvider>
         <View style={styles.container}>
            <AppNavigation />
         </View>
      </StoreProvider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});
