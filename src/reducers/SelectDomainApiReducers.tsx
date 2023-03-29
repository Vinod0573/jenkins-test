import { Reducer } from 'redux';
import { selectDomainApiActionTypes, selectDomainApiActions} from "../actions/SelectDomainApiAction";

export interface selectDomainApiState{
    selectDomainApi: string;
}

const initialselectedDomainApiState: selectDomainApiState = {
    selectDomainApi: ''
};

export const selectDomainApiReducer: Reducer<selectDomainApiState,selectDomainApiActions> = (
    state = initialselectedDomainApiState,
    action
  ) => {
    switch (action.type) {
      case selectDomainApiActionTypes.SELECT_DOMAIN_API: {
        return {
          ...state,
          selectDomainApi:action.payload
        };
      }
      default:
        return state;
    }
  };