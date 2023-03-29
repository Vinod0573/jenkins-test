import * as types from "./roleToggler";

import roleTogglerActionTypes from "./actionTypes";
export function switchRole(role: types.role) {
  return {
    type: roleTogglerActionTypes.SET_ROLE_FOR_CURRENT_USER,
    payload: role,
  };
}
