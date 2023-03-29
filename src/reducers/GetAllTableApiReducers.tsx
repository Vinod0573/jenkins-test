import { Reducer } from 'redux';
import { getAllTableData,getAllTableDataApiActions} from "../actions/GetAllTabledataApiAction";

export interface getAllTableDataApiState{
    getAllTableBydomain: string;
    getAllTableDatabyProject: string;
    dataFilterParameters: {[key: string]: string []};
    dataFilterParametersMU: {[key: string]: string []}; // Manual Unique (MU)
    showManualUniqueModal: boolean;
    tableDataByProject: {[key:string]: any};
    tableDataByProjectMU: {[key:string]: any}; 
}

const initialgetAllTableApiState: getAllTableDataApiState = {
    getAllTableBydomain: '' ,
    getAllTableDatabyProject: "",
    dataFilterParameters: {},
    dataFilterParametersMU: {},
    showManualUniqueModal: false,
    tableDataByProject: {},
    tableDataByProjectMU: {},
};

export const getAllTableDataApiReducer: Reducer<getAllTableDataApiState,getAllTableDataApiActions> = (
    state = initialgetAllTableApiState,
    action
  ) => {
    switch (action.type) {
      case getAllTableData.GETALLTABLE_API : {
        return {
          ...state,
          getAllTableData :action.payload
        };
      }

      case getAllTableData.SET_TABLE_DATA : {
        if(action.payload.results){
          return {
            ...state,
            getAllTableData: action.payload
          }
        } 
        else {
          const tableData = {...action.payload};
          tableData.results = action.payload.result;
          delete tableData.result;
          return {...state, getAllTableData: tableData};
        }
      }
      case getAllTableData.SET_TABLE_DATA_BY_PROJECT : {
        const key = state.showManualUniqueModal ? "tableDataByProjectMU" : "tableDataByProject";
        if(action.payload.results){
          return {
            ...state,
            [key]: action.payload
          }
        } 
        else {
          const tableData = {...action.payload};
          tableData.results = action.payload.result;
          delete tableData.result;
          return {...state, [key]: tableData};
        }
      }

      case getAllTableData.GET_ALL_TABLEDATA_BY_PROJECT : {
        return {
          ...state,
          getTableDataByproject :action.payload
        };
      }
  
      case getAllTableData.SET_FILTER_PARAMETERS: {
        const key = state.showManualUniqueModal ? "dataFilterParametersMU" : "dataFilterParameters"
        let filterParameters : {[key: string]: any};   //type
        filterParameters = {...state[key], 
          [action.payload.columnName]: action.payload.selectedData
        }
        if(action.payload.selectedData?.length === 0){
          delete filterParameters[action.payload.columnName];
        }
        return {...state, [key]: filterParameters,}
      }
      case getAllTableData.CLEAR_ALL_FILTER_PARAMETERS: {
        return {...state, dataFilterParameters: {}}
      }
      case getAllTableData.CLEAR_ALL_FILTER_PARAMETERS_MU: {
        return {...state, dataFilterParametersMU: {}}
      }

      case getAllTableData.SET_SHOW_MANUAL_UNIQUE_MODAL: {
        return {...state, showManualUniqueModal: action.payload }
      }
      
      default:
        return state;
    }
  };