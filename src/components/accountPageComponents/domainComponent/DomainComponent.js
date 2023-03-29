import React from "react";
import './DomainComponent.css'

function DomainComponent(props) {
  return (
    <div className="DomainComponentDiv-wrapper">
      <div 
      className = {`${props.extraStyleOuter ? props.extraStyleOuter : "DomainComponentDiv"} ${
        props.HighLight ? "highlight" : null
      } ${props.disabled?"disabled-com":""}`}>
        <div 
          className= {`${props.extraStyleIcon ? props.extraStyleIcon : "logoDiv"}`}
         >
          <div>
          <img 
          className= {`${props.extraStyleIconImg ? props.extraStyleIconImg: "logoImg"}`}
          
          src={props.Icon}></img> 
          </div>
        </div>
        <div className = {`containDiv ${props.HighLight ? "highlightWhite" : null}`}
          >
          <p>{props.Name}</p>
        </div>
      </div>
    </div>
  );
}

export default DomainComponent;
