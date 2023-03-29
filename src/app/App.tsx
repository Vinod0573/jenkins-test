import React, { useState } from "react";
import { Route } from "react-router-dom";
import AddUserOption from "../pages/addUserOptionPage/AddUserOption";
import DropdownCheck from "../pages/dropdownCheck";
import HomePage from "../pages/home/homePage";
import AssignCard from "../components/asrSpecificComponents/assignProject/AssignCard";
import ConversationTextCard from "../components/asrSpecificComponents/assignProject/conversationTextCard/ConversationTextCard";
import NavigationComponent from "../components/asrSpecificComponents/assignProject/navigationComponent/NavigationComponent";
import CreateProjectModal from "../components/createProjectModal/CreateProjectModal";
import Navigationbar from "../components/navigationbar/Navigationbar";
import ProjectDescriptionCard from "../components/projectPageComponent/projectDescriptionCard/ProjectDescriptionCard";
import TotalCountCard from "../components/projectPageComponent/totalCountCard/TotalCountCard";
import SelectDomain from "../components/selectDomain/SelectDomain";
import Account from "../pages/account/Account";
import AssignProject from "../pages/assignProject/AssignProject";
import CreateAccount from "../pages/createAccount/CreateAccount";
import CreatePage from "../pages/createPage/CreatePage";
import InsideViewProject from "../pages/insideViewProject/InsideViewProject";
import LogIn from "../pages/logIn/LogIn";
import ProjectPage from "../pages/projectCreationPage/ProjectPage";
import UserList from "../pages/userListPage/UserList";
import { ROUTES } from "../Routes.js";
import AddUserForm from "../components/createUserModal/AddUserForm";
import SaveModal from "../components/saveButtonMsgModal/SaveModal";
import UserCredentialForm from "../components/ui-kits/userform/UserCredentialForm";
import DndOrBrowse from "../components/dndOrBrowse/DndOrBrowse";
import DndProgress from "../components/dndProgress/DndProgress";
import Radio from "../components/radio/Radio";
import cross from "../assets/cross.svg";
import UploadHistory from "../components/uploadHistory/UploadHIstory";
import MetaInfo from "../components/metaInfo/MetaInfo";
import Warn from "../components/warn/Warn";
import UploadPop from "../components/uploadPop/UploadPop";
import LeftSideChunking from "../components/leftSideChunking/LeftSideChunking";
import TranscriptChunking from "../pages/transcriptChunking/TranscriptChunking";
import SelectDomainPage from "../pages/selectDomainPage/SelectDomainPage";
import DemoScreen from "../pages/demo/DemoScreen";

function App(props: any) {
  const {
    DOMAINCOMPONENT,
    DOMAINPAGE,
    CREATEPAGE,
    CREATEACCOUNT,
    PROJECTCARD,
    COUNTCARD,
    ACCOUNTPAGE,
    PROJECTPAGE,
    PROJECTMODAL,
    ASSIGNCARD,
    CONVERSATIONTEXTCARD,
    NAVIGATIONCOMPONENT,
    TOTALCONVERSATION,
    ASSIGNEDPROJECT,
    DEMO,
  } = ROUTES;
  const [token, setToken] = useState();

  let accToken = token || sessionStorage.getItem("token");
  // function useUserRoles() {
  //   // some logic or api call to get the roles
  //   // for demonstration purposes it's just hard coded
  //   const userRoles = ["admin", "root"];

  //   // return the current user roles
  //   return userRoles;
  // }

  // function RolesAuthRoute({ children, roles }: { children: any; roles: any }) {
  //   const userRoles = useUserRoles();

  //   const canAccess = userRoles.some((userRole) => roles.includes(userRole));

  //   if (canAccess) return <>{children}</>;

  //   return <Route path="/" />;
  // }

  if (!accToken) {
    return (
      // <RolesAuthRoute roles={["admin"]}>
      //   <AssignProject />
      // </RolesAuthRoute>
      <Route exact path="/">
        <LogIn setToken={setToken} setUserType />
      </Route>
    );
  }
  return (
    <div className="app-wrapper">
      <Route exact path={DOMAINCOMPONENT}>
        <Navigationbar />
        <SelectDomain />
      </Route>
      <Route exact path="/">
        <Navigationbar />
        {/* <SelectDomainPage /> */}
        <Account />
      </Route>
      <Route exact path={CREATEPAGE}>
        <Navigationbar />
        <CreatePage />
      </Route>
      <Route exact path={CREATEACCOUNT}>
        <Navigationbar />
        <CreateAccount />
      </Route>
      <Route exact path={ACCOUNTPAGE}>
        <Navigationbar />
        <Account />
      </Route>
      <Route exact path={PROJECTPAGE}>
        <Navigationbar />
        <ProjectPage />
      </Route>
      <Route exact path={PROJECTMODAL}>
        <CreateProjectModal />
      </Route>
      <Route exact path={PROJECTCARD}>
        <ProjectDescriptionCard />
      </Route>
      <Route exact path={COUNTCARD}>
        <TotalCountCard />
      </Route>
      <Route exact path={ASSIGNCARD}>
        <AssignCard />
      </Route>
      <Route exact path={CONVERSATIONTEXTCARD}>
        <ConversationTextCard />
      </Route>
      <Route exact path={NAVIGATIONCOMPONENT}>
        <Navigationbar />
        <NavigationComponent />
      </Route>
      <Route exact path={TOTALCONVERSATION}>
        <Navigationbar />
        <InsideViewProject />
      </Route>
      <Route exact path={ASSIGNEDPROJECT}>
        <Navigationbar />
        <AssignProject />
      </Route>
      <Route exact path={DEMO}>
        <Navigationbar></Navigationbar>
        <DemoScreen></DemoScreen>
      </Route>
      <Route exact path="/optionPage">
        <Navigationbar />
        <AddUserOption />
      </Route>
      <Route exact path="/Create">
        <Navigationbar />
        <UserCredentialForm />
      </Route>
      <Route exact path="/annotator">
        <Navigationbar />
        <TranscriptChunking />
      </Route>
    </div>
  );
}

export default App;
