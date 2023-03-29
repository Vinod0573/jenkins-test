import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { lodderUpdateState } from '../reducers/LodderUpdatesReducer';

export enum lodderUpadateActionTypes {
    LODDER_UPDATE = 'LODDER_UPDATE',
    
}

export interface lodderUpadateAction {
    type: lodderUpadateActionTypes.LODDER_UPDATE;
    payload: any;
}


export type lodderUpdateActions = lodderUpadateAction ;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getLodderUpdate  = async (data : any ,dispatch:Dispatch) => {
        try {
             dispatch({ type: lodderUpadateActionTypes.LODDER_UPDATE ,payload: data });
            
        } catch (err) {
        console.error(err);
      
        };
    
};
