import { Reducer } from "redux";
import { userActionTypes, userCheckActions } from "../actions/SelectUserAction";

export interface IUserData {
  id: any;
}

export interface IUserState {
  data: IUserData;
}

const initialState: IUserState = {
  data: {
    id: [],
  },
};

export const userReducer: Reducer<IUserState, userCheckActions> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case userActionTypes.CHECK: {
      return { ...state, data: action.payload };
    }

    default: {
      return state;
    }
  }
};
