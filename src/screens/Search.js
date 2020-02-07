import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import SearchItem from '../components/SearchItem';

const Search = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <SearchInput
            inputProps={{ autoFocus: true }}
            showLeftIcon
            leftIconName="keyboard-backspace"
            onLeftIconPressed={() => navigation.goBack()}
            searchBarContainerStyle={styles.input}
         />
         <SearchItem />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      paddingTop: StatusBar.currentHeight,
      flex: 1,
      backgroundColor: '#eee',
   },
   input: {
      height: 50,
      width: '95%',
   },
});

export default Search;
