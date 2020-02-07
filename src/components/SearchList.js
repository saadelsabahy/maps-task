import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SearchItem from './SearchItem';

const SearchList = ({ searchList }) => {
   return (
      <View style={styles.container}>
         <FlatList
            data={searchList}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item: {}, index }) => {
               return <SearchItem locationName={} locationDescribtion={} />;
            }}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default SearchList;
