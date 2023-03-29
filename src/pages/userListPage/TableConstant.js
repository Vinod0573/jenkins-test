import React, { useEffect, useRef, useState } from "react";
import "./TableConstant.css";
import SortIcon from "../../assets/tableIcon/SortIcon.svg";
import editIcon from "../../assets/tableIcon/editIcon.svg";
import AscIcon from "../../assets/tableIcon/ascIcon.svg";
import DescIcon from "../../assets/tableIcon/descIcon.svg";
import DropDownIcon from "../../assets/tableIcon/dropDownIconWhite.svg";
import { RSA_NO_PADDING } from "constants";
import Toggle from "../../components/toggle/Toggle";
import MultiSelectDropDown from "../../components/multiselectsimple/MultiSelectSimple";
import { useSelector } from "react-redux";
import tickIcon from "../../assets/summarysection/tickBlack.svg";
import closeIcon from "../../assets/summarysection/crossBlack.svg";

function TableConstant(
  handleClickUpdateUserDetail,
  sortingVariables,
  handleOnClickSorting,
  handleDropDownClick,
  dropDownOptions,
  dropDownVisible,
  handleDropDownSelectChange,
  tableDataByStore,
  handleDropdownTickClick,
  handleDropdownCloseClick,
  isLoading,
  isItFilteredData
) {
  const dropDownSelectedOptions = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParameters
  );
  const [iconsType, setIconsType] = useState({
    userName: SortIcon,
    name: SortIcon,
    email: SortIcon,
  });
  const dropdownRef = useRef();

  const shouldTableIconsBeVisible =
    isLoading && (tableDataByStore?.length !== 0 || isItFilteredData);

  useEffect(() => {
    setIconsType((prev) => {
      return { userName: SortIcon, name: SortIcon, email: SortIcon };
    });
  }, [tableDataByStore]);
  useEffect(() => {
    const icon = sortingVariables.order === "asc" ? AscIcon : DescIcon;
    let newIconsType = { userName: SortIcon, name: SortIcon, email: SortIcon };
    if (sortingVariables.column === "userName") {
      newIconsType = { userName: icon, name: SortIcon, email: SortIcon };
    } else if (sortingVariables.column === "name") {
      newIconsType = { userName: SortIcon, name: icon, email: SortIcon };
    } else if (sortingVariables.column === "email") {
      newIconsType = { userName: SortIcon, name: SortIcon, email: icon };
    }
    setIconsType((prev) => newIconsType);
  }, [sortingVariables]);

  const handleClickUpdateUserDetailLocal = (index) => {
    handleClickUpdateUserDetail(index);
    // console.log("pressingg....");
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
    //   title: (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-around",
    //         alignItems: "center",
    //         width: "100%",
    //       }}
    //       data-column="userName"
    //     >
    //       <p style={{ paddingRight: "10px", whiteSpace:"nowrap" }} className="titlePara" >
    //         User Name
    //       </p>
    //       <img
    //         src={iconsType.userName}
    //         className="clickAbleCursorPointerU"
    //         alt="Sort Icon"
    //         style={{ cursor: "pointer" }}
    //         onClick={(e) => handleOnClickSorting(e)}
    //       />
    //     </div>
    //   ),
    //     render: rowData => {
    //       return <span>{rowData.userName}</span>;
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
              src={iconsType.name}
              style={{ cursor: "pointer" }}
              className="clickAbleCursorPointerU"
              alt="Sort Icon"
              onClick={(e) => handleOnClickSorting(e)}
            />
          )}
        </div>
      ),
      render: (rowData) => {
        // console.log(rowData)
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
          <p style={{ paddingRight: "10px" }} className="titlePara">
            Email
          </p>
          {shouldTableIconsBeVisible && (
            <img
              src={iconsType.email}
              style={{ cursor: "pointer" }}
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
                defaultSelected={dropDownSelectedOptions.language}
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
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Role</p>
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
                defaultSelected={dropDownSelectedOptions.role}
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
            data-column="project"
          >
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              Project
            </p>
            {/* <img
                src={DropDownIcon}
                className="clickAbleCursorPointerU dropDownIcon"
                alt="DropDownIcon"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDropDownClick(e)}
              /> */}
          </div>
          {dropDownVisible === "project" && (
            <div className="multiSelectDropDownContainer" ref={dropdownRef}>
              <MultiSelectDropDown
                options={dropDownOptions.project}
                setDataOut={(selectedData) =>
                  handleDropDownSelectChange(selectedData, "project")
                }
                defaultSelected={dropDownSelectedOptions.project}
                extraClassWrapper="extraClassMultiSelectWrapper"
              />
            </div>
          )}
        </div>
      ),
      render: (rowData) => {
        return <span>{rowData.projects[0]}</span>;
      },
    },
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
                        //setToggleData={() => { getToggleData() }}
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
