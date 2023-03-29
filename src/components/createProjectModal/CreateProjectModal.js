import React, { useEffect, useState } from "react";
import Inputbox from "../ui-kits/InputBox/inputbox";
import "./CreateProjectModal.css";
import {
  projectApi,
  projectUpdateApi,
  uploadedFilesList,
} from "../../actions/ProjectApiAction";
import { getAllProjectsbyAccount } from "../../actions/GetAllAccountbyDomianApiAction";
import { setIsUploadModal } from "../../actions/AssignProject";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import ErrorMessage from "../../components/error/ErrorMessage";
import Button from "../ui-kits/Button/button";
import ChunkingIcon from "../../assets/projectPageIcon/Chunking.svg";
import ActiveChunking from "../../assets/projectPageIcon/ActiveChunking.svg";
import TranscriptIcon from "../../assets/projectPageIcon/TranscriptIcon.svg";
import ActiveTranscript from "../../assets/projectPageIcon/ActiveTranscript.svg";
import HumanIcon from "../../assets/projectPageIcon/HumanIcon.svg";
import ActiveHuman from "../../assets/projectPageIcon/ActiveHuman.svg";
import AIIcon from "../../assets/projectPageIcon/AIIcon.svg";
import ActiveAi from "../../assets/projectPageIcon/ActiveAi.svg";
import UploadIcon from "../../assets/projectPageIcon/UploadIcon.svg";
import UploadPop from "../uploadPop/UploadPop";
import {
  setAgentDetails,
  setUploadedFiles,
  isEditIconClicked,
} from "../../actions/PopupUploadFileAction";
import LoaderSaarthi from "../loader/Loader";
import { useHistory } from "react-router-dom";
function CreateProjectModal(props) {
  //changes by priya
  const [CreateProjectDetails, setCreateProjectDetails] = useState({
    name: "",
    description: "",
    agent: "",
    projectGoal: [],
    type: "text",
    account: "",
    domain: "",
    isUploadShow: false,
    isUploadedFiles: false,
  });

  const [isShowCreate, setIsShownCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allUploadedFiles, setAllUploadedFiles] = useState();
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const dispatch = useDispatch();
  const acccountName = useSelector(
    (store) => store.getAllAccountByDomainState.projectDetail
  );
  console.log(acccountName, "name");

  const domainName = useSelector(
    (store) => store.getAllAccountByDomainState.projectDetail.domain
  );

  // const domainName = useSelector((store) => store.domainNameState.domainName);
  console.log(domainName, "domain-name");

  // const allLogInData = useSelector((store) => store.loginState?.logInData);
  // const domainName = allLogInData?.showDomains[0]?.name?.toString();

  console.log(domainName, "domain", acccountName);
  const projectDetails = useSelector((store) => store.popUpState);

  const agentDetails = useSelector((store) => {
    return store.popUpState.agentDetails;
  });

  const clearData = () => {
    setAgentDetails(dispatch, {});
    setUploadedFiles(dispatch, {});
    setCreateProjectDetails((prev) => {
      return {
        name: "",
        description: "",
        agent: "",
        projectGoal: [],
        type: "text",
        account: "",
        domain: "",
        isUploadShow: false,
        isUploadedFiles: false,
      };
    });
  };

  useEffect(() => {
    if (domainName?.length > 0) {
      handleChange(domainName, "domain");
    }
    if (acccountName.name?.length > 0) {
      handleChange(acccountName.name, "account");
    }
  }, [acccountName.name, domainName]);

  useEffect(() => {
    if (
      CreateProjectDetails?.name?.length &&
      CreateProjectDetails?.description?.length &&
      CreateProjectDetails?.agent?.length &&
      CreateProjectDetails?.agent == "AI" &&
      CreateProjectDetails?.projectGoal?.length
    ) {
      setIsShownCreate((prev) => true);
    } else if (
      CreateProjectDetails?.agent?.length &&
      CreateProjectDetails?.agent == "Human"
    ) {
      if (CreateProjectDetails?.isUploadedFiles) {
        setIsShownCreate((prev) => true);
      } else {
        setIsShownCreate((prev) => false);
      }
    }
  }, [{ ...CreateProjectDetails }]);

  const toUpdateProject = () => {
    setIsLoading((prev) => true);
    let form = new FormData();
    if (CreateProjectDetails?.agent == "AI") {
      let submitData = {
        ...CreateProjectDetails,
        domain: domainName,
        account: acccountName.name,
        id: CreateProjectDetails._id,
      };
      if (submitData.name) {
        submitData.name = submitData.name.trim();
      }
      delete submitData.updatedAt;
      delete submitData.users;
      delete submitData.__v;
      delete submitData._id;
      delete submitData.createdAt;
      delete submitData.isUploadShow;
      delete submitData.isUploadedFiles;
      delete submitData.uploadedFiles;
      delete submitData.status;
      let entries = Object.entries(submitData);
      entries.map(([key, val]) => {
        if (key == "projectGoal") {
          return form.append(key, JSON.stringify(val));
        } else {
          return form.append(key, val);
        }
      });
    } else {
      let submitData = {
        ...CreateProjectDetails,
        ...agentDetails,
        ...agentDetails?.isTypeAudioDetails,
        domain: domainName,
        account: acccountName.name,
        id: CreateProjectDetails._id,
      };
      if (submitData.name) {
        submitData.name = submitData.name.trim();
      }
      delete submitData.isUploadShow;
      delete submitData.isUploadedFiles;
      delete submitData.isTypeAudioDetails;
      delete submitData.updatedAt;
      delete submitData.users;
      delete submitData.__v;
      delete submitData._id;
      delete submitData.createdAt;
      delete submitData.status;
      if (submitData.url?.length > 0) {
        delete submitData.uploadedFiles;
      } else {
        if (submitData.uploadedFiles == props.projectDetails.uploadedFiles) {
          delete submitData.uploadedFiles;
        }
        delete submitData.url;
      }
      if (submitData.uploadedFiles?.length == 0) {
        delete submitData.uploadedFiles;
      }
      if (submitData.url?.length == 0) {
        delete submitData.url;
      }
      let entries = Object.entries(submitData);
      entries.map(([key, val]) => {
        if (key == "projectGoal" || key == "language") {
          return form.append(key, JSON.stringify(val));
        } else {
          return form.append(key, val);
        }
      });
    }

    projectUpdateApi(form)
      .then((res) => {
        if (res?.data) {
          getAllProjectsbyAccount(dispatch, acccountName);
          clearData();
          props.closeModal();
          isEditIconClicked(false, dispatch);
        } else {
          isEditIconClicked(false, dispatch);
          clearData();
          props.closeModal();
        }
        setIsLoading((prev) => false);
      })
      .catch((err) => {
        setIsLoading((prev) => false);
      });
  };

  const toCreateProject = () => {
    setIsLoading((prev) => true);
    let form = new FormData();
    if (CreateProjectDetails?.agent == "AI") {
      let submitData = { ...CreateProjectDetails };
      if (submitData.name) {
        submitData.name = submitData.name.trim();
      }
      delete submitData.isUploadShow;
      delete submitData.isUploadedFiles;
      let entries = Object.entries(submitData);
      entries.map(([key, val]) => {
        if (key == "projectGoal") {
          return form.append(key, JSON.stringify(val));
        } else {
          return form.append(key, val);
        }
      });
    }
    if (CreateProjectDetails?.agent == "Human") {
      let submitData = {
        ...CreateProjectDetails,
        ...agentDetails,
        ...agentDetails?.isTypeAudioDetails,
      };
      if (submitData.name) {
        submitData.name = submitData.name.trim();
      }
      delete submitData.isUploadShow;
      delete submitData.isUploadedFiles;
      delete submitData.isTypeAudioDetails;
      if (submitData.url?.length > 0) {
        delete submitData.uploadedFiles;
      } else {
        delete submitData.url;
      }
      let entries = Object.entries(submitData);
      entries.map(([key, val]) => {
        if (key == "projectGoal" || key == "language") {
          return form.append(key, JSON.stringify(val));
        } else {
          return form.append(key, val);
        }
      });
    }

    projectApi(form)
      .then((res) => {
        console.log("descdf");
        if (res?.data) {
          getAllProjectsbyAccount(dispatch, acccountName);
          clearData();
          props.closeModal();
        } else {
          clearData();
          props.closeModal();
        }
        setIsLoading((prev) => false);
      })
      .catch((err) => {
        setIsLoading((prev) => false);
      });
  };

  //changes by priya
  const handleChange = (data, name) => {
    // console.log(data, data.trim(), "nithin xx");
    setCreateProjectDetails((prev) => {
      return {
        ...prev,
        [name]: data,
      };
    });
  };

  useEffect(() => {
    if (agentDetails?.isUploadedFiles) {
      handleChange(agentDetails?.isUploadedFiles, "isUploadedFiles");
    }
  }, [agentDetails]);

  useEffect(() => {
    setCreateProjectDetails((prev) => {
      return { ...prev, ...props.projectDetails };
    });
    if (props.projectDetails?.agent == "Human") {
      setCreateProjectDetails((prev) => {
        return { ...prev, isUploadShow: true };
      });
    } else {
      setCreateProjectDetails((prev) => {
        return { ...prev, isUploadShow: false };
      });
    }
  }, [props.projectDetails]);

  useEffect(() => {
    if (
      projectDetails?.isEditClicked &&
      props.projectDetails?.agent == "Human"
    ) {
      handleChange(true, "isUploadedFiles");
    }
  }, [projectDetails]);

  const getUploadedFiles = () => {
    // console.log(props.projectDetails._id);
    let Id = props.projectDetails?._id;
    uploadedFilesList(Id).then((res) => {
      if (res?.data) {
        // console.log(res.data);
        setAllUploadedFiles((prev) => res.data.data);
      }
    });
  };
  useEffect(() => {
    getUploadedFiles();
  }, [props.projectDetails]);

  console.log(props.projectDetails);

  return (
    <div className="createProjectWrapper">
      <div className="createProjectModalDiv">
        {props.isProjectDetailsLoading ? (
          <LoaderSaarthi />
        ) : (
          <>
            <div>
              <p className="projectHeading">Project Name</p>

              <Inputbox
                placeholder="Project Name"
                extraClass="inputBoxproject"
                type="text"
                value={CreateProjectDetails.name}
                onChange={(e) => {
                  return handleChange(e.target.value, "name");
                  // return setProjectName(e.target.value), setErrMsgname(false);
                }}
              />
              {/* {errMsgname ? (
            <div className="errorMessageAd">
              <ErrorMessage errorMessage="Please Enter Project Name" />
            </div>
          ) : (
            ""
          )} */}
            </div>
            <div className="firstDiv">
              <span>
                <p className="projectHeading" style={{ width: "120px" }}>
                  Project Goal
                </p>
              </span>
              <div className="projectGoalDiv">
                <div>
                  {CreateProjectDetails.projectGoal?.includes("Transcript") ? (
                    <Button
                      text="Chunking"
                      extraClass={`extraClassbuttonView ${
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? "extraClassbuttonOnClick"
                          : ""
                      } ${projectDetails?.isEditClicked ? "disabled" : ""}`}
                      image_src={
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? ActiveChunking
                          : ChunkingIcon
                      }
                      imgClass="extraImageClasss"
                      onClick={() => {
                        if (!projectDetails?.isEditClicked) {
                          let tempArr = Object.assign(
                            [],
                            CreateProjectDetails.projectGoal
                          );
                          if (tempArr?.includes("Chunking")) {
                            const index = tempArr.indexOf("Chunking");
                            if (index > -1) {
                              tempArr.splice(index, 1);
                            }
                          } else {
                            tempArr.push("Chunking");
                          }
                          handleChange(tempArr, "projectGoal");
                        }

                        // handleProjectGoalData("Chunking")
                      }}
                      // disabled={true}
                    />
                  ) : CreateProjectDetails.projectGoal?.includes("Chunking") ? (
                    <Button
                      text="Chunking"
                      extraClass={`extraClassbuttonView ${
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? "extraClassbuttonOnClick"
                          : ""
                      } ${projectDetails?.isEditClicked ? "disabled" : ""}`}
                      image_src={
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? ActiveChunking
                          : ChunkingIcon
                      }
                      imgClass="extraImageClasss"
                      onClick={
                        () => {
                          if (!projectDetails?.isEditClicked) {
                            let tempArr = Object.assign(
                              [],
                              CreateProjectDetails.projectGoal
                            );
                            if (tempArr?.includes("Chunking")) {
                              const index = tempArr.indexOf("Chunking");
                              if (index > -1) {
                                tempArr.splice(index, 1);
                              }
                            } else {
                              tempArr.push("Chunking");
                            }
                            handleChange(tempArr, "projectGoal");
                          }
                        } // handleProjectGoalData("Chunking")
                      }
                      // disabled={true}
                    />
                  ) : (
                    <Button
                      text="Chunking"
                      extraClass={`extraClassbuttonView ${
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? "extraClassbuttonOnClick"
                          : ""
                      }`}
                      image_src={
                        CreateProjectDetails.projectGoal?.includes("Chunking")
                          ? ActiveChunking
                          : ChunkingIcon
                      }
                      imgClass="extraImageClasss"
                      onClick={
                        () => {
                          let tempArr = Object.assign(
                            [],
                            CreateProjectDetails.projectGoal
                          );
                          if (tempArr?.includes("Chunking")) {
                            const index = tempArr.indexOf("Chunking");
                            if (index > -1) {
                              tempArr.splice(index, 1);
                            }
                          } else {
                            tempArr.push("Chunking");
                          }
                          handleChange(tempArr, "projectGoal");
                        }

                        // handleProjectGoalData("Chunking")
                      }
                      disabled={false}
                    />
                  )}
                </div>

                <div>
                  <Button
                    text="Transcript"
                    extraClass={`extraClassbuttonView ${
                      CreateProjectDetails.projectGoal?.includes("Transcript")
                        ? "extraClassbuttonOnClick"
                        : ""
                    }
                    ${projectDetails?.isEditClicked ? "disabled" : ""}
                    `}
                    image_src={
                      CreateProjectDetails.projectGoal?.includes("Transcript")
                        ? ActiveTranscript
                        : TranscriptIcon
                    }
                    imgClass="extraImageClasss"
                    onClick={() => {
                      if (!projectDetails?.isEditClicked) {
                        let tempArr = Object.assign(
                          [],
                          CreateProjectDetails.projectGoal
                        );
                        if (tempArr?.includes("Transcript")) {
                          const index = tempArr.indexOf("Transcript");
                          if (index > -1) {
                            tempArr.splice(index, 1);
                          }
                        } else {
                          tempArr.push("Transcript");
                        }
                        handleChange(tempArr, "projectGoal");
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="AsrSpecificationBox">
            <p>ASR Specific</p>
          </div> */}
            </div>
            <div className="firstDiv">
              <span>
                <p className="projectHeading" style={{ width: "120px" }}>
                  Agent
                </p>
              </span>
              <div className="projectGoalDiv">
                <div
                // onMouseEnter={() => setIsHumanActive(true)}
                // onMouseLeave={() => setIsHumanActive(false)}
                >
                  <Button
                    text="Human"
                    extraClass={`extraClassbuttonView ${
                      CreateProjectDetails.agent === "Human"
                        ? "extraClassbuttonOnClick"
                        : ""
                    } ${projectDetails?.isEditClicked ? "disabled" : ""}`}
                    image_src={
                      CreateProjectDetails.agent === "Human"
                        ? ActiveHuman
                        : HumanIcon
                    }
                    imgClass="extraImageClasss"
                    onClick={() => {
                      if (!projectDetails?.isEditClicked) {
                        handleChange("Human", "agent");
                        handleChange(true, "isUploadShow");
                      }
                    }}
                  />
                </div>
                <div
                // onMouseEnter={() => setIsAIActive(true)}
                //   onMouseLeave={() => setIsAIActive(false)}
                >
                  <Button
                    text="AI"
                    extraClass={`extraClassbuttonView ${
                      CreateProjectDetails.agent === "AI"
                        ? "extraClassbuttonOnClick"
                        : ""
                    }  ${projectDetails?.isEditClicked ? "disabled" : ""}`}
                    image_src={
                      CreateProjectDetails.agent === "AI" ? ActiveAi : AIIcon
                    }
                    imgClass="extraImageClasss"
                    onClick={() => {
                      if (!projectDetails?.isEditClicked) {
                        handleChange("AI", "agent");
                        handleChange(false, "isUploadShow");
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="AsrSpecificationBox">
            <p>ASR Specific</p>
          </div> */}
            </div>
            <div>
              <p className="projectHeading">Project Description </p>
              <textarea
                className="textArea"
                value={CreateProjectDetails?.description}
                onChange={(e) => {
                  handleChange(e.target.value, "description");
                  // return setprojectDescribtion(e.target.value), setErrMsgDes(false);
                }}
                placeholder="Conversations between Pravid Talks and customer. These conversations need to be tagged for ML."
              ></textarea>
              {/* {errMsgDes ? (
            <div className="errorMessageAd">
              <ErrorMessage errorMessage="Please Enter Project Description" />
            </div>
          ) : (
            ""
          )} */}
            </div>

            <div style={{ marginTop: "2%" }}>
              <Button
                text="Upload"
                extraClass={`extraUploadbuttonView ${
                  CreateProjectDetails.isUploadShow
                    ? ""
                    : "disable-pointer-events"
                }`}
                image_src={UploadIcon}
                imgClass="extraImageClasss"
                onClick={() => {
                  setIsUploadModal(true, dispatch);
                }}
                // disabled={isShown===false}
              />
            </div>
            <div className="button-container-div">
              <button
                className={`CreateAccount-btn ${
                  isShowCreate ? "" : "disable-pointer-events"
                } ${isLoading ? "disable-pointer-events" : ""}`}
                onClick={() => {
                  if (projectDetails?.isEditClicked) {
                    toUpdateProject();
                  } else {
                    toCreateProject();
                  }
                }}
                disabled={isLoading}
              >
                {" "}
                {projectDetails?.isEditClicked
                  ? "Update Project"
                  : "Create Project"}{" "}
              </button>
              <button
                className="Cancel-btn"
                onClick={() => {
                  props.tosetCondition(false);
                  isEditIconClicked(false, dispatch);
                  clearData();
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      {props.showUpload && (
        <div className="showModalBlur">
          <UploadPop
            projectDetails={props.projectDetails}
            editClicked={projectDetails.isEditClicked}
            uploadedFilesData={allUploadedFiles}
          />
        </div>
      )}
    </div>
  );
}

export default CreateProjectModal;
