import { Reducer } from 'redux';
import { accountNameActionTypes, accountNameAction } from "../actions/AccountNameActions";

export interface accountNameState {
    accountName: string;
}

const initialAccountNameState: accountNameState = {
    accountName: ''
};

export const accountNameReducer: Reducer<accountNameState, accountNameAction> = (
    state = initialAccountNameState,
    action
  ) => {
    switch (action.type) {
      case accountNameActionTypes.ACCOUNT_NAME: {
        return {
          ...state,
          accountName:action.payload
        };
      }
      default:
        return state;
    }
  };
