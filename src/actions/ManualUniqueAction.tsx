import { ActionCreator, Dispatch } from "redux";

export enum AssignTaskTypes {
  ASSIGN_TASK = "ASSIGN_TASK",
}

export interface AssignTaskAction {
  type: AssignTaskTypes.ASSIGN_TASK;
  payload: [];
}

export type AssignTaskActions = AssignTaskAction;

export const setAssignTask = async (dispatch: any, data: any) => {
  dispatch({
    type: AssignTaskTypes.ASSIGN_TASK,
    payload: {
      data,
    },
  });
};
