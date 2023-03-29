import React, { useState, useEffect } from "react";
import "./StatusFilter.css";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as filterAction from "../../../../actions/filterActions";

import MultiSelectDropdown from "../../../widlyuse/multiselectdropdown/MultiSelectDropdown";

const StatusFilter = (props) => {
  const [statusToBeFilter, setStatusToBeFilter] = useState();
  const [statusSelected, setStatusSelected] = useState();


      // To get selected value and set to reducer form multiselect
  const getFilteredData = (value) => {
    if(value?.length <=0 || !value){
      props.setStatusFilterData(null);
  }
  else{
    props.setStatusFilterData(value);
  }
    //props.setStatusFilterData(value);
    if(props.allSelectedFilterData){
      let forDeletion = statusToBeFilter;
      let tempAllFiltered = props.allSelectedFilterData;
      tempAllFiltered = tempAllFiltered.filter(item => !forDeletion.includes(item))
      let temp = [...tempAllFiltered,...value];
      if(temp?.length > 0){
        props.setAllSelectedFilterData(temp);
      }
      else{
        props.setAllSelectedFilterData(null);
      }
    //   let temp = [...props.allSelectedFilterData,...value]
    //   let unique = [...new Set(temp)];
    // props.setAllSelectedFilterData(unique);
  }else{
    if(value?.length <=0 || !value){
      props.setAllSelectedFilterData(null);
    }
    else{
      props.setAllSelectedFilterData(value);

    }
  } 
    //console.log(value);
    setStatusSelected((prev) => value);
  };


  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
    setStatusSelected(prev => value);
  }

  useEffect(() => {
    let temp = props.filteredStatusData;
    updateMultiSelectedData(temp);
  },[props.filteredStatusData])

  const options = {
    imgSrcRight: "",
    imgSrcleft: "",
  };

//   useEffect(() => {
//     if (props.filterData && props.filterData?.status) {
//       setStatusToBeFilter((prev) => Object.values(props.filterData?.status));
//     }
//   }, [props.filterData]);
  return (
    <>
      <div className={`statusFilterWrapper ${props.hideFilterList?.includes('Flowtype') ?"hidePointerEventUniversaljp":""}`}>
        <div className="sfTitle">
          <p>Status:</p>
        </div>
        <div>
          <MultiSelectDropdown
            toBeFilterData={statusToBeFilter}
            options={options}
            extraSelectedClass="extraSelectedClass"
            getFilteredData={(value) => getFilteredData(value)}
            key="statusMultiSelectOne"
            isDisable={true}
            selectedDataOutside={statusSelected}
            />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filterData: state.filterReducer.filterData,
    filteredStatusData: state.filterReducer.filteredStatusData,
    allSelectedFilterData: state.filterReducer.allSelectedFilterData,
    disableFilterList: state.filterReducer.disableFilterList,
    hideFilterList: state.filterReducer.hideFilterList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
