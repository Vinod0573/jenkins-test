import React from 'react';
import "./DndProgress.css";
import  cross from "../../assets/projectPageIcon/cross.svg"
import { useSelector } from 'react-redux';

export default function DndProgress(props) {

  return (
    <div  className='dnd-progress-wrapper'>
      <p className='uploadingcs'>{props.detail}</p>
     <div className='file-progress-txt'>
     <p className='fn'>{props?.filename}</p>
     <img src={cross} alt=""  style={{cursor:"pointer"}} onClick={()=>props.clearData()}/>
     </div>
    <div className='progress-parent' >
        <div className='progress' style={{width:props?.progress}}></div>
    </div>
    </div>
  )
}