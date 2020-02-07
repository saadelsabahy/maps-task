import { GET_PERMISSION_ERROR, ASSIGN_LOCATION } from './types';

export const initialState = {
   region: {},
   permissionError: '',
};

export const homeReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_PERMISSION_ERROR:
         return {
            ...state,
            permissionError: 'Permission to access location was denied',
         };
         break;
      case ASSIGN_LOCATION:
         return { ...state, region: { ...state.region, ...payload } };
      default:
         return state;
   }
};
