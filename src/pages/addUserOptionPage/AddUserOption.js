import React, { useEffect, useState, useRef } from "react";
import SearchBox from "../../components/ui-kits/searchBox/SearchBox";
import SearchIcon from "../../assets/searchIcon/searchIconGrey.svg";
import "./AddUserOptionPage.css";
import AddCard from "../../components/projectPageComponent/addUserCard/AddCard";
import createIcon from "../../assets/projectPageIcon/CreateUserIcon.svg";
import createIconGrey from "../../assets/projectPageIcon/CreatUserIconGrey.svg";
import AdduserIconcolor from "../../assets/projectPageIcon/AddUserIconcolor.svg";
import AddUserIconWhite from "../../assets/projectPageIcon/AddUserIconWhite.svg";
import AdduserIconGrey from "../../assets/projectPageIcon/AddUserIconGrey.svg";
import TableSaarthi from "../../components/ui-kits/Table/TableSaarthi/TableSaarthi";
import TableConstant from "./TableConstant";
import { MockData } from "./MockData";
import goBackIcon from "../../assets/goBackIcon/goBackIconGrey.svg";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import {
  getAllTabledata,
  getAllTableDataRole,
  setFilterParameters,
  clearAllFilterParameters,
  getTableDataAllTypes,
} from "../../actions/GetAllTabledataApiAction";
import { check } from "../../actions/SelectUserAction";
import { addUserProject } from "../../actions/AdddUserProjectApiAction";
import { getSearch, getSearchedData } from "../../actions/AccountApiAction";
import { getAllLangauge } from "../../actions/AssignProject";
import Pagination from "../../components/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserForm from "../../components/createUserModal/AddUserForm";
import UpdateUserCredential from "../../components/ui-kits/updateusercredential/UpdateUserCredential";
import MessageModal from "../../components/messageModal/MessageModal";
import CreateUserTableModal from "../../components/createUserTable/CreateUserTable";
import ManualEditUserModal from "../../components/manualEditTable/ManualEditTable";
import useDebounce from "../../components/hooks/useDebounce/UseDebounce";
import Modal from "../../components/ui-kits/modal/Modal";
import { useHistory } from "react-router-dom";

