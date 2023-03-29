import { useState, useEffect } from "react";

import TableSaarthi from "../ui-kits/Table/TableSaarthi/TableSaarthi";
import Button from "../ui-kits/Button/button";

import ErrorMessage from "../error/ErrorMessage";

import {
  deleteDataUrl,
  deleteUserFromProject,
} from "../../actions/ProjectApiAction";
import { userUpdateApi } from "../../actions/ManualEditTableApiAction";
// import { getAllConversationData } from "../../actions/GetAllConversationApiAction";

import {
  emailValidation,
  //passwordValidation,
  roleValidation,
  languageValidation,
  nameValidation,
} from "../../utilities/Validation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ManualEditTableConstants } from "./ManualEditTableConstants";
import { EditTableConstants } from "./EditTableConstants";

import "./ManualEditTable.css";

import {
  getAllTabledata,
  getAllTableDataRole,
  setFilterParameters,
  clearAllFilterParameters,
  getTableDataAllTypes,
} from "../../actions/GetAllTabledataApiAction";

import { getAllLangauge } from "../../actions/AssignProject";
import { useDispatch, useSelector } from "react-redux";

const ManualEditTable = (props) => {
  const [tableData, setTableData] = useState();
  const [isLoading, setIsLoading] = useState("loaded");
  const dispatch = useDispatch();

  const [dropDownOptions, setDropDownOptions] = useState({
    language: [],
    project: [],
  });

  const [dropDownOptionsSingle, setDropDownOptionsSingle] = useState({
    role: [],
  });

  // let role = sessionStorage.getItem("role");
  // const language = sessionStorage.getItem("language");

  // const [allRole, setAllRole] = useState([]);
  const [allLanguage, setAllLanguage] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState();

  const projectDetail = useSelector((store) => {
    return store.getAllAccountByDomainState.projectsList;
  });

  const projectName = useSelector((store) => {
    return store.getAllAccountByDomainState.selectedProjectName;
  });

  const selectedAccountName = useSelector(
    (store) => store.getAllAccountByDomainState?.projectDetail?.name
  );

  const selectedProjectName = useSelector(
    (store) => store.getAllAccountByDomainState?.selectedProjectName
  );
  const adminUserId = useSelector(
    (store) => store.loginState?.logInData?.userDetail?._id
  );
  useEffect(() => {
    if (props.userToUpdateData) {
      setTableData((prev) => [props.userToUpdateData]);
    }
  }, [props.userToUpdateData]);

  useEffect(() => {
    props.updatededData(tableData);
    console.log(tableData, "xxx");
  }, [tableData]);

  const handleInputChange = (e, index) => {
    const list = [...tableData];
    const { name, value } = e.target;
    list[index][name] = value;

    setTableData(list);
  };

  const handleSelectChangeSSD = (e, i) => {
    const list = [...tableData];
    if (e) {
      list[i]["role"] = e;
      setTableData((prev) => list);
    }
  };

  const handleSelectChangeMSSD = (e, credential, i) => {
    const list = [...tableData];
    if (credential === "language") {
      if (e) {
        list[i]["language"] = [...e];
        setTableData((prev) => list);
      }
    } else if (credential === "projects") {
      if (e) {
        list[i]["projects"] = [...e];
        setTableData((prev) => list);
      }
    }
  };

  const onChangeLanguage = (item) => {
    setAllLanguage((prev) => item);
  };

  const handleRemoveSpecificRow = (id, rowData, manualEdit) => {
    if (manualEdit?.length > 0 && projectDetail?.length > 0) {
      const list = [...tableData];

      list.splice(id, 1);

      let projectId = projectDetail
        .map((each) => {
          if (each.name == projectName) {
            return each.id;
          }
        })
        .filter((er) => er);
      let userId = rowData._id;
      if (projectId) {
        deleteUserFromProject(projectId, userId, adminUserId)
          .then((res) => {
            if (res.request.statusText === "OK") {
              // toast.success("User Deleted Successfully");
              props.closeModal();
            } else {
              console.log("result", res);
            }
          })
          .catch((e) => {
            // toast.error("User Deletion Unsuccessful!");
          });
        // getAllConversationData(
        //   dispatch,
        //   selectedAccountName,
        //   selectedProjectName
        // );
      }
    } else {
      const list = [...tableData];
      list.splice(id, 1);
      if (rowData._id) {
        deleteDataUrl(rowData._id, adminUserId)
          .then((res) => {
            if (res.request.statusText === "OK") {
              // toast.success("User Deleted Successfully");
              props.closeModal();
            }
          })
          .catch((e) => {
            // toast.error("User Deletion Unsuccessful!");
          });
      }
    }
  };

  // const clearDataOnUnmount = () => {
  //   clearAllFilterParameters(dispatch);
  // };

  useEffect(() => {
    getAllLangauge(dispatch);
    // return () => clearDataOnUnmount();
  }, []);

  const languageList = useSelector((store) => {
    return store.assignProjectDataState.allLangaugeList;
  });

  useEffect(async () => {
    // Api to fetch drop down options
    let arr = languageList?.map((e) => {
      return e?.name;
    });

    setAllLanguage((prev) => arr);
    const language = arr;

    const allRoles = await getAllTableDataRole(dispatch);

    setDropDownOptions((prev) => {
      return { ...prev, language };
    });

    setDropDownOptionsSingle((prev) => {
      return { ...prev, role: allRoles };
    });
  }, [languageList]);

  return (
    <>
      <div className="manualEditCardWrapper">
        <div className="topHeaderDiv">
          <div className="manualEditHeading">
            {props.HideAssignTask === false ? <p>Manual Edit</p> : <p>Edit</p>}
          </div>
        </div>

        <div className="manualEditTableDiv">
          {props.HideAssignTask === false ? (
            <TableSaarthi
              data={tableData?.length ? tableData : []}
              //data={tableData}
              cols={ManualEditTableConstants(
                handleInputChange,
                handleRemoveSpecificRow,
                handleSelectChangeSSD,
                handleSelectChangeMSSD,
                onChangeLanguage,
                dropDownOptions,
                dropDownOptionsSingle
              )}
              isLoading={isLoading}
              extraClassTableThead="extraSaarthiTableTheadEdit"
              extraClassTBody="extraSaarthiTableTrowEdit"
              extraOuterTable="extraTabledataEdit"
            />
          ) : (
            <TableSaarthi
              data={tableData?.length ? tableData : []}
              //data={tableData}
              cols={EditTableConstants(
                handleInputChange,
                handleRemoveSpecificRow,
                handleSelectChangeSSD,
                handleSelectChangeMSSD,
                onChangeLanguage,
                dropDownOptions,
                dropDownOptionsSingle
              )}
              isLoading={isLoading}
              extraClassTableThead="extraSaarthiTableTheadEdit"
              extraClassTBody="extraSaarthiTableTrowEdit"
              extraOuterTable="extraTabledataEdit"
            />
          )}
        </div>
      </div>
    </>
  );
};

