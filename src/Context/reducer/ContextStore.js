import React, { useReducer } from 'react';
import { AnimatedRegion } from 'react-native-maps';

export const Store = React.createContext();

import {
   GET_PERMISSION_ERROR,
   ASSIGN_LOCATION,
   SOURCE_INPUT_CHANGE,
   DISTINATION_INPUT_CHANGE,
   SEARCH_PLACE_SPINNER,
   SEARCH_PLACE_FAILED,
   SEARCH_PLACE_SUCCESS,
   GO_TO_CURRENT_LOCATION,
} from './types';

const initialState = {
   initialRegion: {},
   searchedStartRegion: { name: '' },
   searchedEndRegion: { name: '' },
   permissionError: '',
   searchPlaceSpinner: false,
   searchPlaces: [],
};

const appReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_PERMISSION_ERROR:
         return {
            ...state,
            permissionError: 'Permission to access location was denied',
         };
         break;
      case ASSIGN_LOCATION:
         return { ...state, initialRegion: payload };
         break;
      case SOURCE_INPUT_CHANGE:
         return {
            ...state,
            searchedStartRegion: { ...state.initialRegion, ...payload },
         };
         break;
      case GO_TO_CURRENT_LOCATION:
         return {
            ...state,
            searchedStartRegion: {
               ...state.initialRegion,

               name: 'Your location',
            },
         };
         break;
      case DISTINATION_INPUT_CHANGE:
         return {
            ...state,
            searchedEndRegion: { ...state.endRegion, ...payload },
         };
         break;
      case SEARCH_PLACE_SPINNER:
         return { ...state, searchPlaceSpinner: payload };
         break;
      case SEARCH_PLACE_SUCCESS:
         return { ...state, searchPlaces: payload, searchPlaceSpinner: false };
         break;
      case SEARCH_PLACE_FAILED:
         return { ...state, searchPlaceSpinner: false };
         break;
      default:
         return state;
   }
};

export const StoreProvider = props => {
   const [appState, dispatch] = useReducer(appReducer, initialState);
   return (
      <Store.Provider value={{ appState, dispatch }}>
         {props.children}
      </Store.Provider>
   );
};
