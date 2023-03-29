import React from 'react'
import "./Warn.css"


export default function Warn(props) {
  return (
    <div className='warn-wrapper'>
        <div className='warn-wrapper-inner'>
        {props?.crossicon&&<img className='crospopsds' src={props?.crossicon}  onClick={props?.onClick} alt="cross"/>}
        <div className='metawarndiv'>
    
            <img  src={props?.icon} alt="+" />
            <p className='metawarn'style={props.color?{color:props?.color}:{}}>{props.text}</p>
        </div>
        </div>
    </div>
  )
}

//<Warn icon={redPlus} text={"You Must select type of meta data"} color={"red"} crossicon={cross} onClick={fun} />