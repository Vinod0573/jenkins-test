import { Reducer } from 'redux';
import { homeActionTypes, homeActions } from '../actions/homeActions';

export interface homeState {
    image: string;
    loading: boolean;
    errorMessage: string;
}

const initialHomeState: homeState = {
    image: '',
    loading: false,
    errorMessage: ''
};

export const homeReducer: Reducer<homeState, homeActions> = (
    state = initialHomeState,
    action
  ) => {
    switch (action.type) {
      case homeActionTypes.HOME: {
        return {
          ...state,
          homeData:action.payload
        };
      }
      case homeActionTypes.LOAD_HOME: {
        return {
          ...state,
          loading: action.loading
        };
      }
      case homeActionTypes.ERROR: {
        return {
          ...state,
          errorMessage: action.errorMessage,
          image: ''
        }
      }
      default:
        return state;
    }
  };
