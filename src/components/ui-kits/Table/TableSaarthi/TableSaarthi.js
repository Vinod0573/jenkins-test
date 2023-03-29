import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TableSaarthi.css";
import LoaderSaarthi from "../../../../components/loader/Loader";

const TableSaarthi= (
  { cols, data, bordered, hoverable, striped, isDark, pageNo, isLoading,extraTableClass,extraClassTableThead
  ,extraClassTBody, extraOuterTable, noData ,manualUnique}

) => {
  const [tableData, setTableData] = useState();
   //isLoading=null;

  useEffect(() => {
    setTableData((prev) => data);
  }, [data]);
  console.log(manualUnique?manualUnique:"")
  return (
    <div
     className={`table-responsive ${extraOuterTable ? extraOuterTable : "table-responsiveMain"}`}
    >
      <table
        className={`table ${bordered ? "table-bordered" : "table-borderless"} ${
          hoverable && "table-hover"
        } ${striped && "table-striped"} ${isDark && "table-dark"}
        ${extraTableClass?  extraTableClass : ""}
        `}
      >

        <thead
          className={`saarthiTableThead ${
            extraClassTableThead ? extraClassTableThead : ""
          }`}
        >


          <tr>
            {cols.map((headerItem, index) => (
             <th key={index}><div className="titleName">{headerItem.title}</div></th>
            ))}
          </tr>


        </thead>

        {isLoading ? (
          <tbody
          className={`${
            extraClassTBody ? extraClassTBody : ""
          }`}
          >
            {tableData && tableData.map((item, index) => (
              <tr key={index}>
                {cols.map((col, key) => (
                  <td key={key}>{col.render(item, index, pageNo)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )

: (
    <>
    <div style={{display:"none"}}>
    <LoaderSaarthi />
    </div>

    </>
  )

        }
      </table>
      {isLoading && tableData?.length === 0 && (
        noData? noData :
        <div style={{ textAlign: "center", position: "relative", top: "40%" }}>
         { "No Data Found"}
        </div>
      )}
      {!isLoading && (
        <div style={{ marginLeft: "Auto", marginRight: "auto" }}>
          <LoaderSaarthi />
        </div>
      )}
 </div>
  );
};

TableSaarthi.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  striped: PropTypes.bool,
  isDark: PropTypes.bool,
};

TableSaarthi.defaultProps = {
  bordered: true,
  hoverable: false,
  striped: false,
  isDark: false,
};

export default TableSaarthi;


