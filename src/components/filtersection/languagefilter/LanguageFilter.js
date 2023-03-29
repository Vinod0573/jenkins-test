import React, { useState, useEffect } from "react";
import "./LanguageFilter.css";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as filterAction from "../../../../actions/filterActions";

import MultiSelectDropdown from "../../../widlyuse/multiselectdropdown/MultiSelectDropdown";

const LanguageFilter = (props) => {
  const [languageToBeeFilter, setLanguageToBeeFilter] = useState([]);
  const [languageSelected, setLanguageSelected] = useState();
  const [fixedData,setFixedData]=useState([])

// To Update the language to be selected
  useEffect(() => {
    if (props.filterLangData) {
      console.log(props.filterLangData,"language filter");
      let temp =Object.values(props.filterLangData)
      setLanguageToBeeFilter(prev  => temp);
      setFixedData(temp)
    }
  }, [props.filterLangData]);
  //console.log(props.filterData);

  // To get selected value and set to reducer form multiselect
  const getFilteredData = (value) => {
           if(value?.length <=0 || !value){
            props.setLanguageFilterData(null);
        }
        else{
          props.setLanguageFilterData(value);
        }
    console.log(value);

    if(props.allSelectedFilterData){
      let forDeletion = Object.assign([],languageToBeeFilter);
      //let forDeletion = ['jai' ,'om', 'ram', 'subu', 'pawan']
      let tempAllFiltered = props.allSelectedFilterData;
      tempAllFiltered = tempAllFiltered.filter(item => !forDeletion.includes(item))
      let temp = [...tempAllFiltered,...value];
      if(temp?.length > 0){
        props.setAllSelectedFilterData(temp);
      }
      else{
        props.setAllSelectedFilterData(null);
      }
  }else{
    if(value?.length <=0 || !value){
      props.setAllSelectedFilterData(null);
    }
    else{
      props.setAllSelectedFilterData(value);

    }
  }
    //console.log(value);
    setLanguageSelected(prev => value);

  };


  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
   // alert("yes");
    setLanguageSelected(prev => value);
    //props.setLanguageFilterData(value);
  }

  useEffect(() => {
    let temp = props.filteredLanguageData;
    updateMultiSelectedData(temp);
  },[props.filteredLanguageData])

console.log(languageToBeeFilter,props.filterLangData)

  const options = {
    imgSrcRight: "",
    imgSrcleft: "",
  };



  return (
    <>
      <div className={`languageFilterWrapper ${props.hideFilterList?.includes('Language') ?"hidePointerEventUniversaljp":""}`}>
        <div className="lfTitle">
          <p>Language:</p>
        </div>
        <div>
          <MultiSelectDropdown
            toBeFilterData={props.filterLangData  && Object.values(props.filterLangData)?.length>0?Object.values(props.filterLangData):[]}
            options={options}
            extraSelectedClass="extraSelectedClass"
            getFilteredData={(value) => getFilteredData(value)}
            key="languageMultiSelectOne"
            selectedDataOutside={languageSelected}
            isDisable={props.disableFilterList?.includes('Language') ? true : false}
            />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filterLangData: state.filterReducer.filterData?.language,
    disableFilterList: state.filterReducer.disableFilterList,
    filteredLanguageData: state.filterReducer.filteredLanguageData,
    allSelectedFilterData: state.filterReducer.allSelectedFilterData,
    hideFilterList: state.filterReducer.hideFilterList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageFilter);
