import { number } from "prop-types";
import { Reducer } from "redux";
import {
  AssignTaskTypes,
  AssignTaskActions,
} from "../actions/ManualUniqueAction";

export interface AssignTaskType {
  id: any;
  value: any;
}

export interface AssignTaskState {
  data: AssignTaskType[];
}

const initialState: AssignTaskState = {
  data: [{ id: "", value: "" }],
};

export const assignTaskReducer: Reducer<AssignTaskState, AssignTaskActions> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case AssignTaskTypes.ASSIGN_TASK: {
      return { ...state, data: action.payload.data };
    }

    default: {
      return state;
    }
  }
};
