import React from "react";
import Create from "../../components/create/Create";
import "./CreatePage.css";
import { useHistory } from "react-router-dom";
function CreatePage() {
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }
  return (
    <div className="childDiv createPage-outerDiv">
      <div>
        <Create createName="project" />
      </div>
      <div>
        <Create createName="user" />
      </div>
    </div>
  );
}

export default CreatePage;