//export default ManualEditTable;

const ManualEditUserModal = (props) => {
  const [userToUpdateData, setToUserUpdateData] = useState();
  const [newUserUpdatedData, setNewUserUpdatedData] = useState();
  const [isError, setIsError] = useState();

  useEffect(() => {
    if (props?.userToUpdateData) {
      setToUserUpdateData((previousState) => {
        return {
          ...props?.userToUpdateData,
        };
      });
      setNewUserUpdatedData((previousState) => props?.userToUpdateData);
    }
  }, [props.userToUpdateData]);

  useEffect(() => {
    setIsError((previousState) => isError);
  }, [isError]);

  const adminUserId = useSelector(
    (store) => store.loginState?.logInData?.userDetail?._id
  );

  // To update user api
  const postingUpdatedData = async () => {
    const isCheckName = await nameValidation(newUserUpdatedData[0]?.name);
    if (!isCheckName.isValid) {
      const temp = isCheckName.errors.message;
      setIsError((previousState) => temp);
      return;
    }
    const isCheckEmail = await emailValidation(newUserUpdatedData[0]?.email);
    if (!isCheckEmail.isValid) {
      const temp = isCheckEmail.errors.message;
      setIsError((previousState) => temp);
      return;
    }
    /*const isCheckPassword = await passwordValidation(
      newUserUpdatedData?.password
    );


    if (!isCheckPassword.isValid) {
      const temp = isCheckPassword.errors.message;
      setIsError((previousState) => temp);

      return;
    }
*/
    const isCheckRole = await roleValidation(newUserUpdatedData[0]?.role);
    if (!isCheckRole.isValid) {
      const temp = isCheckRole.errors.message;
      setIsError((previousState) => temp);
      return;
    }

    const isCheckLanguage = await languageValidation(
      newUserUpdatedData[0]?.language
    );
    if (!isCheckLanguage.isValid) {
      const temp = isCheckLanguage.errors.message;
      setIsError((previousState) => temp);
      return;
    }
    /*if (!newUserUpdatedData?.projects) {
      setIsError((previousState) => "Please select the  project");
      return;
    }*/

    // if (!newUserUpdatedData[0]?.assignedTask) {
    //   setIsError((previousState) => "Please fill the Assign Task");
    //   return;
    // }

    let data = {
      isActive: userToUpdateData?.isActive,
      language: newUserUpdatedData && newUserUpdatedData[0]?.language,
      name: newUserUpdatedData && newUserUpdatedData[0]?.name,
      role: newUserUpdatedData && newUserUpdatedData[0]?.role,
      //email: newUserUpdatedData && newUserUpdatedData[0]?.email,
      //projects: newUserUpdatedData && newUserUpdatedData[0]?.projects,
      //assignedTask: newUserUpdatedData && newUserUpdatedData[0]?.assignedTask,
      id: newUserUpdatedData && newUserUpdatedData[0]?._id,
    };

    userUpdateApi(data, adminUserId)
      .then((res) => {
        if (res.request.statusText === "OK") {
          props.handleClickCancelUpdateModel();
          props.toApiUpdate((prev) => !prev);
          toast.success("User updated successfully!");
        }
      })
      .catch((e) => {
        toast.error("User Updation is not successful!");
        // alert(e);
      });
  };

  //  To update data
  const toGetUpdatededData = (value) => {
    const temp = value;
    setNewUserUpdatedData((previousState) => value);
  };

  // To summit all user
  const handleSummitUpdateDetails = () => {
    postingUpdatedData();
  };

  // To cancel update user form
  const handleClickCancelUpdating = () => {
    props.handleClickCancelUpdateModel();
    props.refreshData();
  };

  return (
    <>
      <div className="manualUpdateUserFormTopDiv">
        <div className="manualUpdateUserFormArea">
          <ManualEditTable
            userToUpdateData={userToUpdateData}
            updatededData={(value) => {
              toGetUpdatededData(value);
            }}
            closeModal={() => {
              handleClickCancelUpdating();
            }}
            disable={true}
            HideAssignTask={props.hideAssignTask}
          />
          {/* <div style={{ marginTop: "40px" }}> */}
          <div>
            {isError && (
              <ErrorMessage
                errorMessage={isError}
                extraClass={"extraErrorMessageClassName"}
              />
            )}
          </div>
        </div>

        <div className="manualUpdateAndCancelButtonDiv">
          <div className="updateUserButton">
            <Button
              text=" Cancel "
              extraClass="updateUserButtonStyle"
              onClick={() => handleClickCancelUpdating()}
            />
          </div>
          <div className="updateUserButton">
            <Button
              text=" Done "
              extraClass="updateUserButtonStyle"
              onClick={() => handleSummitUpdateDetails()}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </>
  );
};

export default ManualEditUserModal;
