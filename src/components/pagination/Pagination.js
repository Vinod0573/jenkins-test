import React ,{useState} from 'react';
import ReactPaginate from "react-paginate";
import "./Pagination.css"

import LeftMoveIcon from "./moveLeftIcon.svg";
import RightMoveIcon from "./moveRightIcon.svg";


const Pagination = (props) =>{

  //const [ pageCount, setPageCount] = useState();
  const handlePageClick = (e) =>{
  
    const tempPage = e.selected;
    props.handleClickPageNo(tempPage)
  }



    return(
        <>
                <ReactPaginate
                  previousLabel={<img src={LeftMoveIcon} alt="jai"/>}
                  nextLabel={<img src={RightMoveIcon} alt="jai"/>}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={props.totalNoOfPage}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  forcePage={props.getPage}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={props.forcePage -1}
                />
        </>
    )
}


export default Pagination;
