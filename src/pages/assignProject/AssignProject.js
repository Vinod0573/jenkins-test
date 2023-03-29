import React, { useEffect, useState } from "react";
import AssignCard from "../../components/asrSpecificComponents/assignProject/AssignCard";
import "./AssignProject.scss";
import { getAssignedProjectList } from "../../actions/AssignProject";
import { useDispatch, useSelector } from "react-redux";
import LoaderSaarthi from "../../components/loader/Loader";
import ProjectListingSideImg from "../../assets/AsrspecificViewIcons/ProjectListingSideImg.svg";
import UseWindowDimensions from "../../utilities/UseWindowDimensions";
// /import MapsLocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store';
import RoleTogglerRedux from "../../reducers/roleToggler";
import noProjectFound from "../../assets/projectPageIcon/noProjectFound.svg";
import { useHistory } from "react-router-dom";
import { async } from "q";
import { setIsLoading } from "../../actions/PopupUploadFileAction";
function AssignProject() {
  const dispatch = useDispatch();
  const history = useHistory();
  // let role = window.sessionStorage.getItem("role");
  const role = useSelector((state) => state.RoleToggler.role);
  if (role === "Annotator Admin") {
    history.push("/");
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getProject() {
      setLoading(true);
      let userName = window.sessionStorage.getItem("name");
      await getAssignedProjectList(userName, dispatch);

      setLoading(false);
    }
    getProject();
  }, []);
  function dispatchRole(role) {
    dispatch(RoleTogglerRedux.actions.switchRole(role));
  }
  const assignedProjects = useSelector(
    (store) => store.assignProjectDataState.assignedProjectList
  );
  // console.log(assignedProjects,"lalal");
  const [assignCard, setAssignCard] = useState([]);

  useEffect(() => {
    const projectList =
      assignedProjects &&
      assignedProjects.accountDetails &&
      assignedProjects.accountDetails?.length > 0
        ? assignedProjects.accountDetails
        : [];
    // console.log(projectList, "nithin qccccc");
    setAssignCard(projectList);
  }, [assignedProjects, role]);

  // const assignCard = projectList;
  // console.log(assignCard, "MSKISISIOS-");

  // console.log("assignMainProject", assignedProjects);
  let { width, height } = UseWindowDimensions();
  // console.log("dimention", width, height);
  return (
    <div className="childDiv AssignProjectWrapper">
      <div className="role_toggler_header">
        <div
          className="each_tab"
          onClick={() => {
            dispatchRole("Data Annotator");
          }}
          data-selected={role === "Data Annotator"}
        >
          Annotation
        </div>
        <div
          className="each_tab"
          onClick={() => {
            dispatchRole("Quality Analyst");
          }}
          data-selected={role === "Quality Analyst"}
        >
          Quality Check
        </div>
      </div>
      <div className="Title">Assigned Projects</div>

      {!loading ? (
        <div className="containerCardsAssignProject">
          <div className="rightSideImageDiv">
            <img src={ProjectListingSideImg} alt="ProjectListingSideImg" />
          </div>
          <div className="CardsList">
            {assignCard.length > 0 ? (
              assignCard?.flatMap((each) => {
                return <AssignCard listData={each} />;
              })
            ) : (
              <div className="sdsid03039nxvsfz">
                <p className="skdsiodui98723rbeukhc8uf">No Project Found!</p>
                <img
                  className="jkvckhiewkj9873rbfide39"
                  src={noProjectFound}
                  alt="Not Found"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loader-section">
          <LoaderSaarthi />
        </div>
      )}
    </div>
  );
}

export default AssignProject;
