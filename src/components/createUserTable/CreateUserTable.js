import "./CreateUserTable.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  emailValidation,
  passwordValidation,
  nameValidation,
  roleValidation,
  languageValidation,
} from "../../utilities/Validation";

import ErrorMessage from "../error/ErrorMessage";
import TableSaarthi from "../ui-kits/Table/TableSaarthi/TableSaarthi";
import Button from "../ui-kits/Button/button";
import useDidMountEffect from "../useDidMount/UseDidMountEffect";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TableConstants } from "./TableConstants";

import { registerUser } from "../../actions/UserListCreateUserApiAction";
import {
  getAllTabledata,
  getAllTableDataRole,
  setFilterParameters,
  clearAllFilterParameters,
  getTableDataAllTypes,
} from "../../actions/GetAllTabledataApiAction";
import { getAllLangauge } from "../../actions/AssignProject";
import Cross from "../../assets/projectPageIcon/cross.svg";

const CreateUserTable = (props) => {
  const dispatch = useDispatch();

  const accountName = sessionStorage.getItem("accountName");
  console.log("acc", accountName);
  let isActive = sessionStorage.getItem("isActive");

  const [tableData, setTableData] = useState([
    {
      language: "",
      accountName: props.accountName ? props.accountName : accountName,
      name: "",
      password: "",
      role: "",
      email: "",
      //project: "",
      isActive: isActive,
    },
  ]);

  const [isLoading, setIsLoading] = useState("loaded");
  const [isError, setIsError] = useState();

  const [dropDownOptions, setDropDownOptions] = useState({
    language: [],
    project: [],
  });
  // const [dropDownSelectedOptions, setDropDownSelectedOptions] = useState({
  //   language: [],
  //   project: [],
  // });
  const [allLanguage, setAllLanguage] = useState([]);
  const [dropDownOptionsSingle, setDropDownOptionsSingle] = useState({
    role: [],
  });

  // const [dropDownSelectedOptionsSingle, setDropDownSelectedOptionsSingle] =
  //   useState({
  //     role: [],
  //   });

  const handleInputChange = (e, index) => {
    const list = [...tableData];
    const { name, value } = e.target;
    list[index][name] = value;
    //console.log("list", list.name);
    setTableData(list);
  };

  // const handleDropDownSelectChange = (selectedData, dropDownName) => {
  //   setDropDownSelectedOptions((prev) => {
  //     return { ...prev, [dropDownName]: selectedData };
  //   });
  // };

  // const handleDropDownSelectChangeSingle = (selectedData, dropDownName) => {
  //   setDropDownSelectedOptions((prev) => {
  //     return { prev, [dropDownName]: selectedData };
  //   });
  // };

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
    } else if (credential === "project") {
      if (e) {
        list[i]["project"] = [...e];
        setTableData((prev) => list);
      }
    }
  };

  const onChangeLanguage = (item) => {
    setAllLanguage((prev) => item);
  };

  const handleAdd = () => {
    setTableData([
      ...tableData,
      {
        id: tableData?.length + 1,
        accountName: accountName,
        name: "",
        email: "",
        password: "",
        language: "",
        role: "",
        //project: "",
        isActive: isActive,
      },
    ]);
  };

  const handleRemoveSpecificRow = (id) => {
    const list = [...tableData];
    if (id > -1) {
      list.splice(id, 1);
    }
    setTableData(list);
  };

  const toBack = () => {
    props.handleClickCancelAddUserModel();
  };

  const toCheckAllValidation = (each, i) => {
    const isCheckName = nameValidation(each.name);
    if (!isCheckName.isValid) {
      const temp = `${isCheckName.errors.message}`;
      return temp;
    }
    const isCheckEmail = emailValidation(each.email);
    if (!isCheckEmail.isValid) {
      const temp = `${isCheckEmail.errors.message}`;
      return temp;
    }
    const isCheckPassword = passwordValidation(each.password);
    if (!isCheckPassword.isValid) {
      const temp = `${isCheckPassword.errors.message}`;
      return temp;
    }
    const isCheckLanguage = languageValidation(each.language);
    if (!isCheckLanguage.isValid) {
      const temp = `${isCheckLanguage.errors.message}`;
      return temp;
    }
    const isCheckRole = roleValidation(each.role);
    if (!isCheckRole.isValid) {
      const temp = `${isCheckRole.errors.message}`;
      return temp;
    }

    return null;
  };

  const createUserList = async () => {
    const dataValidation = tableData;
    let checkIsError = null;
    if (dataValidation.length) {
      const Error = dataValidation.map((ipfield, i) => {
        const checkError = toCheckAllValidation(ipfield, i);

        setIsError((previousState) => checkError);
        checkIsError = checkError;

        props.toGetErrorMessage(checkError);
      });
    }
    if (checkIsError) {
      return;
    }

    tableData.forEach((element) => {
      delete element.id;
    });

    let data = tableData;

    registerUser(data)
      .then((res) => {
        toBack();
        res?.data?.data?.message[0]?.exception
          ? toast.error(res?.data?.data?.message[0]?.exception[0])
          : toast.success(res?.data?.data?.message);

        props.refreshData();
      })
      .catch((e) => {
        toast.error("Creating User(s) is Unsuccessful!");
      });
  };

  // const clearDataOnUnmount = () => {
  //   clearAllFilterParameters(dispatch);
  // };

  useEffect(() => {
    getAllLangauge(dispatch);
    // return () => clearDataOnUnmount();
  }, []);

  useDidMountEffect(() => {
    createUserList();
  }, [props.isCreateNewUser]);

  useDidMountEffect(() => {
    handleAdd();
  }, [props.isAddUser]);

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

  //console.log(languageList);

  return (
    <div className="CreateUserCardWrapper">
      <div className="TopBtnContainerDiv btmBtnContainer">
        <div className="CreateUserHeading ">
          <p>Create User</p>
        </div>

        <div>
          {tableData?.length === 1 ? (
            <div className="createUserAndCancelButtonDiv">
              {tableData.map((ipfield, i) => {
                const checkError = toCheckAllValidation(ipfield, i);
                if (!checkError) {
                  return (
                    <>
                      {tableData?.length <= 4 ? (
                        <Button
                          text="Add +"
                          extraClass="UserButtonStyle"
                          onClick={handleAdd}
                        />
                      ) : null}
                    </>
                  );
                }
              })}
            </div>
          ) : (
            <div className="createUserAndCancelButtonDiv ">
              <>
                {tableData?.length <= 4 ? (
                  <Button
                    text="Add +"
                    extraClass="UserButtonStyle"
                    onClick={handleAdd}
                  />
                ) : null}
              </>
            </div>
          )}
        </div>
      </div>

      <div className="tableContainerDiv">
        <TableSaarthi
          data={tableData?.length ? tableData : []}
          cols={TableConstants(
            handleInputChange,
            handleRemoveSpecificRow,
            handleSelectChangeSSD,
            handleSelectChangeMSSD,
            onChangeLanguage,
            dropDownOptions,
            dropDownOptionsSingle
            // handleDropDownSelectChange,
            // dropDownSelectedOptions,
            // handleDropDownSelectChangeSingle,
            // dropDownSelectedOptionsSingle
          )}
          isLoading={isLoading}
          extraClassTableThead="extraSaarthiTableTheadCreate"
          extraClassTBody="extraSaarthiTableTrowCreate"
          extraOuterTable="extraTabledataCreate"
        />
      </div>
      <div>
        {tableData?.length <= 1 ? (
          <div className="createUserAndCancelButtonDiv btmBtnContainer">
            {tableData.map((ipfield, i) => {
              const checkError = toCheckAllValidation(ipfield, i);
              if (!checkError) {
                return (
                  <>
                    <div className="createUserButton">
                      <Button
                        text=" Back "
                        extraClass="UserButtonStyle"
                        onClick={() => toBack()}
                      />
                    </div>

                    <div className="createUserButton">
                      <Button
                        text=" Done "
                        extraClass="UserButtonStyle"
                        onClick={() => createUserList()}
                      />
                    </div>
                  </>
                );
              }
            })}
          </div>
        ) : (
          <>
            {/* <div style={{ marginTop: "40px" }}> */}
            <div>
              {isError && (
                <ErrorMessage
                  errorMessage={isError}
                  extraClass={"extraErrorMessageClassName"}
                />
              )}
            </div>
            <div className="createUserAndCancelButtonDiv btmBtnContainer">
              <>
                <div className="createUserButton">
                  <Button
                    text=" Back "
                    extraClass="UserButtonStyle"
                    onClick={() => toBack()}
                  />
                </div>

                <div className="createUserButton">
                  <Button
                    text=" Done "
                    extraClass="UserButtonStyle"
                    onClick={() => createUserList()}
                  />
                </div>
              </>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//export default CreateUserTable;

const CreateUserTableModal = (props) => {
  const [isAddNewUser, setIsAddNewUser] = useState(false);
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [isError, setIsError] = useState();

  const AddUserData = (props) => {
    setIsAddNewUser((prev) => !prev);
  };

  useEffect(() => {
    setIsAddNewUser(isAddNewUser);
  }, [isAddNewUser]);

  // To summit all users
  const handleSummitAddUserList = () => {
    setIsCreateNewUser((previousState) => !previousState);
    props.toApiUpdate((prev) => !prev);
  };

  // To cancel create user modal
  const handleClickCancelAddUser = () => {
    props.handleClickCancelAddUserModel();
  };

  const toGetErrorMessage = (err) => {
    setIsError((prev) => err);
  };

  return (
    <>
      <div className="createUserFormTopDiv">
        {/*<div className="addUserButton">
          <Button
            text="Add User + "
              padding: "1em",
              fontWeight: "700",
              background: "white",
              color: "#0174ff",
            }}
            onClick={() => AddUserData()}
          />
        </div>*/}
        <div className="closeModal">
          <div className="closeIcon">
            <img src={Cross} onClick={() => handleClickCancelAddUser()} />
          </div>
        </div>
        <div className="createUserFormArea">
          <CreateUserTable
            isAddUser={isAddNewUser}
            isCreateNewUser={isCreateNewUser}
            handleClickCancelAddUserModel={() => handleClickCancelAddUser()}
            toGetErrorMessage={(value) => toGetErrorMessage(value)}
            accountName={props.accountName}
            refreshData={props.refreshData}
          />
          {/* <div style={{ marginTop: "40px" }}>
            {isError && (
              <ErrorMessage
                errorMessage={isError}
                extraClass={"extraErrorMessageClassName"}
              />
            )}
          </div> */}
        </div>
        {/* <div className="createUserAndCancelButtonDiv">
          <>
            <div className="createUserButton">
              <Button
                text=" Back "
                extraClass="UserButtonStyle"
                onClick={() => handleClickCancelAddUser()}
              />
            </div>
            <div className="createUserButton">
              <Button
                text=" Done "
                extraClass="UserButtonStyle"
                onClick={() => handleSummitAddUserList()}
                //disabled={isError ? true : false}
              />
            </div>
          </>
        </div> */}
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

export default CreateUserTableModal;
