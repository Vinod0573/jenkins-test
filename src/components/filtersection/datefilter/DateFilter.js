import React, { useState, useEffect } from "react";
import "./DateFilter.css";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as filterAction from "../../../../actions/filterActions";

import moment from "moment";
import { format, addDays, daysInWeek } from "date-fns";


import CalendarSaarthi from "../../../calendarsaarthi/CalendarSaarthi";
import { toConvertCalendarDate } from "../../../../Utilities/ConvertTime";
import CalendarIcon from "../../../../assets/calendarIcon.svg";

const DateFilter = (props) => {
  const [dateToBeFilter, setDateToBeFilter] = useState();
  const [dateSelected, setDateSelected] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dateRange, setDateRange] = useState([
    {
      startDate: props.fixedDate?props.startDate:new Date(),
      endDate: props.fixedDate?props.endDate:new Date(),
      key: "selection",
    },
  ]);
  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const dateFormater = (item) => {
    setDateRange([item.selection]);
  };

  // To Close the calendar
  const handleClickCloseCalendar = (value) => {
    let temp = false;
    setIsCalendarOn((previousState) => false);
    return false;
  };

  useEffect(() => {
    handleSumitDateRange();
  },[])

  const handleSumitDateRange = async () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      let today = moment(new Date()).format("YYYY-MM-DD");
      const from_date = dateRange[0].startDate
        ? format(new Date(dateRange[0].startDate), "yyyy-MM-dd")
        : today;
      const to_date = dateRange[0].endDate
        ? format(new Date(dateRange[0].endDate), "yyyy-MM-dd")
        : today;
      props.setDateFilterData({ fromDate: from_date, toDate: to_date });
      setIsCalendarOn((previousState) => false);
      // props.loading(true)
    }
  };
//${props.filterData ? "" : "disablePointerEventUniversaljp"}

  return (
    <>
      <div className="dateFilterWrapper">
        {props.dateHeader && props.dateHeader=="show"?"":<div className="dfTitle">
          <p>Date Range:</p>
        </div>}
        <div>
          <div className="fdCalendarArea">
            <div
              className={`fdCalendarDateRange`}
            >
              {/* &nbsp;&nbsp; */}
              <span
                className="dateRangeArea"
                style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                onClick={() => {
                  setIsCalendarOn((previousState) => !previousState);
                }}
              >
                {" "}
                {props.filteredDateRangeData?.fromDate
                  ? moment(props.filteredDateRangeData.fromDate).format("DD MMM YY")
                  : toConvertCalendarDate(dateRange[0].startDate)}{" "}
                -{" "}
                {props.filteredDateRangeData?.toDate
                  ? moment(props.filteredDateRangeData.toDate).format("DD MMM YY")
                  : toConvertCalendarDate(dateRange[0].endDate)}{" "}
              </span>
              &nbsp;&nbsp;
              <span
                onClick={() => {
                  setIsCalendarOn((previousState) => !previousState);
                }}
              >
                {" "}
                <img src={CalendarIcon} style={{width:"15px"}} alt="Calendar Icon" />
              </span>{" "}
            </div>
            {isCalendarOn && (
              <CalendarSaarthi
                dateRange={dateRange}
                dateFormater={(value) => dateFormater(value)}
                handleClickCloseCalendar={(value) =>
                  handleClickCloseCalendar(value)
                }
                handleSumitDateRange={() => handleSumitDateRange()}
                extraStyle="cal-pos"
                calenderOpen={isCalendarOn}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer.filteredDateRangeData,
    filterData: state.filterReducer.filterData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
