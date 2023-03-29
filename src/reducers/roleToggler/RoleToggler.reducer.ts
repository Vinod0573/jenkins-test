import * as types from "./roleToggler";
import roleTogglerActionTypes from "./actionTypes";
// import { Type } from "react-tooltip"
const initialState: types.RoleTogglerState = {
  role: "Data Annotator",
};
function roleTogglerReducer(
  state = initialState,
  action: any
): types.RoleTogglerState {
  switch (action.type) {
    case roleTogglerActionTypes.SET_ROLE_FOR_CURRENT_USER: {
      return { ...state, role: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}
export default roleTogglerReducer;
