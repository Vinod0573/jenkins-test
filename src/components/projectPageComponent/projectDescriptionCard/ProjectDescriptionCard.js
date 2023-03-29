import React from "react";
import "./ProjectDescriptionCard.css";
import EditIcon from "../../../assets/projectPageIcon/EditIcon.svg";
import ChunkingIcon from "../../../assets/projectPageIcon/Chunking.svg";
import TranscriptIcon from "../../../assets/projectPageIcon/TranscriptIcon.svg";
import ActiveHumanIcon from "../../../assets/projectPageIcon/ActiveHumanIcon.svg";
import ActiveAIIcon from "../../../assets/projectPageIcon/ActiveAIIcon.svg";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

function ProjectDescriptionCard(props) {
  const goToEdit = (e) => {
    e.stopPropagation();
    props.getDetails(props.projectData.name);
  };
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }
  return (
    <div className="ProjectDescriptionCardWrapper">
      <div className="totalMemberdiv">
        {props.projectData.agent == "AI" ? (
          <img src={ActiveAIIcon} alt="AI" />
        ) : (
          <img src={ActiveHumanIcon} alt="Human" />
        )}
        <p className="memberTitle">
          Total Members: {props.projectData.users?.length}
        </p>
      </div>
      <div className="bodySection">
        <p className="Heading" data-tip data-for={props.projectData.name}>
          Project {props.index + 1}: {props.projectData.name}
          {props.projectData?.name.length > 16 ? (
            <ReactTooltip
              id={props.projectData.name}
              place="top"
              effect="solid"
              backgroundColor="#DDECFF"
              textColor="#0174FF"
              borderColor="#0174FF"
              border="1px"
            >
              <p>{props.projectData.name}</p>
            </ReactTooltip>
          ) : (
            ""
          )}
        </p>

        <p className="description">{props.projectData.description}</p>
      </div>

      <div className="projectCardFooter">
        <div onClick={(e) => goToEdit(e)}>
          <img className="editProjectIcon" src={EditIcon} alt="Edit" />
        </div>

        <div className="chunkingFooterDiv">
          {props.projectData.projectGoal.includes("Chunking") &&
          props.projectData.projectGoal.includes("Transcript") ? (
            <>
              <img
                data-tip
                data-for="footerIcon"
                className="chunkingProjectIcon"
                src={ChunkingIcon}
                alt="Chunking"
              />
              <img
                data-tip
                data-for="footerIcon"
                className="transcriptProjectIcon"
                src={TranscriptIcon}
                alt="Transcript"
              />
            </>
          ) : props.projectData.projectGoal.includes("Chunking") ? (
            <img
              data-tip
              data-for="footerChunkingIcon"
              className="chunkingProjectIcon"
              src={ChunkingIcon}
              alt="Chunking"
            />
          ) : props.projectData.projectGoal.includes("Transcript") ? (
            <img
              data-tip
              data-for="footerTranscriptIcon"
              className="transcriptProjectIcon"
              src={TranscriptIcon}
              alt="Transcript"
            />
          ) : (
            ""
          )}

          {props.projectData.projectGoal.includes("Transcript") &&
          props.projectData.projectGoal.includes("Chunking") ? (
            <ReactTooltip
              id="footerIcon"
              place="bottom"
              effect="solid"
              backgroundColor="#DDECFF"
              textColor="#0174FF"
              borderColor="#0174FF"
              border="1px"
            >
              <p> Project Type: Chunking and Transcript</p>
            </ReactTooltip>
          ) : props.projectData.projectGoal.includes("Chunking") ? (
            <ReactTooltip
              id="footerChunkingIcon"
              place="bottom"
              effect="solid"
              backgroundColor="#DDECFF"
              textColor="#0174FF"
              borderColor="#0174FF"
              border="1px"
            >
              <p> Project Type: Chunking</p>
            </ReactTooltip>
          ) : props.projectData.projectGoal.includes("Transcript") ? (
            <ReactTooltip
              id="footerTranscriptIcon"
              place="bottom"
              effect="solid"
              backgroundColor="#DDECFF"
              textColor="#0174FF"
              borderColor="#0174FF"
              border="1px"
            >
              <p> Project Type: Transcript</p>
            </ReactTooltip>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDescriptionCard;
