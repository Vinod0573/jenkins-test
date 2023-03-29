import { Reducer } from 'redux';
import { getAllAccountByAccountName, getAllAccountByAccountNameApiActions} from "../actions/GetAllAccountByAccountNameApiAction";

export interface getAllAccountbyAccountNameApiState{
    getAllAccountBydomain: string;
}

const initialselectedAccountApiState: getAllAccountbyAccountNameApiState = {
    getAllAccountBydomain: ''
};

export const getAllAccountByAccountNameApiReducer: Reducer<getAllAccountbyAccountNameApiState,getAllAccountByAccountNameApiActions> = (
    state = initialselectedAccountApiState,
    action
  ) => {
    switch (action.type) {
      case getAllAccountByAccountName.GETALLACCOUNTBYACCOUNTNAME_API : {
        return {
          ...state,
          getAllAccountByAccountName:action.payload
        };
      }
      default:
        return state;
    }
  };