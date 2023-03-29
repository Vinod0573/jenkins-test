import React from "react";
import "./TotalCountCard.css";
import InfoIconLight from "../../../assets/projectPageIcon/InfoIconLight.svg";
import ToolTip from "../../toolTipComponent/ToolTipComponent";
import { useHistory } from "react-router-dom";

function TotalCountCard(props) {
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const ToolTipCard = props.isCount ? (
    <div>
      <p>
        {props.Name}:{props.count}
      </p>
    </div>
  ) : (
    <div>
      <div>
        <p>In Progress:{props.inProgress}</p>
      </div>
      <div>
        <p>Completed:{props.completed}</p>
      </div>
    </div>
  );

  return (
    <div className="TotalCountCardWrapper">
      <div className="TotalCountCardDiv">
        <div className="TopCardDiv">
          <div className="IconDiv">
            <img className="iconImgTotal" src={props.icon}></img>
          </div>
          <div className="HeadindDiv">
            <p>{props.Name}</p>
          </div>
          <div className="ToolTipDiv">
            {/* <ToolTip
              about={ToolTipCard}
              extraTextDivStylingClass="extraTextDivStylingClass"
              extraTextStylingClass="extraTextStylingClass"
            /> */}
            <img className="InfoIcon" src={InfoIconLight} alt="info card"></img>
          </div>
        </div>
        <div className="containerDiv">
          {props.isCount ? (
            <div className="CountDiv">
              <p>{props.count}</p>
            </div>
          ) : (
            <div className="StatusDiv">
              <div className="StatusProgressDiv">
                <p className="SubHeading">In-Progress</p>
                <p className="CountStyling ProgressBg">{props.inProgress}</p>
              </div>
              <div className="StatusCompleteDiv">
                <p className="SubHeading">Completed</p>
                <p className="CountStyling CompleteBg">{props.completed}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalCountCard;
