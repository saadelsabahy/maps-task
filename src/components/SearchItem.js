import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from './IconButton';

const SearchItem = ({
   onSearchItemPressed,
   locationName,
   locationDescribtion,
}) => {
   return (
      <TouchableOpacity onPress={onSearchItemPressed} activeOpacity={0.7}>
         <View style={styles.container}>
            <IconButton
               iconName={'map-marker-outline'}
               iconContainerStyle={styles.iconContainer}
            />
            <View>
               <Text>{locationName}</Text>
               <Text>{locationDescribtion}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 55,
      backgroundColor: '#fff',
   },
   iconContainer: {
      backgroundColor: '#ddd',
      width: 30,
      height: 30,
      borderRadius: 15,
   },
});

export default SearchItem;
