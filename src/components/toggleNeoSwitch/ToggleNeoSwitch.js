import React, { useState, useEffect } from "react";
import openSwitch from "../../assets/openswitch.svg";

import inprogressSwitch from "../../assets/inprogressswitch.svg";

import doneSwitch from "../../assets/doneswitch.svg";
import "./ToggleNeoSwitch.css";
function ToggleNeoSwitch(props) {
  const [toggleMessage, setToggleMessage] = useState([]);
  const [propsIsActive, setPropsIsActive] = useState(props.isActive);
  useEffect(() => {
    console.log(props.isActive);
    setPropsIsActive((prev) => props.isActive);
  }, [props.isActive]);
  useEffect(() => {

    setToggleMessage((prev) => props.status);
  }, [props.status]);

  useEffect(() => {
    setToggleMessage(props.ToggleData);
  }, [props.ToggleData]);

  return (
    <div className={`neo-switch ${propsIsActive ? "" : "in-active"}`}>
      <input
        type="checkbox"
        id="toggle-input"
        checked={propsIsActive}
        onChange={(e) => {
          if (toggleMessage[0] != "Open" && toggleMessage[0] != "Done") {
            props.setToggleData(e.target.checked);
          }
          else{
            props.setToggleData(e.target.checked);
          }
        }}
      />
      <label
        htmlFor="toggle-input"
        id="toggle-input-data"
        className="knobs-data"
      >
        <span>
          <text className={propsIsActive ? "active" : "inactive"}>
            {propsIsActive ? toggleMessage[1] : toggleMessage[0]}
          </text>
          {propsIsActive ? (
            <img src={doneSwitch} />
          ) : toggleMessage[0] == "Inprogress" ? (
            <img src={inprogressSwitch} />
          ) : (
            <img src={openSwitch} />
          )}
        </span>
      </label>
    </div>
  );
}

export default ToggleNeoSwitch;
