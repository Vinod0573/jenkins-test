import React, { useEffect, useRef, useState } from "react";
import SortIcon from "../../assets/tableIcon/SortIcon.svg";
import SortAscIcon from "../../assets/tableIcon/ascIcon.svg";
import SortDescIcon from "../../assets/tableIcon/descIcon.svg";
import editIcon from "../../assets/tableIcon/editIcon.svg";
import DropDownIcon from "../../assets/tableIcon/dropDownIconWhite.svg";
import tickIcon from "../../assets/summarysection/tickBlack.svg";
import closeIcon from "../../assets/summarysection/crossBlack.svg";
import { RSA_NO_PADDING } from "constants";
import ReactTooltip from "react-tooltip";
import Toggle from "../../components/toggle/Toggle";
import "./TableConstant.css";
import MultiSelectDropDown from "../../components/multiselectsimple/MultiSelectSimple";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../actions/SelectUserAction";
import { el } from "date-fns/locale";
function TableConstant(
  handleEdit,
  handleClickUpdateUserDetail,
  handleMessage,
  handleAddUser,
  nameSortingOrder,
  handleNameSortingOrder,
  emailSortingOrder,
  handleEmailSortingOrder,
  handleDropDownClick,
  dropDownOptions,
  dropDownVisible,
  handleDropDownSelectChange,
  handleDropdownTickClick,
  handleDropdownCloseClick,
  isLoading,
  tableDataByStore,
  isItFilteredData
) {
  const dropdownSelectedOptions = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParameters
  );

  const dispatch = useDispatch();

  const checkBoxState = useSelector((store) => store.IUserState);

  const dropdownRef = useRef();

  const shouldTableIconsBeVisible =
    isLoading && (tableDataByStore?.length !== 0 || isItFilteredData);

  const handleEditt = (e, id) => {
    // console.log("bsjbbbsxbkabx", id);
    let tempArr = checkBoxState.data.id;
    if (tempArr) {
      const index = tempArr.indexOf(id);
      // console.log(index, "id");
      if (index > -1) {
        tempArr.splice(index, 1);
      } else {
        tempArr.push(id);
      }
    }
    // tempArr.push(id);
    // console.log(tempArr, "temp");
    handleEdit(e, id);
    check(dispatch, tempArr);
  };

  const handleClickUpdateUserDetailLocal = (index) => {
    handleClickUpdateUserDetail(index);
  };
  const showmessage = (temp) => {
    handleMessage(temp);
  };
  const showAddUser = (temp) => {
    handleAddUser(temp);
  };
  // close dropdown when clicked outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.classList.contains("dropDownIcon")
      ) {
        handleDropDownClick(null);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return [
    // {
    //     title: " ",
    //     render: rowData => {
    //       return <span><input type="checkbox"  className='inputAddUser'
    //          onClick={(e) => {
    //               handleEditt(e , rowData?._id)
    //               console.log("clicked" ,e, rowData?._id)

    //                   if(e.target.checked === true && rowData.role !== "Campaign Analyst" ){
    //                     // showmessage(true)
    //                     showAddUser(true)
    //                   }
    //                   else if(rowData.role !== "Campaign Analyst" && e.target.checked === false){
    //                     //  showmessage(false)
    //                      showAddUser(false)
    //                   }

    //          }}
    //        /> </span>
    //     },
    //   },
    {
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              paddingRight: "45%",
            }}
            className="titlePara"
          >
            Name
          </p>
          {shouldTableIconsBeVisible && (
            <img
              src={
                (nameSortingOrder === null && SortIcon) ||
                (nameSortingOrder === "asc" && SortAscIcon) ||
                (nameSortingOrder === "desc" && SortDescIcon)
              }
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
              onClick={handleNameSortingOrder}
            />
          )}
        </div>
      ),
      render: (rowData) => {
        return (
          <div className={"nameCheckBoxDiv"}>
            <span>
              <input
                type="checkbox"
                className="inputAddUser"
                // id={checkBoxState?.id}
                checked={
                  checkBoxState?.data?.id.includes(rowData?._id) ? true : false
                  // checkBoxState.checked
                }
                onClick={(e) => {
                  handleEditt(e, rowData?._id);
                  // console.log("clicked", e, e.target.checked, rowData?._id);
                  // console.log("ff", checkBoxState?.data.id);
                  if (e.target.checked === true) {
                    // showmessage(true)
                    showAddUser(true);
                  } else if (e.target.checked === false) {
                    //  showmessage(false)
                    showAddUser(false);
                  }
                }}
              />
            </span>
            <span>{rowData.name} </span>
          </div>
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
        >
          <p
            style={{
              paddingRight: "45%",
            }}
            className="titlePara"
          >
            Email
          </p>
          {shouldTableIconsBeVisible && (
            <img
              src={
                (emailSortingOrder === null && SortIcon) ||
                (emailSortingOrder === "asc" && SortAscIcon) ||
                (emailSortingOrder === "desc" && SortDescIcon)
              }
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
              onClick={handleEmailSortingOrder}
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
                src={DropDownIcon}
                className="clickAbleCursorPointerU dropDownIcon"
                alt="DropDownIcon"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDropDownClick(e)}
              />
            )}
          </div>
          {dropDownVisible === "language" && (
            <div className="multiSelectDropDownContainer" ref={dropdownRef}>
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
                defaultSelected={dropdownSelectedOptions.language}
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
        // let data = rowData.language[0]+"+"+ (rowData.language.length-1)

        return <span>{data}</span>;
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
            data-column="role"
          >
            <p
              style={{ paddingRight: "10px", whiteSpace: "nowrap" }}
              className="titlePara"
            >
              Role
            </p>

            {/* {shouldTableIconsBeVisible && (
              <img
                src={DropDownIcon}
                className="clickAbleCursorPointerU dropDownIcon"
                alt="DropDownIcon"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDropDownClick(e)}
              />
            )} */}
          </div>
          {dropDownVisible === "role" && (
            <div className="multiSelectDropDownContainer" ref={dropdownRef}>
              <MultiSelectDropDown
                options={dropDownOptions.role}
                extended={true}
                crossIcon={closeIcon}
                okIcon={tickIcon}
                onClickCross={() => handleDropdownCloseClick("role")}
                onClickOk={() => handleDropdownTickClick()}
                setDataOut={(selectedData) =>
                  handleDropDownSelectChange(selectedData, "role")
                }
                defaultSelected={dropdownSelectedOptions.role}
                extraClassWrapper="extraClassMultiSelectWrapper"
              />
            </div>
          )}
        </div>
      ),
      render: (rowData) => {
        return <span>{rowData.role}</span>;
      },
    },
    // {
    //   title: (
    //     <div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-around",
    //           alignItems: "center",
    //           width: "100%",
    //         }}
    //         data-column="project"
    //       >
    //         <p style={{ paddingRight: "10px", whiteSpace:"nowrap" }} >
    //           Project
    //         </p>
    //         {/* <img
    //           src={DropDownIcon}
    //           className="clickAbleCursorPointerU dropDownIcon"
    //           alt="DropDownIcon"
    //           style={{ cursor: "pointer" }}
    //           onClick={(e) => handleDropDownClick(e)}
    //         /> */}
    //       </div>
    //       {dropDownVisible === "project" &&
    //       <div  className="multiSelectDropDownContainer" ref={dropdownRef}>
    //       <MultiSelectDropDown
    //         options={dropDownOptions.project}
    //         setDataOut={(selectedData) => handleDropDownSelectChange(selectedData,"project")}
    //         defaultSelected={dropDownSelectedOptions.project}
    //         extraClassWrapper="extraClassMultiSelectWrapper"
    //       />
    //       </div>}
    //     </div>

    //   ),
    //   render: rowData => {
    //     return <span>{rowData.projects[0]}</span>;
    //   },
    // },
    {
      title: "Status",
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
                        /> */}
              <Toggle
                label={index}
                active={rowData?.isActive}
                id={rowData?._id}
                extraClassToggleBtn="extraClassToggleBtn"
                extraClassToggleWrapper="extraClassToggleWrapper"
              />
            </div>
            <img
              src={editIcon}
              style={{ cursor: "pointer" }}
              onClick={() => handleClickUpdateUserDetailLocal(index)}
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
            />
          </div>
        );
      },
    },
  ];
}

export default TableConstant;
