import React, { useEffect, useState, useRef } from "react";
import "./DatePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { targetDateUpdatedApi } from "../../../actions/GetAllTabledataApiAction";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import moment from "moment";
import CalenderIcon from "../../../assets/manualEditTable/CalenderIcon.svg";
import { getAllDataInTableByProject } from "../../../actions/GetAllTabledataApiAction";

const DatePickerCalendar = (props) => {
  const ref = useRef();
  const [date, setDate] = useState(props.data);
  const [isDateSelect, setIsDateSelect] = useState(false);
  const dispatch = useDispatch();
  const selectedProjectName = useSelector(
    (store) => store.getAllAccountByDomainState?.selectedProjectName
  );

  const projectDetailId = useSelector(
    (store) => store.getAllTableDataApiState?.getTableDataByproject?._id
  );
  useEffect(() => {
    setDate(props.data);
  }, [props.data]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutsideRole = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideRole, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideRole, true);
    };
  }, []);

  const handleClick = (date) => {
    date.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (date) => {
    setIsOpen(!isOpen);
    setDate((prev) => {
      return date;
    });
    setIsDateSelect((prev) => true);
  };
  // console.log(
  //   props.data,
  //   "dhhjj",
  //   isDateSelect,
  //   moment(props.data).format("DD/MM/yyyy")
  // );
  useEffect(() => {
    async function setDate() {
      if (isDateSelect) {
        let userId = props.id?.toString();
        let projectId = projectDetailId?.toString();
        let bodyData = {
          user: userId,
          projectId: projectId ? projectId : props.rowId,
          targetDate: date,
          assignKey: props.assignKey,
        };
        targetDateUpdatedApi(bodyData);
        await getAllDataInTableByProject(dispatch, selectedProjectName);

        props.refreshPage();
      }
    }
    setDate();
  }, [date]);

  return (
    <div className="DatePickerMainDiv" ref={ref}>
      <button
        className={`input-button ${
          props.extrastyleButton ? props.extrastyleButton : ""
        }`}
        onClick={handleClick}
      >
        <p>{date ? moment(date).format("DD MMM yyyy") : "Select Date"}</p>

        <img src={CalenderIcon} alt="CalenderIcon" />
      </button>
      {isOpen && (
        <DatePicker
          selected={date ? new Date(date) : new Date()}
          onChange={(date) => handleChange(date)}
          dateFormat="dd/MM/yyyy"
          className="extraClassDatePicker"
          calendarClassName="extraClassCalendar"
          minDate={new Date()}
          inline
        />
      )}
    </div>
  );
};

export default DatePickerCalendar;
