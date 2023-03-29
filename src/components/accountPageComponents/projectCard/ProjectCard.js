import React from "react";
import "./ProjectCard.css";
import ReactTooltip from "react-tooltip";

function ProjectCard(props) {
  return (
    <div
      className="ProjectCard-Wrapper"
      onClick={() => props.getSelectedProject(props.projectData)}
    >
      <div className="projectCard">
        <div className="TotalProjectDiv">Total Projects: {props.projects}</div>
        <h3 className={`headingProject`} data-tip data-for="registerTip">{props.Name}
        {/* {props.Name?.length > 20  ?
        <ReactTooltip id="registerTip" place="top" effect="solid">
            {props.Name}
          </ReactTooltip> : ""
       }       */}
        </h3>
        <div className="TotalMemberDiv">
          <p className="TotalMemberpara">Total Members : {props.projectData.users?.length}</p>
        </div>
      </div>
    </div>

  );
}

export default ProjectCard;
