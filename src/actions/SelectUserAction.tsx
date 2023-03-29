import { ActionCreator, Dispatch } from "redux";
// import { IUserData, IUserState } from "../reducers/SetUserReducer";

export enum userActionTypes {
  CHECK = "CHECK",
}

export interface userCheckAction {
  type: userActionTypes.CHECK;
  payload: {
    id: any;
  };
}

export type userCheckActions = userCheckAction;

export const check = async (dispatch: any, id: any) => {
  // console.log(id, "temp");
  dispatch({
    type: userActionTypes.CHECK,
    payload: {
      id,
    },
  });
};
