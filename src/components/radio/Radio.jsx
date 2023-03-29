import React, { useEffect, useState } from "react";
import "./Radio.css";
import cross from "../../assets/cross.svg";
import { set } from "date-fns";
export default function Radio(props) {
  const [act, setAct] = useState(false);


    //set default value from props

    //set form out
    useEffect(()=>{
      setAct((prev) => props?.valueSetOut);
    },[props?.valueSetOut])

    useEffect(()=>{

      setAct((prev) => props.defaultValue);


  },[])


  // handle select radio
  const handleClick = (e) => {

    setAct((prev) => !prev);
    //send data outside
   if(props?.sendOut)props?.sendOut({text:props.text,state:!act});
  };

  return (
    <div className="radio-wrapper">
      <div className="radio-wrapper-inner">
        <div
          style={{ cursor: "pointer" }}
          className={`${act ? "aradio" : "iradio"}`}
          data-testid="radio-test-id"
          onClick={()=>{
            if(!props.disabled){
              handleClick()
            }
          }}
        ></div>
        {props?.icon && <img className="iconc" src={props?.icon} alt="" />}
        {props?.text && <p className="radio-text">{props?.text}</p>}
      </div>
    </div>
  );
}


//example   <Radio text={"Conversation"} icon={haha}  defaultValue={false} valueSetOut={convs} sendOut={setOutCC}/>