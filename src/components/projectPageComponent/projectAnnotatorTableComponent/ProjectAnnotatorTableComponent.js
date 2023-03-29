import TableSaarthi from "../../ui-kits/Table/TableSaarthi/TableSaarthi";
import Pagination from "../../pagination/Pagination";
export const ProjectAnnotatorTable = (props) => {
  return (
    <div className="TableDiv">
      {/* <TableSaarthi
        data={props.data}
        cols={props.cols}
        isLoading={props.isLoading}
        extraClassTableThead={props.extraClassTableThead}
        extraClassTBody={props.extraClassTBody}
        extraOuterTable={props.extraOuterTable}
        noData={props.noData}
        pageNo={props.pageNo}
      />
      {props.isLoading && props.tableDataByStore?.length > 0 && (
        <Pagination
          forcePage={props.pageNo}
          totalNoOfPage={props.totalPageNo}
          handleClickPageNo={props.handleClickPageNo}
        />
      )} */}
      AnnotatorTable
    </div>
  );
};
