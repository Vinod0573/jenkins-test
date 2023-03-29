import React from "react";

import "./ErrorMessage.css";
import ErrorIcon from "./ErrorIcon.svg";

const ErrorMessage = (props) => {
  return (
    <>
      <div
        className={`errorTopDiv ${props.extraClass ? props.extraClass : ""}`}
        data-testid="extra-class"
      >
        <img src={ErrorIcon} alt="Error Icon" />
        &nbsp;&nbsp;
        <p>{props.errorMessage}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
