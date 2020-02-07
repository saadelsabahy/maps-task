import React from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import IconButton from './IconButton';
const SearchInput = ({
   placeholder,
   value,
   onSearchInputChange,
   placeholderTextColor,
   showLeftIcon,
   leftIconColor,
   searchBarContainerStyle,
   leftIconStyle,
   leftIconName,
   onLeftIconPressed,
   leftIconContainerStyle,
   inputStyle,
   showRightIcon,
   onRightIconPressed,
   rightIconName,
   rightIconColor,
   rightIconContainerStyle,
   rightIconStyle,
   rightloadingContainerStyle,
   showRightLoading,
   indicatorSize,
   indicatorColor,
   inputProps,
}) => {
   return (
      <View style={[styles.container, searchBarContainerStyle]}>
         {showLeftIcon && (
            <IconButton
               onIconPressed={onLeftIconPressed}
               iconName={leftIconName}
               iconColor={leftIconColor}
               iconStyle={leftIconStyle}
               iconContainerStyle={[
                  styles.leftAndRightIconContainer,
                  leftIconContainerStyle,
               ]}
            />
         )}
         <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onSearchInputChange}
            style={[styles.textInput, inputStyle]}
            placeholderTextColor={placeholderTextColor}
            {...inputProps}
         />
         {showRightIcon && (
            <IconButton
               onIconPressed={onRightIconPressed}
               iconName={rightIconName}
               iconColor={rightIconColor}
               iconStyle={rightIconStyle}
               iconContainerStyle={[
                  styles.leftAndRightIconContainer,
                  rightIconContainerStyle,
               ]}
            />
         )}
         {showRightLoading && (
            <View
               style={[
                  styles.indicatorContainerStyle,
                  rightloadingContainerStyle,
               ]}>
               <ActivityIndicator
                  size={indicatorSize || 'small'}
                  color={indicatorColor}
               />
            </View>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: '90%',
      height: 40,
      alignSelf: 'center',
      borderRadius: 4,
      marginVertical: 5,
   },

   textInput: {
      flex: 1,
      marginHorizontal: 5,
      fontSize: 17,
      letterSpacing: 1,
      fontWeight: '400',
      textTransform: 'capitalize',
   },
   indicatorContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
   },
   leftAndRightIconContainer: {
      flex: 1,
   },
});
export { SearchInput };
