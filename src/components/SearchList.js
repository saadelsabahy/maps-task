import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SearchItem from './SearchItem';

const SearchList = ({
   searchList,
   onSearchItemPressed,
   onCurrentLocationPressed,
}) => {
   return (
      <View style={styles.container}>
         <SearchItem
            locationName={'your location'}
            onSearchItemPressed={onCurrentLocationPressed}
         />
         <FlatList
            data={searchList}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({
               item,
               item: {
                  id,
                  address: {
                     streetNumber,
                     streetName,
                     municipality,
                     municipalitySubdivision,
                     country,
                  },
                  position,
               },
               index,
            }) => {
               return (
                  <SearchItem
                     locationName={municipality}
                     locationDescribtion={`${country}`}
                     onSearchItemPressed={() =>
                        onSearchItemPressed(municipality, position)
                     }
                  />
               );
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
