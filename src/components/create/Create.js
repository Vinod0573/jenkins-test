import React from "react";
import "./Create.css";

function Create(props) {
  return (
    <div>
      <div className={` ${props.styleCreateDiv ? props.styleCreateDiv : "Create-div"}`}>
        <span 
        className={` ${props.stylePlusSign ? props.stylePlusSign : "plusSign"}`}
        >+</span>
        <p 
        className={` ${props.styleCreateName ? props.styleCreateName : "createName"}`}
        >Create {props.createName}</p>
      </div>
    </div>
  );
}

export default Create;
