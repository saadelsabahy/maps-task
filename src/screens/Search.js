import React, { useEffect, useReducer, useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import SearchItem from '../components/SearchItem';
import { Store } from '../Context/reducer/ContextStore';
import {
   SOURCE_INPUT_CHANGE,
   DISTINATION_INPUT_CHANGE,
   SEARCH_PLACE_SPINNER,
   SEARCH_PLACE_SUCCESS,
   GO_TO_CURRENT_LOCATION,
} from '../Context/reducer/types';
import axios from 'axios';
import SearchList from '../components/SearchList';

const Search = ({ navigation, route }) => {
   const { appState, dispatch } = useContext(Store);
   const {
      sourceInput,
      distinationInput,
      searchPlaceSpinner,
      searchPlaces,
   } = appState;

   useEffect(() => {}, []);
   const onInputTextChange = async text => {
      dispatch({ type: SEARCH_PLACE_SPINNER, payload: true });

      try {
         const searchPlaces = await axios.get(
            `https://api.tomtom.com/search/2/search/${text}.json?key=GUAgTrOQSUlci1zLwJPrRrX5aX9pjN0P&language=en-US&limit=10&countrySet=EG`
         );

         if (searchPlaces.status === 200) {
            const {
               data: { results },
            } = searchPlaces;
            dispatch({
               type: SEARCH_PLACE_SUCCESS,
               payload: results,
            });
         }
      } catch (error) {
         console.log('search places erro');
      }
   };
   const onSearchItemPressed = async (locationName, { lat, lon }) => {
      const {
         params: { startLocation, endLocation },
      } = route;
      if (startLocation) {
         await dispatch({
            type: SOURCE_INPUT_CHANGE,
            payload: {
               name: locationName,
               latitude: lat,
               longitude: lon,
            },
         });
         navigation.goBack();
      } else {
         await dispatch({
            type: DISTINATION_INPUT_CHANGE,
            payload: {
               name: locationName,
               latitude: lat,
               longitude: lon,
            },
         });
         navigation.goBack();
      }
   };
   const onCurrentLocationPressed = async () => {
      await dispatch({ type: GO_TO_CURRENT_LOCATION });
      navigation.goBack();
   };
   return (
      <View style={styles.container}>
         <SearchInput
            inputProps={{ autoFocus: true, onChangeText: onInputTextChange }}
            showLeftIcon
            leftIconName="keyboard-backspace"
            onLeftIconPressed={() => navigation.goBack()}
            searchBarContainerStyle={styles.input}
            showRightLoading={searchPlaceSpinner}
            indicatorColor={'#000'}
         />
         <SearchList
            searchList={searchPlaces}
            onSearchItemPressed={onSearchItemPressed}
            onCurrentLocationPressed={onCurrentLocationPressed}
         />
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
