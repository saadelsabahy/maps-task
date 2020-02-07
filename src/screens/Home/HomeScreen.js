import React, { useEffect, useReducer } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   Platform,
   ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { homeReducer, initialState } from './HomeReducer';
import { GET_PERMISSION_ERROR, ASSIGN_LOCATION } from './types';
import { SearchInput } from '../../components/SearchInput';

const { width, height } = Dimensions.get('window');
const ASPECT_RETIO = width / height;
const latitudeDelta = 0.022 * ASPECT_RETIO;
const longitudeDelta = 0.0421 * ASPECT_RETIO;
const Home = ({ navigation }) => {
   const [homeState, dispatch] = useReducer(homeReducer, initialState);
   const {
      region,
      region: { longitude, latitude },
   } = homeState;

   useEffect(() => {
      getLocationAsync();
   }, []);

   const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         dispatch({ type: GET_PERMISSION_ERROR });
      }

      let {
         coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      console.log(latitude, longitude);

      dispatch({
         type: ASSIGN_LOCATION,
         payload: { longitude, latitude, longitudeDelta, latitudeDelta },
      });
   };

   if (!region.hasOwnProperty('latitude')) {
      return (
         <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} animating color={'#529EFE'} />

            <Text style={{ color: '#444' }}>Getting your location</Text>
         </View>
      );
   } else {
      return (
         <View style={styles.container}>
            <View style={styles.mapStyle}>
               <MapView
                  style={{ flex: 1 }}
                  showsUserLocation={true}
                  initialRegion={region}>
                  <Marker coordinate={{ longitude, latitude }} />
               </MapView>
            </View>
            <View style={styles.inputsContainer}>
               <SearchInput
                  placeholder={'Where are you ?'}
                  showLeftIcon
                  leftIconName="source-commit-start-next-local"
                  inputProps={{
                     onFocus: () => navigation.navigate('Search'),
                  }}
               />
               <SearchInput
                  placeholder={'Where you want to go ?'}
                  showLeftIcon
                  leftIconName="map-marker"
                  inputProps={{
                     onFocus: () => navigation.navigate('Search'),
                  }}
               />
            </View>
         </View>
      );
   }
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputsContainer: {
      width: '100%',
      position: 'absolute',
      top: 25,
   },
   mapStyle: {
      width: '100%',
      height: '100%',
   },
});

export default Home;
