import { Reducer } from 'redux';
import { lodderUpadateActionTypes, lodderUpdateActions } from "../actions/LodderUpdate";

export interface lodderUpdateState {
  lodderupdate: any;
   
}

const initialLoginState: lodderUpdateState = {
    lodderupdate: false
   
};

export const lodderUpdateReducer: Reducer<lodderUpdateState, lodderUpdateActions> = (
    state = initialLoginState,
    action
  ) => {
    switch (action.type) {
      case lodderUpadateActionTypes.LODDER_UPDATE : {
        return {
          ...state,
          lodderupdate:action.payload
        };
      }
     
      default:
        return state;
    }
  };