import { Reducer } from 'redux';
import {pushAccountPage, pushAccountActions  } from "../actions/PushToAccountPage";

export interface pushAccountState {
    pushState: boolean;
}

const initialAccountNameState: pushAccountState = {
    pushState: false
};

export const PushAccountPageReducer: Reducer<pushAccountState , pushAccountActions > = (
    state = initialAccountNameState,
    action
  ) => {
    switch (action.type) {
      case pushAccountPage.PUSH_PAGE : {
        return {
          ...state,
          pushState:action.payload
        };
      }
      default:
        return state;
    }
  };