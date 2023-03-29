import React, { useEffect, useState, useRef } from "react";
import SearchBox from "../../components/ui-kits/searchBox/SearchBox";
import SearchIcon from "../../assets/searchIcon/searchIconGrey.svg";
import goBackIcon from "../../assets/goBackIcon/goBackIconGrey.svg";
import createColor from "../../assets/projectPageIcon/CreatUserIconGrey.svg";
import "./UserList.css";
import Create from "../../components/create/Create";
import TableSaarthi from "../../components/ui-kits/Table/TableSaarthi/TableSaarthi";
import TableConstant from "./TableConstant";
import { MockData } from "./MockData";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import {
  getAllTabledata,
  getAllTableDataRole,
  setFilterParameters,
  clearAllFilterParameters,
  getTableDataAllTypes,
} from "../../actions/GetAllTabledataApiAction";
import Pagination from "../../components/pagination/Pagination";
import AddUserForm from "../../components/createUserModal/AddUserForm";
import { getSearch, getSearchedData } from "../../actions/AccountApiAction";
import { getAllLangauge } from "../../actions/AssignProject";
import UpdateUserCredential from "../../components/ui-kits/updateusercredential/UpdateUserCredential";
import AddCard from "../../components/projectPageComponent/addUserCard/AddCard";
import CreateUserTableModal from "../../components/createUserTable/CreateUserTable";
import ManualEditUserModal from "../../components/manualEditTable/ManualEditTable";
import useDebounce from "../../components/hooks/useDebounce/UseDebounce";
import Modal from "../../components/ui-kits/modal/Modal";

