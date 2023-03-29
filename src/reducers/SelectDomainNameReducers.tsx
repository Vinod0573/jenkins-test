import { Reducer } from 'redux';
import { domainNameActionTypes, domainNameAction} from "../actions/SelectDomainNameAction";

export interface domainNameState {
    domainName: string;
}

const initialDomainNameState: domainNameState = {
    domainName: ''
};

export const domainNameReducer: Reducer<domainNameState, domainNameAction> = (
    state = initialDomainNameState,
    action
  ) => {
    switch (action.type) {
      case domainNameActionTypes.DOMAIN_NAME: {
        return {
          ...state,
          domainName:action.payload
        };
      }
      default:
        return state;
    }
  };