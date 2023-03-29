import React from 'react'
import "./NoDataModal.css"

function NoDataModal(props) {
  return (
    <div className='noDataModalComponentWrapper'>
        <div className= {props.extraClassOuterDiv ?props.extraClassOuterDiv : "nodataModal-Div" }>
            <p className= {props.extraClassPara ? props.extraClassPara :'msgNoData-p' }> {props.message}</p>
            {props.img?
            <img src ={props.img} className= {props.extraClassImg ? props.extraClassImg :"nodataModalImg-img"}></img>
            : ""
           }       
        </div>
    </div>
  )
}




export default NoDataModal