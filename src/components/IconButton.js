import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const IconButton = ({
   onIconPressed,
   iconContainerStyle,
   iconName,
   iconStyle,
   iconColor,
}) => {
   return (
      <TouchableOpacity onPress={onIconPressed}>
         <View style={[styles.iconContainer, iconContainerStyle]}>
            <Icon
               name={iconName}
               color={iconColor}
               size={20}
               style={[iconStyle]}
            />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
   },
});
export default IconButton;
