import React, { useEffect, useState, useRef } from "react";
import Moment from "moment";
import editIcon from "../../assets/tableIcon/editIcon.svg";
import DropdownIcon from "../../assets/adduserformIcon/dropdownIcon.svg";
import tickIcon from "../../assets/summarysection/tickBlack.svg";
import closeIcon from "../../assets/summarysection/crossBlack.svg";
import { RSA_NO_PADDING } from "constants";
import Toggle from "../../components/toggle/Toggle";
import DatePickerCalendar from "../../components/ui-kits/datePickerComponent/DatePicker";
import MultiSelectDropDown from "../../components/multiselectsimple/MultiSelectSimple";
import "./TableConstant.css";
import { useSelector, useDispatch } from "react-redux";
import CalenderIcon from "../../assets/manualEditTable/CalenderIcon.svg";

import { setAssignTask } from "../../actions/ManualUniqueAction";
import { CLIENT_RENEG_LIMIT } from "tls";
function TableConstants(
  handleEdit,
  selectedDropdown,
  selectUnAssign,
  showManualUniqueModal,
  handleClickUpdateUserDetail,
  setHitApi,
  handleDropDownClick,
  dropDownOptions,
  dropDownVisible,
  handleDropDownSelectChange,
  sortingIconType,
  handleOnClickSorting,
  tableDataByStore,
  filterParameters,
  pageLimit,
  handleDropdownTickClick,
  handleDropdownCloseClick,
  showEditIcon,
  isLoading,
  isItFilteredData,
  assignTaskValue,
  currentTab,
  selectedProjectId,
  getUpdatedPage
) {
  const handleEditt = (e, id) => {
    handleEdit(e, id);
  };

  // console.log("ggtab", currentTab, assignTaskValue);

  const handleClickUpdateUserDetailLocal = (id) => {
    handleClickUpdateUserDetail(id);
  };
  const shouldTableIconsBeVisible =
    isLoading && (tableDataByStore?.length !== 0 || isItFilteredData);

  return [
    // {
    //     title: " ",
    //     render: rowData => {
    //       return <span><input type="checkbox"  className='inputAddUser'
    //          onClick={(e) => {
    //               handleEditt(e , rowData?._id)
    //               console.log("clicked" ,e, rowData?._id)

    //          }}
    //        /> </span>
    //     },
    //   },
    {
      title: "Sr. No.",
      render: (rowData, indx, pageNo) => {
        return (
          //console.log(rowData,indx,"hj"),
          <span>{(pageNo - 1) * pageLimit + indx + 1}.</span>
        );
      },
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
          data-column="name"
        >
          <p
            style={{
              paddingRight: "10px",
            }}
            className="titlePara"
          >
            Name
          </p>
          {shouldTableIconsBeVisible && (
            <img
              src={sortingIconType.name}
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
              onClick={(e) => handleOnClickSorting(e)}
            />
          )}
        </div>
      ),
      render: (rowData) => {
        return <span>{rowData.name} </span>;
      },
    },

    {
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
          data-column="email"
        >
          <p
            style={{
              paddingRight: "10px",
            }}
            className="titlePara"
          >
            Email
          </p>
          {shouldTableIconsBeVisible && (
            <img
              src={sortingIconType.email}
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
              onClick={(e) => handleOnClickSorting(e)}
            />
          )}
        </div>
      ),
      render: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },

    {
      title: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
            data-column="language"
          >
            <p
              style={{ paddingRight: "10px", whiteSpace: "nowrap" }}
              className="titlePara"
            >
              Language
            </p>
            {shouldTableIconsBeVisible && (
              <img
                src={DropdownIcon}
                className="clickAbleCursorPointerU dropDownIcon"
                alt="DropDownIcon"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDropDownClick(e)}
              />
            )}
          </div>
          {dropDownVisible === "language" && (
            <div className="multiSelectDropDownContainer">
              <MultiSelectDropDown
                options={dropDownOptions.language}
                extended={true}
                crossIcon={closeIcon}
                okIcon={tickIcon}
                onClickCross={() => handleDropdownCloseClick("language")}
                onClickOk={() => handleDropdownTickClick()}
                setDataOut={(selectedData) =>
                  handleDropDownSelectChange(selectedData, "language")
                }
                defaultSelected={filterParameters.language}
                extraClassWrapper="extraClassMultiSelectWrapper"
              />
            </div>
          )}
        </div>
      ),
      render: (rowData) => {
        let d =
          rowData?.language?.length > 1
            ? `+${rowData?.language?.length - 1}`
            : "";
        let c = rowData?.language?.length ? rowData.language?.[0] : "";
        let data = c + "" + d;
        return <span>{data}</span>;
      },
    },
    // {
    //   title: 'Role',
    //   render: rowData => {
    //     return <span>{rowData.role}</span>;
    //   },
    // },
    // {
    //   title: 'Project',
    //   render: rowData => {
    //     return <div> <span>{rowData.projects[0]}</span>
    //       {/* {(selectedDropdown === "Manual-Unique" || selectUnAssign === "Manual-Unique" ) && rowData.role==="Campaign Analyst" && rowData?.isActive === true ?<input type= "number" style={{width : "20%" , marginLeft: "5%"}}
    //        onChange = {(e) => handleEditt(e, rowData._id )}
    //        /> :null}  */}
    //     </div>;
    //   },
    // },
    {
      title: "Assigned Task",

      render: (rowData) => {
        const res = assignTaskValue?.data?.find(
          (m) => Object.keys(m)[0] == rowData?._id
        );
        const proj =
          rowData?.projectDetails?.length > 0
            ? rowData?.projectDetails?.filter((e) => e.id === selectedProjectId)
            : [];

        let assign = 0;
        if (proj.length > 0) {
          const user = currentTab === "Annotator" ? "Annotation" : "Review";
          assign = proj.filter((e) => e.assignKey === user)?.[0]?.assignedTask;
        }

        // }
        return (
          <div>
            <span>
              {(selectedDropdown === "Manual-Unique" ||
                selectUnAssign === "Manual-Unique") &&
              rowData?.isActive === true &&
              showManualUniqueModal ? (
                <input
                  type="number"
                  min="0"
                  style={{ width: "50%", marginLeft: "5%" }}
                  onChange={(e) => handleEditt(e, rowData._id)}
                  defaultValue={assign || 0}
                  // value={typeof res !== "undefined" && Object.values(res)[0]}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-", "."].includes(e.key) &&
                    e.preventDefault()
                  }
                  onWheel={(e) => {
                    return e.target.blur();
                  }}
                />
              ) : (
                assign || 0
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Timeline",
      render: (rowData, index) => {
        // console.log(rowData?.projectDetails[0]?.targetDate, "dhh");
        const proj =
          rowData?.projectDetails?.length > 0
            ? rowData?.projectDetails?.filter((e) => e.id === selectedProjectId)
            : [];

        let targetDate = undefined;
        if (proj.length > 0) {
          // console.log("assignxx", proj, currentTab);
          const user = currentTab === "Annotator" ? "Annotation" : "Review";
          targetDate = proj.filter((e) => e.assignKey === user)?.[0]
            ?.targetDate;
        }
        return (
          <>
            <div
            // style={{
            //   display: "flex",
            //   justifyContent: "space-around",
            //   alignItems: "center",
            //   cursor: "pointer",
            // }}
            >
              {/* <p>Select Date</p> */}

              <DatePickerCalendar
                id={rowData?._id}
                refreshPage={() => {
                  getUpdatedPage();
                }}
                data={targetDate}
                assignKey={currentTab === "QC" ? "Review" : "Annotation"}
                rowId={
                  rowData?.projectDetails?.length > 0
                    ? rowData?.projectDetails?.[0]?.id
                    : ""
                }
                extrastyleButton={"extraStyleButton"}
              />
              {/* <img src={CalenderIcon} alt="CalenderIcon" /> */}
            </div>
          </>
        );
      },
    },
    {
      title: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
            data-column="status"
          >
            <p
              style={{ paddingRight: "10px", whiteSpace: "nowrap" }}
              className="titlePara"
            >
              Status
            </p>
            {shouldTableIconsBeVisible && (
              <img
                src={DropdownIcon}
                className="clickAbleCursorPointerU dropDownIcon"
                alt="DropdownIcon"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDropDownClick(e)}
              />
            )}
          </div>
          {dropDownVisible === "status" && (
            <div className="multiSelectDropDownContainer status-column">
              <MultiSelectDropDown
                options={dropDownOptions.status}
                extended={true}
                crossIcon={closeIcon}
                okIcon={tickIcon}
                actLikeSingleSelect={true}
                onClickCross={() => handleDropdownCloseClick("status")}
                onClickOk={() => handleDropdownTickClick()}
                setDataOut={(selectedData) =>
                  handleDropDownSelectChange(selectedData, "status")
                }
                defaultSelected={filterParameters.status}
                extraClassWrapper="extraClassMultiSelectWrapper"
              />
            </div>
          )}
        </div>
      ),
      render: (rowData, index) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="toogleSwitch">
              {/* <ToggleNeoSwitch
                        isActiveTrue={rowData?.isActive}
                       // setToggleData={() => { getToggleData() }}
                        isActive= "Active"
                        />  */}
              <Toggle
                label={index}
                active={rowData?.isActive}
                id={rowData?._id}
                hit={setHitApi}
              />
            </div>
            {/* {(selectedDropdown === "Manual-Unique" || selectUnAssign === "Manual-Unique") && rowData?.isActive === true && showEditIcon ? "" :
            <img src={editIcon}
              style={{ cursor: "pointer" }}
              onClick={() => handleClickUpdateUserDetailLocal(index)}
              className="clickAbleCursorPointerU" alt="Sort Icon" />
          } */}
            {!showManualUniqueModal && (
              <img
                src={editIcon}
                style={{ cursor: "pointer" }}
                onClick={() => handleClickUpdateUserDetailLocal(rowData._id)}
                className="clickAbleCursorPointerU"
                alt="Sort Icon"
              />
            )}
          </div>
        );
      },
    },
  ];
}

export default TableConstants;