function UserList(props) {
  const [isLoading, setIsLoading] = useState("loaded");
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState(0);
  const [createModal, setCreateModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState();
  const [tableData, setTableData] = useState();
  const [isUpdateUserModel, setIsUpdateUserModel] = useState(false);
  const [userToUpdateData, setToUserUpdateData] = useState(null);
  const [apiUpdate, setApiUpdate] = useState(false);
  const [sortingVariables, setSortingVariables] = useState({
    column: null,
    order: null,
  });
  const [dropDownVisible, setDropDownVisible] = useState(null);
  const [dropDownOptions, setDropDownOptions] = useState({
    language: [],
    role: [],
    project: [],
  });
  const [allLanguage, setAllLanguage] = useState([]);
  const [dropDownSelectedOptions, setDropDownSelectedOptions] = useState({
    language: [],
    role: [],
    project: [],
  });
  const _isMounted = useRef(false);

  const handleEdit = (item) => () => {
    // write your logic
    // alert(JSON.stringify(item))
  };

  //get data from store
  const tableDataByStore = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.results
  );
  const totalPages = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.totalPages
  );
  const isItFilteredData = useSelector(
    (store) => store.getAllTableDataApiState?.getAllTableData?.isItFilteredData
  );
  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );
  let accountName = sessionStorage.getItem("accountName");
  const filterParameters = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParameters
  );

  const clearDataOnUnmount = () => {
    clearAllFilterParameters(dispatch);
    // console.log("clearAllFilterParameter ran");
  };

  useEffect(() => {
    return () => clearDataOnUnmount();
  }, []);

  const dispatch = useDispatch();

  //Get all language dropdowndata
  useEffect(async () => {
    getAllLangauge(dispatch);
    const allRoles = await getAllTableDataRole(dispatch);
    setDropDownOptions((prev) => {
      return { ...prev, role: allRoles };
    });
  }, []);

  useEffect(() => {
    if (tableDataByStore) {
      setTableData((prev) => [...tableDataByStore]);
    } else {
      setTableData((prev) => []);
    }
  }, [tableDataByStore]);

  // Api call on state update
  useEffect(() => {
    // console.log("api updated");
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
    // setSearchName(e.target.value);
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      clearAllFilterParameters(dispatch);
      setPageNo(1);
    }
  };

  //const debounce = useDebounce(setSearchDebounce, 1000);

  const getTablePgination = async () => {
    const limit = 13;

    if (Object.keys(filterParameters).length !== 0) {
      setIsLoading(null);
      const res = await getTableDataAllTypes(
        dispatch,
        pageNo,
        limit,
        filterParameters
      );
      res ? setIsLoading((prev) => "Loaded") : setIsLoading((prev) => null);
    } else {
      //console.log("getSearchDataran")
      const bodyDataSearchName = searchName.length < 3 ? "" : searchName;
      setIsLoading(null);
      const data = { page: pageNo, limit: 13, userName: bodyDataSearchName };
      const res = await getTableDataAllTypes(dispatch, pageNo, limit, data);
      // const data = { page: pageNo, limit: 13, name: bodyDataSearchName };
      // const res = await getSearchedData(dispatch, data);
      res ? setIsLoading((prev) => "Loaded") : setIsLoading((prev) => null);
    }
    // if (res === undefined) {
    //   setIsLoading((prev) => null);
    // } else {
    //   //setTotalNoOfPage(res?.data?.data?.totalPages);
    //   //setTotalNoOfPage(prev => totalPages);
    //   setIsLoading((prev) => "Loaded");
    // }
  };

  // useEffect(() => {
  //   setIsLoading((prev) => null);
  //   if (searchName?.length) {
  //     setTableData((prev) => searchData);
  //     setIsLoading((prev) => "Loaded");
  //   } else {
  //     if(tableDataByStore?.length && _isMounted.current){
  //       setTableData(
  //         prev => tableDataByStore
  //       )
  //       setIsLoading((prev) => "Loaded");
  //     }
  //     else _isMounted.current = true;
  //     // setTableData((prev) => [...tableDataByStore]);
  //     // setIsLoading((prev) => "Loaded");
  //   }
  // }, [searchData, tableDataByStore]);
  // useEffect(async () => {
  //   let data = {
  //     page: 1,

  //     limit: 13,
  //   };
  //   data.name = searchName
  //   if(_isMounted.current){
  //     setIsLoading(prev => null);
  //   let result = await getSearchedData(dispatch, data);
  //   if (result) {
  //     setTotalNoOfPage(result?.data?.data?.totalPages);
  //     setSearchData((prev) => result.data?.data?.results);
  //     setIsLoading("Loaded");
  //   }
  //   }
  // }, [searchName]);

  //  useEffect(() => {
  //   setIsLoading((prev) => null);
  //   if (searchName?.length) {
  //     setTableData((prev) => searchData);
  //     setIsLoading((prev) => "Loaded");
  //   } else {
  //     // if(tableDataByStore?.length){
  //     // setTableData(
  //     //   prev => tableDataByStore
  //     // )
  //     // setIsLoading((prev) => "Loaded");
  //     // }
  //     if(tableDataByStore){
  //       setTableData((prev) => [...tableDataByStore]);
  //     }
  //     setIsLoading((prev) => "Loaded");
  //   }
  // }, [searchData, tableDataByStore, searchName]);

  const refreshUserList = async () => {
    let data = {
      page: 1,
      limit: 13,
      // name: "",
    };
    let result = await getSearchedData(dispatch, data);
    if (result) {
      setTotalNoOfPage((prev) => result?.data?.data?.totalPages);
      setSearchData((prev) => result.data?.data?.results);
    }
  };

  // useEffect(()=>{
  //   refreshUserList()
  // }, [searchName]);

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
  };

  // To open update user details model
  const handleClickUpdateUserDetail = (i) => {
    // console.log("ok random");
    setSearchName("");
    // console.log(i);
    const temp = tableData[i];
    // console.log(temp, "nithin");
    setToUserUpdateData(temp);
    // console.log(temp);

    setIsUpdateUserModel((previousState) => true);
  };

  // To Cancel update user model
  const handleClickCancelUpdateModel = () => {
    setIsUpdateUserModel((previousState) => false);
  };
  // headSearchContainer

  //handle Sorting
  const handleOnClickSorting = (e) => {
    const column = e.target.parentNode.dataset.column;
    if (sortingVariables.column === column) {
      if (sortingVariables.order === "asc") {
        setSortingVariables((prev) => {
          return { ...prev, column: column, order: "desc" };
        });
      } else {
        setSortingVariables((prev) => {
          return { ...prev, column: column, order: "asc" };
        });
      }
    } else {
      setSortingVariables((prev) => {
        return { ...prev, column: column, order: "asc" };
      });
    }
  };
  useEffect(() => {
    const column = sortingVariables.column;
    let newData;
    if (sortingVariables.order === "asc") {
      newData = tableData?.sort((a, b) => a[column]?.localeCompare(b[column]));
    } else {
      newData = tableData?.sort((a, b) => b[column]?.localeCompare(a[column]));
    }
    if (newData?.length > 0) setTableData((prev) => [...newData]);
  }, [sortingVariables]);

  //handle dropDown
  useEffect(async () => {
    // Api to fetch drop down options
    let arr = allLanguageList?.map((e) => {
      return e?.name;
    });
    setAllLanguage((prev) => arr);
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

  // useEffect(() => {
  //   if (_isMounted.current && dropDownVisible === null) {
  //     setSearchName("");
  //     setPageNo(1);
  //     if (searchName?.length === 0) { getTablePgination(); }

  //   } else {
  //     _isMounted.current = true;
  //   }
  // }, [dropDownVisible]); // fetches table data

  return (
    <div className="childDiv UserListWrapper">
      <div className="headerDiv">
        <div className="FirstDiv">
          <div className="gobackDiv" onClick={() => props.toBackScreen()}>
            <img src={goBackIcon} className="goBackIcon"></img>
          </div>
          <div className="headingDiv">
            <h2>User List</h2>
          </div>
          <div className="searchBoxContainer">
            <SearchBox
              className="reportTableSearchInput"
              parentClass="InputBoxDiv"
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
        <div className="secondSectionDiv">
          <div
            className="craeteUsercontainer"
            onClick={() => {
              setCreateModal(true);
              setSearchName("");
            }}
          >
            {/* <Create createName = "User"
           styleCreateDiv ="styleCreateDiv"
           stylePlusSign = "stylePlusSign"
           styleCreateName ="styleCreateName"
          /> */}
            <AddCard
              extraClass="addCardColor"
              extraStyleName="addStyleName"
              icon={createColor}
              name="Create User"
            />
          </div>
        </div>
      </div>
      <div className="tableDiv">
        <TableSaarthi
          data={tableData?.length ? tableData : []}
          cols={TableConstant(
            handleClickUpdateUserDetail,
            sortingVariables,
            handleOnClickSorting,
            handleDropDownClick,
            dropDownOptions,
            dropDownVisible,
            handleDropDownSelectChange,
            tableDataByStore,
            handleDropdownTickClick,
            handleDropdownCloseClick,
            isLoading,
            isItFilteredData
          )}
          isLoading={isLoading}
          extraClassTableThead="extraSaarthiTableTheadAbhi"
          extraClassTBody="extraSaarthiTableTrowAbhi"
          extraOuterTable="extraTabledataAbhi"
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
          refreshData={() => {
            refreshUserList();
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
        {/*<UpdateUserCredential
            handleClickCancelUpdateModel={() => handleClickCancelUpdateModel()}
            userToUpdateData={userToUpdateData}
            toApiUpdate={(data) => setApiUpdate(data)}
            //handleClickCreateUser={(value) => handleClickCreateUser(value)}
      />*/}
        <ManualEditUserModal
          handleClickCancelUpdateModel={() => handleClickCancelUpdateModel()}
          userToUpdateData={userToUpdateData}
          toApiUpdate={(data) => setApiUpdate(data)}
          refreshData={() => {
            refreshUserList();
          }}
        />
      </Modal>
    </div>
  );
}

export default UserList;
