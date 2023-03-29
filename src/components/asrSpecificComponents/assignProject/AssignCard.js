import React from "react";
import "./AssignCard.css";
import ClockIcon from "../../../assets/AsrspecificViewIcons/ClockIcon.svg";
import SpeakerIcon from "../../../assets/AsrspecificViewIcons/SpeakerIcon.svg";
import TextIcon from "../../../assets/AsrspecificViewIcons/TextSymbolIcon.svg";
import headingIcon from "../../../assets/AsrspecificViewIcons/HeadingIcon.svg";
import ChunkingIcon from "../../../assets/projectPageIcon/Chunking.svg";
import TranscriptIcon from "../../../assets/projectPageIcon/TranscriptIcon.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProjectDetail } from "../../../actions/AssignProject";
import moment from "moment";
import { qc_icon } from "../../../assets/qc";
function onlyUnique(value, index, self) {
  return self.indexOf(value.id) === index;
}
function AssignCard(props) {
  let data = [
    {
      projectName: "A",
      date: "12 July 2021",
      name: "abcd",
      Icon: SpeakerIcon,
    },
    {
      projectName: "B",
      date: "12 July 2021",
      name: "xyz",
      Icon: TextIcon,
    },
  ];

  const history = useHistory();
  let role = useSelector((state) => state.RoleToggler.role);

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }
  let dispatch = useDispatch();

  const selectedProjectDetail = (e) => {
    setSelectedProjectDetail(e, dispatch, history, props.listData.accountName);
  };

  const userName = window.sessionStorage.getItem("name");
  // console.log(props.listData?.domainDetails?.blackImageUrl,"78")
  let accountDetails = [
    "Assigned Date",
    "Target Date",
    "Assigned By",
    // "Project",
  ];

  return (
    <div className="AssignCardWrapper">
      <div className="AssignCardOuterDiv">
        <div className="header">
          <div className="accountHeaderDiv">
            <div className="headingIcon">
              <img src={headingIcon}></img>
            </div>
            <div className="MainHeading">{props.listData.accountName}</div>
          </div>

          <div className="countDiv">
            <p className="countDivP1">
              {role === "Data Annotator"
                ? props.listData.conversationsCount?.data
                    ?.annotationDoneConversations || "0"
                : props.listData.conversationsCount?.data
                    ?.reviewDoneConversations || "0"}
            </p>
            <p className="countDivP2">
              /
              {role === "Data Annotator"
                ? props.listData.conversationsCount?.data
                    ?.annotationTotalConversation || "0"
                : props.listData.conversationsCount?.data
                    ?.reviewTotalConversation || " 0"}
            </p>
          </div>
        </div>
        <div className="accountDetailsTopDiv">
          <p className="projectHeading">Project</p>
          <div className="vl"></div>
          {accountDetails.map((each, i) => {
            return (
              <>
                <p className="accountDetailsHeading">{each}</p>
                {i !== 2 ? <div className="vl"></div> : ""}
              </>
            );
          })}
        </div>
        {props.listData.projects.flatMap((e, ind) => {
          if (e.assignKey === undefined) {
            return <div>.</div>;
          }
          if (role === "Quality Analyst") {
            if (e.assignKey !== "Review") {
              return [];
            }
          }
          if (role === "Data Annotator") {
            if (e.assignKey !== "Annotation") {
              return [];
            }
          }

          return [
            <div
              className="dataContainingDiv"
              onClick={() => {
                selectedProjectDetail(e);
              }}
            >
              <div className="first-sec">
                <p className="projNameHeading">{e?.project}</p>
              </div>
              <div className="dateDiv">
                {/* <img src={ClockIcon} alt="img"></img> */}
                <span className="spanText">
                  {/* {moment(e.assignedDate).format("L")} */}
                  {moment(e.assignedDate).format("DD MMM yyyy")}
                </span>
              </div>
              <div className="dateDiv">
                {/* <img src={ClockIcon} alt="img"></img> */}
                <span className="spanText">
                  {e?.targetDate
                    ? moment(e?.targetDate).format("DD MMM yyyy")
                    : "Date Not Set Yet"}
                </span>
              </div>
              {/* <div className="second-sec">
                <p className="paraHeading">
               { Math.round(((moment(e.targetDate).format("L"))-(moment(e.assignedDate).format("L")))/(1000*60*60*24))}
                </p>
              </div> */}
              <div className="third-sec">
                <p className="paraHeading">{e.assignedByName}</p>
              </div>
              {/* <div className="fourth-sec">
                {e.projectGoal.includes("Transcript") &&
                e.projectGoal.includes("Chunking") ? (
                  <div className="image-icons">
                    <img className="chunking" src={ChunkingIcon} alt="img" />

                    <img
                      className="transcript"
                      src={TranscriptIcon}
                      alt="img"
                    />
                  </div>
                ) : e.projectGoal.includes("Transcript") ? (
                  <img
                    className="transcript"
                    src={TranscriptIcon}
                    alt="img"
                  ></img>
                ) : e.projectGoal.includes("Chunking") ? (
                  <img className="chunking" src={ChunkingIcon} alt="img" />
                ) : (
                  ""
                )}
                {e.assignKey === "Review" ? (
                  <img className="chunking" src={qc_icon} alt="img" />
                ) : (
                  ""
                )}
              </div> */}
            </div>,
          ];
        })}
      </div>
    </div>
  );
}

export default AssignCard;

// usage example:var a = ['a', 1, 'a', 2, '1'];var unique = a.filter(onlyUnique);
// console.log(unique); // ['a', 1, 2, '1']