function AddUserOption(props) {
  const [isLoading, setIsLoading] = useState("loaded");
  const [userId, setUserId] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState();
  const [tableData, setTableData] = useState();
  const [isUpdateUserModel, setIsUpdateUserModel] = useState(false);
  const [userToUpdateData, setToUserUpdateData] = useState(null);
  const [messageModal, setMessageModal] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [msgData, setMsgData] = useState(false);
  const [apiUpdate, setApiUpdate] = useState(false);
  const [nameSortingOrder, setNameSortingOrder] = useState(null);
  const [emailSortingOrder, setEmailSortingOrder] = useState(null);
  const [dropDownVisible, setDropDownVisible] = useState(null);

  const [dropDownOptions, setDropDownOptions] = useState({
    language: [],
    role: [],
    project: [],
  });
  const [dropDownSelectedOptions, setDropDownSelectedOptions] = useState({
    language: [],
    role: [],
  });
  const [allLanguage, setAllLanguage] = useState([]);
  const _isMounted = useRef(false);
  // get data from store
  const tableDataByStore = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.results
  );
  const isItFilteredData = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.isItFilteredData
  );
  const projectIdList = useSelector(
    (store) => store.getAllAccountByDomainState?.projectsList
  );
  const AccountNameRedux = useSelector(
    (store) => store.getAllAccountByDomainState?.selectedProjectName
  );
  const projectDetailId = useSelector(
    (store) => store.getAllTableDataApiState?.getTableDataByproject?._id
  );
  const projectsListData = useSelector(
    (store) => store.getAllAccountByDomainState?.projectsList
  );
  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );
  const filterParameters = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParameters
  );
  const totalPages = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.totalPages
  );
  const adminUserId = useSelector(
    (store) => store.loginState?.logInData?.userDetail?._id
  );
  // console.log("fnbb", totalPages);
  // const isAllChecked = useSelector((store) => store.IUserState);
  const isAllChecked = useSelector((store) => store.IUserState.data);
  console.log("fnbbb ", isAllChecked);
  const dispatch = useDispatch();
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const clearDataOnUnmount = () => {
    clearAllFilterParameters(dispatch);
  };

  // useEffect(() => {
  //   return () => clearDataOnUnmount();
  // },[]);

  useEffect(() => {
    if (tableDataByStore) {
      setTableData((prev) => [...tableDataByStore]);
    } else {
      setTableData((prev) => []);
    }
    setNameSortingOrder((prev) => null);
    setEmailSortingOrder((prev) => null);
  }, [tableDataByStore]);

  // Api call on state update
  useEffect(() => {
    console.log("api updated");
    if (searchName.length === 0) getTablePgination();
    else setSearchName("");
    if (pageNo !== 1) setPageNo(1);
  }, [apiUpdate]);

  useEffect(() => {
    getTablePgination();
  }, [pageNo]);

  useEffect(() => {
    if (searchName.length >= 3 || searchName.length === 0) getTablePgination();
  }, [searchName]);

  const setSearchDebounce = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      clearAllFilterParameters(dispatch);
      setPageNo(1);
    }
  };

  // const debounce = useDebounce(setSearchDebounce, 1000);

  // useEffect(() => {
  //   if (searchName?.length) {
  //     setTableData((prev) => searchData);
  //     // setIsLoading(prev => "loaded")
  //   } else {
  //     // if(tableDataByStore?.length){
  //     // setTableData(
  //     //   prev => [...tableDataByStore]
  //     // )
  //     // // setIsLoading(prev => "loaded")
  //     // }
  //     setTableData((prev) => [...tableDataByStore]);
  //     setIsLoading((prev) => "Loaded");
  //   }
  // }, [searchData, tableDataByStore, searchName]);
  // To open update user details model
  const handleClickUpdateUserDetail = (i) => {
    setSearchName("");
    // console.log("ahsnle click");
    const temp = tableData[i];

    setToUserUpdateData(temp);

    setIsUpdateUserModel((previousState) => true);
    console.log("ok random 2");
  };

  // To Cancel update user model
  const handleClickCancelUpdateModel = () => {
    setIsUpdateUserModel((previousState) => false);
  };

  //to handle message modal
  const handleMessage = (temp) => {
    setMessageModal((prev) => temp);
  };

  const handleAddUser = (temp) => {
    if (userId?.length === 0) setShowAddUser((prev) => temp);
  };

  // to handle sorting
  const handleNameSortingOrder = () => {
    setEmailSortingOrder(null);
    if (nameSortingOrder === null || nameSortingOrder === "desc")
      setNameSortingOrder("asc");
    else if (nameSortingOrder === "asc") setNameSortingOrder("desc");
  };
  useEffect(() => {
    if (nameSortingOrder === "asc") {
      const data = tableData.sort((a, b) => a.name?.localeCompare(b.name));
      setTableData((prev) => [...data]);
    } else if (nameSortingOrder === "desc") {
      const data = tableData.sort((a, b) => b.name?.localeCompare(a.name));
      setTableData((prev) => [...data]);
    }
  }, [nameSortingOrder]);

  const handleEmailSortingOrder = () => {
    setNameSortingOrder(null);
    if (emailSortingOrder === null || emailSortingOrder === "desc")
      setEmailSortingOrder("asc");
    else if (emailSortingOrder === "asc") setEmailSortingOrder("desc");
  };
  useEffect(() => {
    if (emailSortingOrder === "asc") {
      const data = tableData.sort((a, b) => a.email?.localeCompare(b.email));
      setTableData((prev) => [...data]);
    } else if (emailSortingOrder === "desc") {
      const data = tableData.sort((a, b) => b.email?.localeCompare(a.email));
      setTableData((prev) => [...data]);
    }
  }, [emailSortingOrder]);

  //Get all language dropdowndata
  useEffect(async () => {
    getAllLangauge(dispatch);
    const allRole = await getAllTableDataRole(dispatch);
    setDropDownOptions((prev) => {
      return { ...prev, role: allRole };
    });
  }, []);

  // //Get all language dropdowndata
  // useEffect(() => {
  //   getAllLangauge(dispatch);
  //   return () => clearDataOnUnmount();
  // }, []);

  //handle dropDown
  useEffect(async () => {
    // Api to fetch drop down options
    let arr = allLanguageList?.map((e) => {
      return e?.name;
    });
    setAllLanguage((prev) => arr);
    // Api to fetch drop down options
    const language = arr;
    setDropDownOptions((prev) => {
      return { ...prev, language };
    });
  }, [allLanguageList]);

  const handleDropDownClick = (e) => {
    if (e === null) {
      setDropDownVisible((prev) => null);
    } else {
      const column = e.target.parentNode.dataset.column;
      setDropDownVisible((prev) => (prev === column ? null : column));
    }
  };
  //set the role
  useEffect(() => {
    if (props.role) {
      console.log("role", props.role, tableData);
      setFilterParameters(dispatch, [props.role], "role");
    }
  }, [props.role, tableDataByStore, tableData, dispatch]);
  const handleDropDownSelectChange = (selectedData, columnName) => {
    setFilterParameters(dispatch, selectedData, columnName);
  };
  const handleDropdownCloseClick = (columnName) => {
    const selectedData = [];
    setFilterParameters(dispatch, selectedData, columnName);
    setDropDownVisible((prev) => null);
  };
  const handleDropdownTickClick = () => {
    setPageNo(1);
    setDropDownVisible(null);
    setSearchName("");
    if (searchName?.length === 0) {
      getTablePgination();
    }
  };

  // useEffect(()=>{
  //   if( _isMounted.current && dropDownVisible === null){
  //     setSearchName("");
  //     setPageNo(1);
  //     if (searchName?.length === 0) { getTablePgination(); }

  //   } else {
  //     _isMounted.current = true;
  //   }
  // }, [dropDownVisible]); // fetches table data

  const getTablePgination = async () => {
    const limit = 13;

    if (Object.keys(filterParameters).length !== 0) {
      setIsLoading((prev) => null);
      const newFilterParams = { ...filterParameters };
      newFilterParams.role = [props.role];
      const res = await getTableDataAllTypes(
        dispatch,
        pageNo,
        limit,
        filterParameters
      );
      res ? setIsLoading((prev) => "Loaded") : setIsLoading((prev) => null);
    } else {
      setIsLoading((prev) => null);
      const bodyDataSearchName = searchName.length < 3 ? "" : searchName;
      const data = {
        page: pageNo,
        limit: 13,
        userName: bodyDataSearchName,
        role: [props.role],
      };
      // const res = await getSearchedData(dispatch, data);
      const res = await getTableDataAllTypes(dispatch, pageNo, limit, data);
      res ? setIsLoading((prev) => "Loaded") : setIsLoading((prev) => null);
    }
    // if (res === undefined) {
    //   setMsgData((prev) => true);
    //   //setIsLoading((prev) => "loaded");
    // } else {
    //   //setTotalNoOfPage(res?.data?.data?.totalPages);
    //   //setTotalNoOfPage(prev => totalPages);
    //   setIsLoading((prev) => "loaded");
    // }
  };

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
  };

  const refreshData = async () => {
    // let data = {
    //   page: 1,
    //   limit: 13,
    // };

    // let result = await getSearchedData(data);

    // if (result) {
    //   setTotalNoOfPage(result?.data?.data?.totalPages);
    //   setSearchData((prev) => result.data?.data?.results);
    // }

    getTablePgination();
  };

  // useEffect(async () => {
  //   if (searchName?.length) {
  //     let data = {
  //       name: searchName,

  //       page: 1,

  //       limit: 13,
  //     };

  //     let result = await getSearchedData(data);

  //     if (result) {
  //       setTotalNoOfPage(result?.data?.data?.totalPages);
  //       setSearchData((prev) => result.data?.data?.results);
  //     }
  //   }
  // }, [searchName]);

  const topushDataOnApi = async () => {
    let headers = {
      "Content-Type": "application/json",
      userId: "61bf0db859f3031717b673a8",
    };
    let data = {
      userId: userId,
    };
    let projId = projectsListData
      ?.map((each) => {
        if (each.name == AccountNameRedux) {
          return each.id;
        }
      })
      .filter((e) => e);

    if (projectIdList?.length) {
      let result = await addUserProject(
        projectDetailId,
        headers,
        data,
        dispatch,
        adminUserId
      );
      if (result?.status === 200) {
        clearAllFilterParameters(dispatch);
        props.toPrevPage(true);
      } else {
        props.toPrevPage(false);
      }
    }
  };

  const handleEdit = (e, id) => {
    // console.log(dataa, "data");
    if (e.target.checked) {
      setUserId([...userId, id]);
    } else {
      let temp = userId;
      const idx = temp.indexOf(id);
      if (idx > -1) {
        temp.splice(idx, 1);
      }
      setUserId((prev) => [...temp]);
    }
  };

  const isLoadingApi = useSelector((store) => {
    return store.popUpState.isLoading;
  });

  const Account = useSelector(
    (store) => store.getAllAccountByDomainState?.projectDetail?.name
  );
  // console.log("Account", Account);

  return (
    <div className="childDiv AddUserOptionPageWrapper">
      <div className="headerDiv">
        <div className="firstHeaderDiv">
          <div
            className="gobackDiv"
            onClick={() => {
              clearAllFilterParameters(dispatch);
              check(dispatch, []);
              props.toPrevPage(true);
            }}
          >
            <img src={goBackIcon} className="goBackIcon"></img>
          </div>
          <div className="userParaDiv">
            <p className="userPara">User list</p>
          </div>
          <div className="searchBoxContainer">
            <SearchBox
              className="reportTableSearchInput"
              parentClass="InputeSearchBoxDiv"
              type="search"
              placeholder="Search User"
              imgSrcLeft={SearchIcon}
              value={searchName}
              imageClickLeft={() => {}}
              onChangeValue={(e) => {
                handleSearchNameChange(e);
                setSearchDebounce(e);
              }}
            />
          </div>
        </div>
        <div className="secondHeaderDiv">
          <div
            onClick={() => {
              if (!isLoadingApi) {
                topushDataOnApi();
                check(dispatch, []);
              }
            }}
            className={`addUserDiv ${
              showAddUser ? (isLoadingApi ? "btnDisable" : "") : "btnDisable"
            } `}
          >
            <AddCard
              extraClass={`addCardColor ${showAddUser && "addUserDiv--blue"}`}
              extraStyleName={`${
                showAddUser
                  ? "addUserStyleName--white"
                  : "addUserStyleName--grey"
              }`}
              icon={showAddUser ? AddUserIconWhite : AdduserIconGrey}
            />
          </div>
          <div
            onClick={() => {
              setCreateModal(true);
              setSearchName("");
            }}
            className="createUserDiv"
          >
            <AddCard
              icon={createIconGrey}
              name="Create User"
              extraClass="createUserExtraClass "
              extraStyleName="createUserExtraStyleName"
            />
          </div>
        </div>
      </div>
      {/* {userId?.length && messageModal ?
        <div style={{ width: "100%" }}>
          <MessageModal
            handleCancel={() => {
              setMessageModal(false)
            }}
            message="Add user which has role Campaign Analyst"
          />
        </div> : null} */}
      {/* {TableConstant((e , id ) => {return  handleEdit(e , id) , handleClickUpdateUserDetail(id) }) } */}
      <div className="tableContainerDiv">
        <TableSaarthi
          data={tableData?.length ? tableData : []}
          cols={TableConstant(
            handleEdit,
            handleClickUpdateUserDetail,
            handleMessage,
            handleAddUser,
            nameSortingOrder,
            handleNameSortingOrder,
            emailSortingOrder,
            handleEmailSortingOrder,
            handleDropDownClick,
            dropDownOptions,
            dropDownVisible,
            handleDropDownSelectChange,
            handleDropdownTickClick,
            handleDropdownCloseClick,
            isLoading,
            tableDataByStore,
            isItFilteredData
          )}
          isLoading={isLoading}
          extraClassTableThead="extraSaarthiTableThead"
          extraClassTBody="extraSaarthiTableTrow"
          extraOuterTable="extraTabledataAbhi"
          extraTableClass="extraTableClass"
        />
      </div>
      {isLoading && tableDataByStore?.length > 0 && (
        <Pagination
          forcePage={pageNo}
          totalNoOfPage={totalPages}
          handleClickPageNo={(value) => handleClickPageNo(value)}
          // forcePage ={pageNo}
        />
      )}
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

      <Modal
        shown={createModal}
        close={() => {
          setCreateModal(false);
        }}
        extraClassStyleModalContent="ModalWindow"
      >
        {/* <AddUserForm
              handleClickCancelAddUserModel={() => setCreateModal(false)}
             toApiUpdate={(data) => setApiUpdate(data)}
       />*/}
        <CreateUserTableModal
          handleClickCancelAddUserModel={() => setCreateModal(false)}
          toApiUpdate={(data) => setApiUpdate(data)}
          accountName={Account}
          refreshData={() => {
            refreshData();
          }}
        />
      </Modal>

      <Modal
        shown={isUpdateUserModel}
        close={() => {
          setIsUpdateUserModel(false);
        }}
        extraClassStyleModalContent="ModalWindow"
      >
        {/* <UpdateUserCredential
              handleClickCancelUpdateModel={() =>
                handleClickCancelUpdateModel()
              }
              toApiUpdate={(data) => setApiUpdate(data)}
              userToUpdateData={userToUpdateData}
              //handleClickCreateUser={(value) => handleClickCreateUser(value)}
            /> */}
        <ManualEditUserModal
          handleClickCancelUpdateModel={() => handleClickCancelUpdateModel()}
          userToUpdateData={userToUpdateData}
          toApiUpdate={(data) => setApiUpdate(data)}
          refreshData={() => {
            refreshData();
          }}
        />
      </Modal>
    </div>
  );
}

export default AddUserOption;
