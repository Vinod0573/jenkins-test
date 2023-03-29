import React from "react";
import "./SelectDomain.css";
import { useHistory } from "react-router-dom";
function SelectDomain(props) {
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  return (
    <div className="selectdomainWrapper">
      <div className="selectDomain-div">
        <div className="domain-logo-div">
          <img src={props.Icon}></img>
        </div>
        <div className="domain-name-div">
          <p> {props.DomainName}</p>
        </div>
      </div>
    </div>
  );
}

export default SelectDomain;
