import { Reducer } from 'redux';
import { loginActionTypes, loginActions } from "../actions/loginActions";

export interface loginState {
  logInData: any;
    image: string;
    loading: boolean;
    errorMessage: string;
}

const initialLoginState: loginState = {
   logInData: [],
    image: '',
    loading: false,
    errorMessage: ''
};

export const loginReducer: Reducer<loginState, loginActions> = (
    state = initialLoginState,
    action
  ) => {
    switch (action.type) {
      case loginActionTypes.ALL_LOGIN_DATA : {
        return {
          ...state,
          logInData:action.payload
        };
      }
      case loginActionTypes.LOAD_HOME: {
        return {
          ...state,
          loading: action.loading
        };
      }
      case loginActionTypes.ERROR: {
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
