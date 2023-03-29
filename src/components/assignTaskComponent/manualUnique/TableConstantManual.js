import React, { useEffect, useState } from "react";
import SortIcon from "../../assets/tableIcon/SortIcon.svg";
import editIcon from "../../assets/tableIcon/editIcon.svg";
import DropdownIcon from "../../assets/adduserformIcon/dropdownIcon.svg";
import Toggle from "../../components/toggle/Toggle";

function TableConstant(
  handleEdit,
  selectedDropdown,
  selectUnAssign,
  handleClickUpdateUserDetail,
  setHitApi
) {
  const handleEditt = (e, id) => {
    handleEdit(e, id);
  };
  const handleClickUpdateUserDetailLocal = (index) => {
    handleClickUpdateUserDetail(index);
  };

  return [
    {
      title: Name,
      render: (rowData) => {
        return <span>{rowData.name} </span>;
      },
    },

    {
      title: Email,
      render: (rowData) => {
        return <span>{rowData.email}</span>;
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
          <p>Language</p>
          <img
            src={DropdownIcon}
            className="clickAbleCursorPointerU"
            alt="Dropdown Icon"
          />
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
      title: "Role",
      render: (rowData) => {
        return <span>{rowData.role}</span>;
      },
    },
    {
      title: "Project",
      render: (rowData) => {
        return (
          <div>
            {" "}
            <span>{rowData.projects[0]}</span>
            {(selectedDropdown === "Manual-Unique" ||
              selectUnAssign === "Manual-Unique") &&
            rowData.role === "Campaign Analyst" &&
            rowData?.isActive === true ? (
              <input
                type="number"
                style={{ width: "20%", marginLeft: "5%" }}
                onChange={(e) => handleEditt(e, rowData._id)}
                min="0"
              />
            ) : null}{" "}
          </div>
        );
      },
    },
    {
      title: "Assigned Task",
      render: (rowData) => {
        return (
          <div>
            {" "}
            <span>{rowData.projects[0]}</span>
            {(selectedDropdown === "Manual-Unique" ||
              selectUnAssign === "Manual-Unique") &&
            rowData.role === "Campaign Analyst" &&
            rowData?.isActive === true ? (
              <input
                type="number"
                min="0"
                style={{ width: "20%", marginLeft: "5%" }}
                onChange={(e) => handleEditt(e, rowData._id)}
              />
            ) : null}{" "}
          </div>
        );
      },
    },
    {
      title: "Delete",
      render: (rowData) => {
        return (
          <div>
            {" "}
            <span>{rowData.projects[0]}</span>
            {(selectedDropdown === "Manual-Unique" ||
              selectUnAssign === "Manual-Unique") &&
            rowData.role === "Campaign Analyst" &&
            rowData?.isActive === true ? (
              <input
                type="number"
                style={{ width: "20%", marginLeft: "5%" }}
                onChange={(e) => handleEditt(e, rowData._id)}
                min="0"
              />
            ) : null}{" "}
          </div>
        );
      },
    },
  ];
}

export default TableConstant;
