import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as filterAction from "../../../actions/filterActions";

import "./FilterSection.css";

import LanguageFilter from "./languagefilter/LanguageFilter";
import ApplyIcon from "../../../assets/applyIcon.svg";
import FilterIcon from "../../../assets/filter.svg";
import StatusFilter from "./statusfilter/StatusFilter";
import CallDurationFilter from "./calltimefilter/CallDurationFilter";
import DateFilter from "./datefilter/DateFilter";
import FilterTages from "../filtertags/FilterTages";

// import Tags from '../../Tags/Tags';

const FilterSection = (props) => {
  const accountName = sessionStorage.getItem("accountName");

  const [isApplyFilter, setIsApplyFilter] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  // To get all selected filter from store
  useEffect(() => {
    //console.log(props.allSelectedFilterData);
    if (props.allSelectedFilterData) {
      setSelectedFilters((prev) => props.allSelectedFilterData);
      //props.setApplyFilter(false);
    }
  }, [props.allSelectedFilterData]);


  // To get all types filters from store
  useEffect(() => {
    props.getFilterDetails(accountName);
  }, [accountName]);

  const handleApplyFilter = () => {
    setIsApplyFilter((prev) => true);
    props.setApplyFilter(true);
   props.setApplyFilterTrue(true);
  };

// const clearFilters = () => {
//   props.setAllSelectedFilterData(null);
//   props.setLanguageFilterData(null);
//   props.setDispositionFilterData(null);
//   props.setStatusFilterData(null);
//   props.setRegionFilterData(null);
//   props.setCallDurationFilterData(null);
//   props.setFlowTypeFilterData(null);
//   props.setCampaignFilterData(null);
//   props.setApplyFilter(true);
// }

  return (
    <>
      <div className="fsfilterSectionWrapper">
        <div>
          <div className="fsfilterSection">
            {/* <div className="fsfilterButtonArea">
              <div
                className={`fsmore-filters ${
                  props.allSelectedFilterData ? "" : "disablePointerEventUniversaljp"
                }`}
                onClick={() => handleApplyFilter()}
              >
                <img src={FilterIcon} alt="filter icon" />
                <span>View Results</span>
              </div>
            </div> */}
            <div className="fSSelectFilter">
              <div>
                <DateFilter id="dateRangeOne" />
              </div>
              <div>
                <LanguageFilter id="languageFilterOne" />
              </div>
                <div>
                  <StatusFilter id="statusFilterOne"/>
                </div>
            </div>
            <div className="fsfilterTagsArea">
            <FilterTages/>
            {props.allSelectedFilterData && (
              <div className="applyRemoveFilter">
               <div className="fsfilterButtonArea">
              <div
                className={`fsmore-filters ${
                  props.allSelectedFilterData ? "" : "disablePointerEventUniversaljp"
                }
                ${
                  props.filteredApplyData ? "disablePointerEventUniversaljp" : ""
                }
                `}
                onClick={() => handleApplyFilter()}
              >
                <img src={ApplyIcon} alt="filter icon" />
                <span>Apply</span>
              </div>
            </div>
            </div>
            )}
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filterData: state.filterReducer.filterData,
    filteredApplyData: state.filterReducer.filteredApplyData,
    allSelectedFilterData: state.filterReducer.allSelectedFilterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);
