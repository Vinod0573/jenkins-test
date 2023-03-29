import { Reducer } from "redux";
import {
  getAllAccountByDomain,
  getAllAccountByDomainApiActions
} from "../actions/GetAllAccountbyDomianApiAction";

export interface getAllAccountbyDomainApiState {
  getAllAccountBydomain: string;
  projectsList: string;
  projectDetail: string;
}
const initialselectedDomainApiState: getAllAccountbyDomainApiState = {
  getAllAccountBydomain: "",
  projectsList: "",
  projectDetail:""
};


export const getAllAccountByDomainApiReducer: Reducer<
  getAllAccountbyDomainApiState,
  getAllAccountByDomainApiActions
> = (state = initialselectedDomainApiState, action) => {
  switch (action.type) {
    case getAllAccountByDomain.GETALLACCOUNTBYDOMAIN_API: {
      return {
        ...state,
        getAllAccountBydomain: action.payload,
      };
    }
    case getAllAccountByDomain.GET_ALL_PROJECTS_BY_ACCOUNT: {
      return {
        ...state,
        projectsList: action.payload,
      };
    }
    case getAllAccountByDomain.SET_SELECTED_PROJECT:{
      return {
        ...state,
        projectDetail: action.payload,
      };
    }
    case getAllAccountByDomain.SET_SELECTED_PROJECT_NAME:{
        return {
          ...state,
          selectedProjectName: action.payload,
        };
      }
    default:
      return state;
  }
};
