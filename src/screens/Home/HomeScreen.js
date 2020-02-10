import React, { useEffect, useContext, useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   Platform,
   ActivityIndicator,
   UIManager,
   LayoutAnimation,
   Animated,
} from 'react-native';
import MapView, { Marker, Polyline, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Store } from '../../Context/reducer/ContextStore';
import {
   GET_PERMISSION_ERROR,
   ASSIGN_LOCATION,
} from '../../Context/reducer/types';
import { SearchInput } from '../../components/SearchInput';

const { width, height } = Dimensions.get('window');
const ASPECT_RETIO = width / height;
const latitudeDelta = 0.9968723;
const longitudeDelta = latitudeDelta * ASPECT_RETIO;
const GEOLOCATION_OPTIONS = {
   enableHighAccuracy: true,
   timeout: 20000,
   maximumAge: 1000,
};

const Home = ({ route, navigation }) => {
   const { appState, dispatch } = useContext(Store);
   const { initialRegion, searchedEndRegion, searchedStartRegion } = appState;
   const markerRef = useRef();
   const [Coordinate, setCoordinate] = useState(new AnimatedRegion({}));

   useEffect(() => {
      getLocationAsync();
      return () => {
         getLocationAsync().remove();
      };
   }, []);

   const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         dispatch({ type: GET_PERMISSION_ERROR });
      }

      await Location.watchPositionAsync(GEOLOCATION_OPTIONS, locationChanged);
   };

   const locationChanged = ({ coords: { latitude, longitude } }) => {
      const newRegion = {
         longitude,
         latitude,
         longitudeDelta,
         latitudeDelta,
      };
      setCoordinate(newRegion);
      if (newRegion !== Coordinate) {
         Coordinate.timing(newRegion, 500).start();
      }
      dispatch({
         type: ASSIGN_LOCATION,
         payload: newRegion,
      });
   };

   if (!initialRegion.hasOwnProperty('latitude')) {
      return (
         <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} animating color={'#000'} />

            <Text style={{ color: '#444' }}>Getting your location</Text>
         </View>
      );
   } else {
      return (
         <View style={styles.container}>
            <View style={styles.mapStyle}>
               <MapView
                  style={{ flex: 1 }}
                  showUserLocation
                  followUserLocation
                  loadingEnabled
                  showsUserLocation={true}
                  region={initialRegion}>
                  {searchedStartRegion.hasOwnProperty('latitude') &&
                     searchedEndRegion.hasOwnProperty('latitude') && (
                        <Polyline
                           coordinates={[
                              searchedStartRegion,
                              searchedEndRegion,
                           ]}
                           strokeColor={'#bf8220'}
                           strokeWidth={5}
                        />
                     )}
                  <Marker.Animated coordinate={Coordinate} ref={markerRef} />
               </MapView>
            </View>

            <View style={styles.inputsContainer}>
               <SearchInput
                  placeholder={'Where are you ?'}
                  showLeftIcon
                  leftIconName="source-commit-start-next-local"
                  inputProps={{
                     value: searchedStartRegion.name,
                     onFocus: () =>
                        navigation.navigate('Search', { startLocation: true }),
                  }}
               />
               <SearchInput
                  placeholder={'Where you want to go ?'}
                  showLeftIcon
                  leftIconName="map-marker"
                  inputProps={{
                     value: searchedEndRegion.name,
                     onFocus: () =>
                        navigation.navigate('Search', {
                           endLocation: true,
                        }),
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
      ...StyleSheet.absoluteFillObject,
   },
});

export default Home;
