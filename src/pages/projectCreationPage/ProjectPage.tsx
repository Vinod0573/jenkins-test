import React, { useEffect, useState } from "react";
import Create from "../../components/create/Create";
import "./ProjectPage.css";
import HomeIcon from "../../assets/HomeIcon/HomeIcon.svg";
import CreateProjectModal from "../../components/createProjectModal/CreateProjectModal";
import ProjectDescriptionCard from "../../components/projectPageComponent/projectDescriptionCard/ProjectDescriptionCard";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../Routes";

import { IAppState } from "../../store/store";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { setSelectedProjectName } from "../../actions/GetAllAccountbyDomianApiAction";
import { pushAccountPageState } from "../../actions/PushToAccountPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateProject from "../../assets/accountPageIcons/Searching.svg";
import UploadPop from "../../components/uploadPop/UploadPop";
import { getProjectDetail } from "../../actions/ProjectApiAction";
import { isEditIconClicked } from "../../actions/PopupUploadFileAction";

function ProjectPage() {
  const [showProjectModal, setshowProjectModal] = useState(false);
  const [isProjectDetailsLoading, setIsProjectDetailsLoading] = useState(false);
  const [toshowNewProjectCreation, setToShowNewProjectCreation] =
    useState(false);

  const [selectedProjectDetails, setSelectedProjectDetails] = useState({});
  const projectDetail: {} = useSelector(
    (state: IAppState) => state.getAllAccountByDomainState.projectDetail
  );

  const isUploadModalVisisble = useSelector(
    (state: IAppState) => state.assignProjectDataState
  );
console.log(isUploadModalVisisble,"999")
  let projectName: string = (projectDetail as any).name;
  let isUpload: boolean = (isUploadModalVisisble as any).isUpload;

  const projectList = useSelector(
    (state: IAppState) => state.getAllAccountByDomainState.projectsList
  );

  console.log("list", projectList);
  const tonextPage = (data: any) => {
    return (
      setToShowNewProjectCreation((prev) => data),
      setshowProjectModal((prev) => false)
    );
  };
  let dispatch = useDispatch();
  let history = useHistory();
  const insideView = (each: any) => {
    setSelectedProjectName(dispatch, each);
    history.push(ROUTES.TOTALCONVERSATION);
  };
  // to push again on home page
  const pushHomePage = () => {
    pushAccountPageState(dispatch, true);
    history.push("/accountpage");
  };

  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const getProjectDetails = (projectName: any) => {
    setIsProjectDetailsLoading((prev) => true);
    setshowProjectModal((prev) => true);
    getProjectDetail(projectName)
      .then((result) => {
        setIsProjectDetailsLoading((prev) => false);
        setSelectedProjectDetails((prev) => result?.data?.data);
        isEditIconClicked(true, dispatch);
      })
      .catch((err) => {
        setIsProjectDetailsLoading((prev) => false);
      });
  };

  const toShowProjectDetails = (e: any, name: any) => {
    e.preventDefault();
    insideView(name);
  };

  return (
    <div>
      <div className="childDiv ProjectPageWrapper">
        <div className="Header-section">
          <div className="HeadingContainerDiv">
            <div className="IconDiv">
              <img
                className="imgIcon"
                src={HomeIcon}
                onClick={() => pushHomePage()}
              ></img>
            </div>
            <div className="projectTitle">
              <p className="projectNameP">{projectName} </p>
            </div>
          </div>
          <div
            className={`CreateProjectContainer`}
            onClick={() => {
              setshowProjectModal(true);
              setSelectedProjectDetails({});
            }}
            // ${projectList?.length >=1 ? "createDisable" : ""}
          >
            <Create
              createName="Project"
              styleCreateDiv="styleCreateDiv"
              stylePlusSign="stylePlusSign"
              styleCreateName="styleCreateName"
            />
          </div>
        </div>
        {showProjectModal ? (
          <div className="showModalBlur">
            <CreateProjectModal
              tosetCondition={tonextPage}
              showUpload={isUpload}
              closeModal={() => {
                setshowProjectModal(false);
              }}
              projectDetails={selectedProjectDetails}
              isProjectDetailsLoading={isProjectDetailsLoading}
            />
          </div>
        ) : null}

        <div className="card-project">
          {projectList?.length > 0 ? (
            projectList &&
            (projectList as unknown as Array<any>).map(
              (each: any, i: number) => {
                return (
                  <div className="cardContainerProject">
                    <div onClick={(e) => toShowProjectDetails(e, each.name)}>
                      <ProjectDescriptionCard
                        projectData={each}
                        index={i}
                        getDetails={(projectName: any) =>
                          getProjectDetails(projectName)
                        }
                        showInsideView={() => {
                          insideView(each.name);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="createNewProjectDiv">
              <p className="createNewProjectHeading">
                Let’s get started, create an Project
              </p>
              <div className="createNewProjectImage">
                <img src={CreateProject} alt="Create Project" />
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </div>
  );
}

export default ProjectPage;
