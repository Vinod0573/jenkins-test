import React, { useEffect, useState, useRef } from "react";
import "./InsideViewProject.css";
import HomeIcon from "../../assets/HomeIcon/HomeIcon.svg";
import TotalCompleteIcon from "../../assets/projectPageIcon/TotalCompleteIcon.svg";
import TotalConversationIcon from "../../assets/projectPageIcon/TotalConversationIcon.svg";
import annotatednewIcon from "../../assets/projectPageIcon/annotated.svg";
import TotalInprogressIcon from "../../assets/projectPageIcon/TotalInprogress.svg";
import TotalUnAssignedIcon from "../../assets/projectPageIcon/TotalUnAssigned.svg";
import AnnotatedIcon from "../../assets/projectPageIcon/AnnotatedIcon.svg";
import SortIcon from "../../assets/tableIcon/SortIcon.svg";
import AscIcon from "../../assets/tableIcon/ascIcon.svg";
import DescIcon from "../../assets/tableIcon/descIcon.svg";
import TotalCountCard from "../../components/projectPageComponent/totalCountCard/TotalCountCard";
import NoUserIcon from "../../assets/projectPageIcon/NoUserIcon.svg";
import cross from "../../assets/projectPageIcon/cross.svg";
// import TotalCountCard from "../../components/ProjectPageComponent/totalCountCard/TotalCountCard";
import DropdownSaarthi from "../../components/ui-kits/dropdownsaarthi2/DropdownSaarthi";
import AssignConversationIcon from "../../assets/projectPageIcon/AssignConversationIcon.svg";
import AddNewUser from "../../assets/projectPageIcon/addNewUserIcon.svg";
import AddCard from "../../components/projectPageComponent/addUserCard/AddCard";
import TableSaarthi from "../../components/ui-kits/Table/TableSaarthi/TableSaarthi";
import { MockData } from "../userListPage/MockData";
import TableConstant from "./TableConstant";
import AddUserOption from "../addUserOptionPage/AddUserOption";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import {
  getAllDataInTableByProject,
  setFilterParameters,
  clearAllFilterParameters,
  getTableDataAllTypes,
  setShowManualUniqueModalAction,
  clearAllFilterParametersMUAction,
} from "../../actions/GetAllTabledataApiAction";
import { getAllConversationData } from "../../actions/GetAllConversationApiAction";
import {
  postAssignConversation,
  postUnAssignConversation,
  postAssignConversationForQc,
  postUnAssignConversationForQc,
} from "../../actions/AssignConversationApiAction";
import { getAllProjectsbyAccount } from "../../actions/GetAllAccountbyDomianApiAction";
import { getAllLangauge } from "../../actions/AssignProject";
import SaveModal from "../../components/saveButtonMsgModal/SaveModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateUserCredential from "../../components/ui-kits/updateusercredential/UpdateUserCredential";
import { useHistory } from "react-router-dom";
import MultiLevel from "../../components/ui-kits/multiLevel/MultiLevel";
import AssignTask from "../../components/assignTaskComponent/AssignTask";
import MultiSelectSimple from "../../components/multiselectsimple/MultiSelectSimple";
import AssignTaskModal from "../../components/assignTaskComponent/manualUnique/ManualUniqueModal";
import ManualEditUserModal from "../../components/manualEditTable/ManualEditTable";
import Pagination from "../../components/pagination/Pagination";
import Modal from "../../components/ui-kits/modal/Modal";
import { setAssignTask } from "../../actions/ManualUniqueAction";
import PageToggler from "../../components/pageTogglerComponent/PageToggler";
import { ProjectAnnotatorTable } from "../../components/projectPageComponent/projectAnnotatorTableComponent/ProjectAnnotatorTableComponent";
import { ProjectQCTable } from "../../components/projectPageComponent/projectQCTableComponent/ProjectQCTableComponent";
import { NoOfPeers } from "../../components/projectPageComponent/noOfPeersComponent/NoOfPeersComponent";

function InsideViewProject() {
  const [selectedDropdown, setSelectedDropdown] = useState();
  const [selectUnAssign, setSelectUnAssign] = useState();
  const [isLoading, setIsLoading] = useState("loaded");
  const [addUserOptionPage, setAddUserOptionPage] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [projectId, setProjectId] = useState({});
  const [mannualUnique, setMannualUnique] = useState([]);
  const [mannualnumber, setMannualNumber] = useState();
  const [isUpdateUserModel, setIsUpdateUserModel] = useState(false);
  const [userToUpdateData, setToUserUpdateData] = useState(null);
  const [hitApi, setHitApi] = useState(false);
  const [apiUpdate, setApiUpdate] = useState(false);
  const [conversationApiupdate, setConversationApiUpdate] = useState(false);
  const [showManualUniqueModal, setShowManualUniqueModal] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(null);
  const [dropDownOptions, setDropDownOptions] = useState({
    language: [],
    status: [],
  });
  const [peers, SetPeers] = useState(0);
  const [dropDownSelectedOptions, setDropDownSelectedOptions] = useState({
    language: [],
    status: [],
  });
  const _isMounted = useRef(false);
  const [sortingVariables, setSortingVariables] = useState({
    column: null,
    order: null,
  });
  const [sortingIconType, setSortingIconType] = useState({
    name: SortIcon,
    email: SortIcon,
  });
  const [tableData, setTableData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [allLanguage, setAllLanguage] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState();
  const [currentTab, setCurrentTab] = useState("Annotator");
  const [tab, setTab] = useState([]);
  let pageLimit = 10;

  // useStates for manual unique table\
  const [dropdownVisibleMU, setDropdownVisibleMU] = useState(null);
  const [sortingIconTypeMU, setSortingIconTypeMU] = useState({
    name: SortIcon,
    email: SortIcon,
  });
  const [tableDataMU, setTableDataMU] = useState([]);
  const [pageNoMU, setPageNoMU] = useState(1);
  const [isLoadingMU, setIsLoadingMU] = useState("loaded");
  const [loader, setLoader] = useState(false);
  // getting all data from store
  const userId = useSelector(
    (state) => state?.loginState?.logInData?.userDetail?._id
  );
  const tableDataByStore = useSelector(
    (store) => store.getAllTableDataApiState?.tableDataByProject?.results
  );
  const tableDataByStoreMU = useSelector(
    (store) => store.getAllTableDataApiState?.tableDataByProjectMU?.results
  );

  // console.log("assigntask", tableDataByStoreMU);
  const totalPageNo = useSelector(
    (store) => store.getAllTableDataApiState?.tableDataByProject?.totalPages
  );
  const totalPageNoMU = useSelector(
    (store) => store.getAllTableDataApiState?.tableDataByProjectMU?.totalPages
  );
  const isItFilteredData = useSelector(
    (store) =>
      store.getAllTableDataApiState?.tableDataByProject?.isItFilteredData
  );
  const isItFilteredDataMU = useSelector(
    (store) =>
      store.getAllTableDataApiState?.tableDataByProjectMU?.isItFilteredData
  );
  const selectedProjectName = useSelector(
    (store) => store.getAllAccountByDomainState?.selectedProjectName
  );
  const selectedAccountName = useSelector(
    (store) => store.getAllAccountByDomainState?.projectDetail?.name
  );
  const AllConversationData = useSelector(
    (store) => store.getAllConversationApiState?.getAllConversationData
  );
  const AccountNameRedux = useSelector(
    (store) => store.getAllAccountByDomainState?.projectDetail?.name
  );
  const allLogInData = useSelector((store) => store.loginState?.logInData);
  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );
  const filterParameters = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParameters
  );
  const filterParametersMU = useSelector(
    (store) => store.getAllTableDataApiState?.dataFilterParametersMU
  );
  const projectDetail = useSelector(
    (store) => store.getAllAccountByDomainState?.projectDetail
  );
  const selectedProjectId = useSelector((store) => {
    const selectedProjectName =
      store.getAllAccountByDomainState.selectedProjectName;
    const id = store.getAllAccountByDomainState.projectsList.filter(
      (e) => e.name === selectedProjectName
    )[0].id;
    return id;
  });
  const assignTaskValue = useSelector((store) => store.AssignTaskState);

  let history = useHistory();

  const clearDataOnUnmount = () => {
    clearAllFilterParameters(dispatch);
    setShowManualUniqueModalAction(dispatch, false);
  };
  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    if (showManualUniqueModal) setPageNoMU((prev) => tempNewPage);
    else setPageNo((prev) => tempNewPage);
  };
  // setting store data in useState
  useEffect(() => {
    return () => clearDataOnUnmount();
  }, []);
  useEffect(() => {
    // the api gives all user response, filter according to data

    if (showManualUniqueModal) {
      let newTableData = [];
      if (tableDataByStoreMU) {
        newTableData = [...tableDataByStoreMU].filter((e) => {
          if (currentTab === "QC") {
            return e.role === "Quality Analyst";
          } else {
            return e.role === "Data Annotator";
          }
        });
      }
      setTableDataMU((prev) => newTableData);
      setSortingIconTypeMU((prev) => {
        return { name: SortIcon, email: SortIcon };
      });
    } else {
      let newTableData = [];
      if (tableDataByStore) {
        newTableData = [...tableDataByStore].filter((e) => {
          if (currentTab === "QC") {
            return e.role === "Quality Analyst";
          } else {
            return e.role === "Data Annotator";
          }
        });
      }
      setTableData((prev) => newTableData);
      setSortingIconType((prev) => {
        return { name: SortIcon, email: SortIcon };
      });
    }
  }, [tableDataByStore, tableDataByStoreMU, currentTab, showManualUniqueModal]);

  let Droparr = ["Auto Assign", "Manual", "Manual-Unique"];
  let DropUnAssign = ["Auto Unassign", "Manual", "Manual-Unique"];
  const dropdownList = {
    optionList: Droparr,
    imgSrcLeft: AssignConversationIcon,
    placeHolderText: "Assign Conversation",
  };
  const dropdownListUn = {
    optionList: DropUnAssign,
    imgSrcLeft: AssignConversationIcon,
    placeHolderText: "UnAssign Conversation",
  };
  //dropdow function
  const OnChangeDropdown = (item) => {
    setSelectedDropdown((prev) => item);
  };
  const OnChangeUnAssign = (item) => {
    setSelectUnAssign((prev) => item);
  };
  useEffect(() => {
    // console.log(currentTab, "current tab");
  }, [currentTab]);

  const getUpdatedPage = async () => {
    showManualUniqueModal
      ? setIsLoadingMU((prev) => null)
      : setIsLoading((prev) => null);
    setTimeout(async () => {
      if (selectedProjectName) {
        pageLimit = 10;
        const pageNumber = showManualUniqueModal ? pageNoMU : pageNo;
        showManualUniqueModal
          ? setIsLoadingMU((prev) => null)
          : setIsLoading((prev) => null);
        const parameters = showManualUniqueModal
          ? filterParametersMU
          : filterParameters;
        const res = await getTableDataAllTypes(
          dispatch,
          pageNumber,
          pageLimit,
          parameters,
          selectedProjectName
        );
        const convData = await getAllConversationData(
          dispatch,
          selectedAccountName,
          selectedProjectName
        );
        const projData = await getAllDataInTableByProject(
          dispatch,
          selectedProjectName
        );

        if (
          res === undefined &&
          convData === undefined &&
          projData === undefined
        ) {
          // if (res === undefined) {
          showManualUniqueModal
            ? setIsLoadingMU((prev) => null)
            : setIsLoading((prev) => null);
        }
      }
      showManualUniqueModal
        ? setIsLoadingMU((prev) => "loaded")
        : setIsLoading((prev) => "loaded");
    }, 5000);
  };
  const dispatch = useDispatch();
  // useEffect(async () => {
  //   // if (selectedProjectName) {
  //   //   setIsLoading((prev) => null);
  //   //   let result = await getAllDataInTableByProject(
  //   //     dispatch,
  //   //     selectedProjectName
  //   //   );

  //   //   if (result) {
  //   //     if (result?.users?.length) {
  //         setIsLoading((prev) => "loaded");
  //       } else {
  //         setIsLoading((prev) => "loaded");
  //       }
  //     }
  //   }
  //   console.log("refreshh");
  //   getTablePagination();
  // }, [
  //   selectedProjectName,
  //   apiUpdate,
  //   // hitApi,
  //   pageNo,
  //   pageNoMU,
  // ]);

  useEffect(async () => {
    if (addUserOptionPage) {
      getUpdatedPage();
    }
  }, [
    addUserOptionPage,
    selectedProjectName,
    pageNo,
    pageNoMU,
    apiUpdate,
    hitApi,
  ]);

  useEffect(() => {
    if (showManualUniqueModal) getTablePagination();
    if (!showManualUniqueModal) {
      clearAllFilterParametersMUAction(dispatch);
      setPageNoMU(1);
      setSortingIconTypeMU((prev) => {
        return { name: SortIcon, email: SortIcon };
      });
      setDropdownVisibleMU(null);
    }
  }, [showManualUniqueModal]);

  const getTablePagination = async () => {
    if (selectedProjectName) {
      pageLimit = 10;
      const pageNumber = showManualUniqueModal ? pageNoMU : pageNo;
      showManualUniqueModal
        ? setIsLoadingMU((prev) => null)
        : setIsLoading((prev) => null);
      const parameters = showManualUniqueModal
        ? filterParametersMU
        : filterParameters;
      const res = await getTableDataAllTypes(
        dispatch,
        pageNumber,
        pageLimit,
        parameters,
        selectedProjectName
      );

      if (res === undefined) {
        showManualUniqueModal
          ? setIsLoadingMU((prev) => null)
          : setIsLoading((prev) => null);
      } else {
        //setTotalNoOfPage(res?.data?.data?.totalPages);
        showManualUniqueModal
          ? setIsLoadingMU((prev) => "loaded")
          : setIsLoading((prev) => "loaded");
      }
    }
  };

  const projectIdStore = async () => {
    let filterId;
    if (tableDataByStore?.length > 0) {
      filterId = tableDataByStore.map((ent) => {
        if (ent.role === "Data Annotator" && ent.isActive) {
          return ent._id;
        }
      });
      filterId = Object.assign({}, filterId);
    }
    setProjectId((prev) => filterId);
  };

  useEffect(() => {
    projectIdStore();
  }, [selectedDropdown, hitApi, selectUnAssign]);

  //Get all language dropdowndata
  useEffect(() => {
    getAllLangauge(dispatch);
  }, []);

  useEffect(() => {
    let arr = allLanguageList?.map((e) => {
      return e?.name;
    });
    setAllLanguage((prev) => arr);
    // Api to fetch drop down options
    const language = arr;
    const status = ["Enabled", "Disabled"];
    setDropDownOptions((prev) => {
      return { ...prev, language, status };
    });
  }, [allLanguageList]);

  let arr = [
    {
      Name: "Total Conversation",
      icon: TotalConversationIcon,
      count: AllConversationData?.totalConversations,
      inProgress: null,
      completed: null,
      isCount: true,
    },
    {
      Name: "Total UnAssigned",
      icon: TotalUnAssignedIcon,
      count: AllConversationData?.totalUnassigned,
      inProgress: null,
      completed: null,
      isCount: true,
    },
    {
      Name: "Annotated",
      icon: annotatednewIcon,
      count: null,
      inProgress: AllConversationData?.totalInProgress,
      completed: AllConversationData?.totalCompleted,
      isCount: false,
    },
    {
      Name: "Reviewed",
      icon: AnnotatedIcon,
      count: null,
      inProgress: AllConversationData?.totalInProgressReview,
      completed: AllConversationData?.totalCompletedReview,
      isCount: false,
    },
  ];
  const toAddUserCallbackPage = (data) => {
    setAddUserOptionPage((prev) => data);
  };

  const handleEdit = (e, item) => {
    let obj = {};
    //Object.keys(objj)[0] === item)
    // could have used simple hashmap
    let objIndex = mannualUnique.findIndex(
      (objj, i) => Object.keys(objj)[0] === item
    );

    if (objIndex > -1) {
      mannualUnique[objIndex][item] = e.target.value || undefined;
      setAssignTask(dispatch, mannualUnique);
    } else {
      obj[item] = e.target.value || undefined;
      setMannualUnique([...mannualUnique, obj]);
      setAssignTask(dispatch, [...mannualUnique, obj]);
    }
  };

  // for auto Assign
  let AssignConversationApi = async () => {
    showManualUniqueModal
      ? setIsLoadingMU((prev) => null)
      : setIsLoading((prev) => null);
    let obj = {};
    // let filterId =  Object.assign([],projectId)
    // tableDataByStore.map((data) => {
    //   if (data.role === "Data Annotator") {
    //     obj[data._id] = 0;
    //   }
    // });
    tableData.map((data) => {
      obj[data._id] = 0;
    });

    let data = {
      action: selectedDropdown,
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: obj,
      assignedBy: allLogInData?.userDetail?._id,
    };

    if (selectedDropdown === "Auto Assign") {
      setSelectedDropdown((prev) => null);
      if (currentTab === "Annotator") {
        let res = await postAssignConversation(data, dispatch);
      } else {
        data.peers = peers || 0;
        await postAssignConversationForQc(data, dispatch);
      }
      await getUpdatedPage();
    }
  };

  //for Auto unAssign
  let UnAssignConversationApi = async () => {
    showManualUniqueModal
      ? setIsLoadingMU((prev) => null)
      : setIsLoading((prev) => null);
    let obj = {};
    // let filterId =  Object.assign([],projectId)
    // tableDataByStore.map((data) => {
    //   if (data.role === "Data Annotator") {
    //     obj[data._id] = 0;
    //   }
    // });
    tableData.map((data) => {
      obj[data._id] = 0;
    });
    let data = {
      action: "auto unassign",
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: obj,
    };

    if (selectUnAssign === "Auto Unassign") {
      setSelectUnAssign((prev) => null);
      // console.log({ role }, "nithin");
      if (currentTab === "Annotator") {
        let res = await postUnAssignConversation(data, dispatch);
        // console.log("unasign anno", currentTab, "current tab");
      } else {
        // data.peers = peers || 0;

        await postUnAssignConversationForQc(data, dispatch);
        // console.log("unasign qc", currentTab, "current tab");
      }
    }
    await getUpdatedPage();
  };
  useEffect(async () => {
    if (DropUnAssign.includes(selectUnAssign)) {
      let resp = await UnAssignConversationApi();
      if (resp) {
        setConversationApiUpdate((prev) => !prev);
      }
    }
  }, [projectId, selectUnAssign]);

  useEffect(async () => {
    if (Droparr.includes(selectedDropdown)) {
      let resp = await AssignConversationApi();
      if (resp) {
        setConversationApiUpdate((prev) => !prev);
      }
      setTimeout(() => {
        const limit = 13;
        getTableDataAllTypes(
          dispatch,
          pageNo,
          limit,
          filterParameters,
          selectedProjectName
        );
        getAllConversationData(
          dispatch,
          selectedAccountName,
          selectedProjectName
        );
      }, 1000);
    }
  }, [projectId, selectedDropdown]);

  const toAssignManualUnique = async () => {
    let uniqueAssign = Object.assign({}, ...mannualUnique);
    let data = {
      action: "manual unique assign",
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: uniqueAssign,
      assignedBy: allLogInData?.userDetail?._id,
    };

    if (selectedDropdown === "Manual-Unique") {
      let result;
      if (currentTab === "Annotator") {
        result = await postAssignConversation(data, dispatch);
        await getUpdatedPage();
      } else {
        data.peers = peers || 0;
        result = await postAssignConversationForQc(data, dispatch);
        await getUpdatedPage();
      }
      if (result) {
        setShowManualUniqueModal((prev) => false);
        setShowManualUniqueModalAction(dispatch, false);
        setShowSaveButton((prev) => false);
        setConversationApiUpdate((prev) => !prev);
        setSelectedDropdown((prev) => null);
      } else {
        setShowManualUniqueModal((prev) => false);
        setShowManualUniqueModalAction(dispatch, false);
      }
    }
  };
  // for Manual unique unAssign
  const toUnAssignManualUnique = async () => {
    let uniqueAssign = Object.assign({}, ...mannualUnique);
    let data = {
      action: "manual unique unassign",
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: uniqueAssign,
    };
    if (selectUnAssign === "Manual-Unique") {
      let result;
      // console.log(role, "nithin");
      if (currentTab === "Annotator") {
        result = await postUnAssignConversation(data, dispatch);
        // console.log("unasign annot", currentTab, "current tab");
      } else {
        result = await postUnAssignConversationForQc(data, dispatch);
        // console.log("unasign qc", currentTab, "current tab");
      }
      if (result) {
        setShowSaveButton((prev) => false);
        setConversationApiUpdate((prev) => !prev);
        setSelectUnAssign((prev) => null);
        setShowManualUniqueModal((prev) => false);
        setShowManualUniqueModalAction(dispatch, false);
      } else {
        setShowManualUniqueModal((prev) => false);
        setShowManualUniqueModalAction(dispatch, false);
      }
    }
    await getUpdatedPage();
  };

  //For Mannual Assign
  const dataAssignedMannual = async (a) => {
    let obj = {};
    let filterId = Object.assign([], projectId);
    filterId.map((data) => {
      obj[data] = a;
    });

    let data = {
      action: "manual assign",
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: obj,
      manualCount: a,
      assignedBy: allLogInData?.userDetail?._id,
    };
    if (currentTab === "Annotator") {
      await postAssignConversation(data, dispatch);
    } else {
      await postAssignConversationForQc(data, dispatch);
    }
    await getUpdatedPage();
  };
  useEffect(() => {
    // console.log(projectId, projectIdStore, "project idx");
  }, [projectId, projectIdStore]);
  //For Manual UnAssign
  const dataUnAssignedMannual = async (a) => {
    let obj = {};
    let filterId = Object.assign([], projectId);

    filterId.map((data) => {
      obj[data] = a;
    });

    let data = {
      action: "manual unassign",
      project: selectedProjectName,
      accountName: AccountNameRedux,
      uniqueAssignCount: obj,
      manualCount: a,
    };
    if (currentTab === "Annotator") {
      await postUnAssignConversation(data, dispatch);
      // console.log("unasign anno", currentTab, "current tab");
    } else {
      await postUnAssignConversationForQc(data, dispatch);
      // console.log("unasign qc", currentTab, "current tab");
    }
    await getUpdatedPage();
  };

  const refreshData = () => {
    getUpdatedPage();
  };

  useEffect(async () => {
    if (mannualnumber?.length && selectedDropdown === "Manual") {
      let res = await dataAssignedMannual(mannualnumber);
      if (res) {
        setMannualNumber((prev) => null);
        setConversationApiUpdate((prev) => !prev);
      }
      setSelectedDropdown((prev) => null);
    } else if (mannualnumber?.length && selectUnAssign === "Manual") {
      let res = await dataUnAssignedMannual(mannualnumber);
      if (res) {
        setConversationApiUpdate((prev) => !prev);
        setMannualNumber((prev) => null);
      }
      setSelectUnAssign((prev) => null);
    }
  }, [mannualnumber, selectUnAssign]);

  useEffect(() => {
    setShowSaveButton((prev) => true);
  }, [selectedDropdown]);
  //get total conversation
  useEffect(() => {
    if (selectedAccountName) {
      getAllConversationData(
        dispatch,
        selectedAccountName,
        selectedProjectName
      );
    }
  }, [selectedAccountName, conversationApiupdate]);
  // To open update user details model
  const handleClickUpdateUserDetail = async (id) => {
    const temp =
      tableDataByStore[tableDataByStore.findIndex((e) => e._id === id)];
    // console.log(tableDataByStore, "temp", temp, tableData, "bithin");
    setToUserUpdateData(temp);
    setIsUpdateUserModel((previousState) => true);
    // await getUpdatedPage();refreshPagetab
  };

  // To Cancel update user model
  const handleClickCancelUpdateModel = () => {
    setIsUpdateUserModel((previousState) => false);
  };

  const handleMannualNumber = (num) => {
    setMannualNumber((prev) => num);
  };
  // console.log(tableDataByStore , "data from store")
  // console.log("all coversation Id" , projectId)
  // console.log("dadadad" , )
  // to push on account page
  const pushHomePage = () => {
    getAllProjectsbyAccount(dispatch, projectDetail, history);
    history.push("/projectpage");
  };

  // let role = window.sessionStorage.getItem("role");
  /**
   * @type {"Data Annotator" | "Quality Analyst" | "Annotator Admin"}
   *  Data Annotator / Quality Analyst
   *  */
  const role = useSelector(
    (state) => state?.loginState?.logInData?.userDetail?.role
  );
  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

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
    setIsLoadingMU((prev) => null);
    let newData;
    if (showManualUniqueModal) {
      // sorting data
      if (sortingVariables.order === "asc") {
        newData = tableDataMU?.sort((a, b) =>
          a[column]?.localeCompare(b[column])
        );
      } else if (sortingVariables.order === "desc") {
        newData = tableDataMU?.sort((a, b) =>
          b[column]?.localeCompare(a[column])
        );
      }
      if (newData?.length > 0) setTableDataMU((prev) => [...newData]);
    } else {
      // sorting data
      if (sortingVariables.order === "asc") {
        newData = tableData?.sort((a, b) =>
          a[column]?.localeCompare(b[column])
        );
      } else if (sortingVariables.order === "desc") {
        newData = tableData?.sort((a, b) =>
          b[column]?.localeCompare(a[column])
        );
      }
      if (newData?.length > 0) setTableData((prev) => [...newData]);
    }
    // sortingIconType changes
    const icon = sortingVariables.order === "asc" ? AscIcon : DescIcon;
    let newIconType = { name: SortIcon, email: SortIcon };
    if (column === "name") {
      newIconType = { name: icon, email: SortIcon };
    } else if (column === "email") {
      newIconType = { name: SortIcon, email: icon };
    }
    if (showManualUniqueModal)
      setSortingIconTypeMU((prev) => {
        return { ...newIconType };
      });
    else
      setSortingIconType((prev) => {
        return { ...newIconType };
      });
    setIsLoadingMU((prev) => "loaded");
  }, [sortingVariables]);

  //handle dropDown
  useEffect(() => {
    const closeDropdown = (e) => {
      const multiSelect =
        document.querySelector(
          ".manualUniqueModal .multiSelectDropDownContainer"
        ) ||
        document.querySelector(
          ".InsideViewProjectWrapper .multiSelectDropDownContainer"
        );
      if (
        !e.target.classList.contains("dropDownIcon") &&
        multiSelect &&
        !multiSelect?.contains(e.target)
      ) {
        handleDropDownClick(null);
      }
    };
    document.addEventListener("click", (e) => closeDropdown(e));
    return document.removeEventListener("click", (e) => closeDropdown(e));
  }, []); // closes the dropdown when clicked outside.

  const handleDropDownClick = (e) => {
    if (e === null) {
      setDropDownVisible((prev) => null);
      setDropdownVisibleMU((prev) => null);
    } else {
      const column = e.target.parentNode.dataset.column;
      if (showManualUniqueModal)
        setDropdownVisibleMU((prev) => (prev === column ? null : column));
      else setDropDownVisible((prev) => (prev === column ? null : column));
    }
  };

  const handleDropDownSelectChange = (selectedData, columnName) => {
    setFilterParameters(dispatch, selectedData, columnName);
  };
  const handleDropdownCloseClick = (columnName) => {
    const selectedData = [];
    setFilterParameters(dispatch, selectedData, columnName);
    if (showManualUniqueModal) setDropdownVisibleMU((prev) => null);
    else setDropDownVisible((prev) => null);
  };
  const handleDropdownTickClick = () => {
    if (showManualUniqueModal) {
      setPageNoMU(1);
      setDropdownVisibleMU(null);
    } else {
      setPageNo(1);
      setDropDownVisible(null);
    }
    if (pageNo === 1) getTablePagination();
  };

  const isLoadingDone = useSelector((store) => {
    return store.popUpState.isLoading;
  });

  // useEffect(() => {
  //   if (_isMounted.current && dropDownVisible === null) {
  //     // API to get filtered data
  //     setPageNo(1);
  //     getTablePagination();
  //   } else {
  //     _isMounted.current = true;
  //   }
  // }, [dropDownVisible]); // Calls API whenever dropdown is closed

  // console.log("gg", currentTab);

  useEffect(() => {
    if (tab.length > 0) {
      setCurrentTab(tab[0].name);
    }
  }, []);

  const tabs = [
    {
      name: "Project",
      isVisible: true,
      moduleTabs: [
        {
          _id: "63a2ea5692d1681f1e5d9c94",
          name: "Annotator",
          isVisible: true,
        },
        {
          _id: "63a2ea5692d1681f1e5d9c95",
          name: "QC",
          isVisible: true,
        },
      ],
    },
  ];

  const userConfig = {
    project: {
      name: "Project",
      subModule: {
        annotator: { name: "Annotator" },
        qc: { name: "QC" },
      },
    },
  };

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      const modules = tabs[0]?.moduleTabs.flatMap((e) => {
        if (e.isVisible) {
          switch (e.name) {
            case userConfig.project.subModule.annotator.name:
              return [
                {
                  name: e.name,
                  element: (
                    <ProjectAnnotatorTable
                    // data={tableData?.length > 0 ? tableData : []}
                    // isLoading={isLoading}
                    // cols={TableConstant(
                    //   handleEdit,
                    //   selectedDropdown,
                    //   selectUnAssign,
                    //   showManualUniqueModal,
                    //   handleClickUpdateUserDetail,
                    //   setHitApi,
                    //   handleDropDownClick,
                    //   dropDownOptions,
                    //   dropDownVisible,
                    //   handleDropDownSelectChange,
                    //   sortingIconType,
                    //   handleOnClickSorting,
                    //   tableDataByStore,
                    //   filterParameters,
                    //   pageLimit,
                    //   handleDropdownTickClick,
                    //   handleDropdownCloseClick,
                    //   false, // boolean to showEditIcon (opposite)
                    //   isLoading,
                    //   isItFilteredData,
                    //   assignTaskValue
                    // )}
                    // extraClassTableThead="extraSaarthiTableThead"
                    // extraClassTBody="extraSaarthiTableTrow"
                    // extraOuterTable="extraTabledataAbhi"
                    // noData={<NoUserAdded />}
                    // pageNo={pageNo}
                    // tableDataByStore={tableDataByStore}
                    // forcePage={pageNo}
                    // totalNoOfPage={totalPageNo}
                    // handleClickPageNo={(value) => handleClickPageNo(value)}
                    />
                  ),
                },
              ];
            case userConfig.project.subModule.qc.name:
              return [
                {
                  name: e.name,
                  element: (
                    <ProjectQCTable
                    // data={tableData?.length > 0 ? tableData : []}
                    // isLoading={isLoading}
                    // cols={TableConstant(
                    //   handleEdit,
                    //   selectedDropdown,
                    //   selectUnAssign,
                    //   showManualUniqueModal,
                    //   handleClickUpdateUserDetail,
                    //   setHitApi,
                    //   handleDropDownClick,
                    //   dropDownOptions,
                    //   dropDownVisible,
                    //   handleDropDownSelectChange,
                    //   sortingIconType,
                    //   handleOnClickSorting,
                    //   tableDataByStore,
                    //   filterParameters,
                    //   pageLimit,
                    //   handleDropdownTickClick,
                    //   handleDropdownCloseClick,
                    //   false, // boolean to showEditIcon (opposite)
                    //   isLoading,
                    //   isItFilteredData,
                    //   assignTaskValue
                    // )}
                    // extraClassTableThead="extraSaarthiTableThead"
                    // extraClassTBody="extraSaarthiTableTrow"
                    // extraOuterTable="extraTabledataAbhi"
                    // noData={<NoUserAdded />}
                    // pageNo={pageNo}
                    // tableDataByStore={tableDataByStore}
                    // forcePage={pageNo}
                    // totalNoOfPage={totalPageNo}
                    // handleClickPageNo={(value) => handleClickPageNo(value)}
                    />
                  ),
                },
              ];
            default:
              return [{ name: e.name, element: <></> }];
          }
        }
      });
      setTab(modules ? modules : []);
    }
  }, []);

  return (
    <div>
      {addUserOptionPage ? (
        <div className="childDiv InsideViewProjectWrapper">
          <div className="InsideViewProjectDiv">
            <div className="headDiv">
              <div className="IconDiv">
                <img
                  className="imgHome"
                  src={HomeIcon}
                  onClick={() => pushHomePage()}
                  alt="home"
                ></img>
              </div>
              <div className="HeadingDiv">
                <p className="ParaHead">{selectedProjectName}</p>
              </div>
            </div>
            {/* {isLoading && tableDataByStore?.length > 0 && ( */}
            <div className="countCardContainer">
              {arr.map((e) => {
                return (
                  <TotalCountCard
                    Name={e.Name}
                    icon={e.icon}
                    count={e.count}
                    inProgress={e.inProgress}
                    completed={e.completed}
                    isCount={e.isCount}
                  />
                );
              })}
            </div>
            {/* )} */}
            {/* <div className="dropdownContainerDiv">
          {(selectedDropdown=== "Manual-Unique" || selectUnAssign === "Manual-Unique" ) && showSaveButton  ? <div style={{ width: "100%"}}><SaveModal
            handleCancel = {() => setShowSaveButton(false)}
            handleSave ={() => {selectedDropdown=== "Manual-Unique"? toAssignManualUnique(): toUnAssignManualUnique() }}
          />  </div>:
          <div className="divFlex">
          <div>
            <DropdownSaarthi
              droplist={dropdownList}
              placeHolderText={
                selectedDropdown ? selectedDropdown : " -select-"
              }
              loading={() => false}
              selectedItem={(item) => OnChangeDropdown(item)}
              extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
              extraClassToBeSelectedArea={"extraStyleBeAbhi"}
              extraClassDropdownSearchArea={"extraSearchArea"}
              mannualData = { handleMannualNumber}
            />
          </div>
          <div>
            <DropdownSaarthi
              droplist={dropdownListUn}
              placeHolderText={
                selectedDropdown ? selectedDropdown : " -select-"
              }
              loading={() => false}
              selectedItem={(item) => OnChangeUnAssign(item)}
              extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
              extraClassToBeSelectedArea={"extraStyleBeAbhi"}
              extraClassDropdownSearchArea={"extraSearchArea"}
              mannualData = { handleMannualNumber}
            />
          </div>
          </div>
        }
        </div> */}
            <div className="TopTableContainerDiv">
              <div className="dropdownContainerDiv">
                {tableDataByStore?.length > 0 && currentTab === "QC" ? (
                  <div className="divFlex">
                    <NoOfPeers setPeers={SetPeers} />
                  </div>
                ) : (
                  ""
                )}

                {tableDataByStore?.length > 0 ? (
                  <div className="divFlex">
                    <AssignTask
                      assignTaskName={
                        currentTab === "Annotator"
                          ? ["Auto Assign", "Manual", "Manual-Unique"]
                          : peers > 0
                          ? ["Auto Assign", "Manual"]
                          : ["Auto Assign", "Manual", "Manual-Unique"]
                      }
                      unAssignTaskName={
                        currentTab === "Annotator"
                          ? ["Auto Unassign", "Manual", "Manual-Unique"]
                          : peers > 0
                          ? ["Auto Unassign", "Manual"]
                          : ["Auto Unassign", "Manual", "Manual-Unique"]
                      }
                      selectedTask={(data1, data) => {
                        if (data == "Manual-Unique") {
                          setShowManualUniqueModal((prev) => true);
                          setShowManualUniqueModalAction(dispatch, true);
                          if (data1 == "Unassign Conversation") {
                            setSelectUnAssign((prev) => data);
                          } else {
                            setSelectedDropdown((prev) => data);
                          }
                        } else {
                          if (data1 == "Unassign Conversation") {
                            setSelectUnAssign((prev) => data);
                          } else {
                            setSelectedDropdown((prev) => data);
                          }
                        }
                      }}
                      manual={(number) => {
                        if (number) {
                          setMannualNumber(number);
                        }
                      }}
                      dropdownName={selectedDropdown}
                      manualValue={mannualnumber}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="divFlex"
                  onClick={() => {
                    setAddUserOptionPage((prev) => false);
                    clearDataOnUnmount();
                  }}
                >
                  <AddCard
                    icon={AddNewUser}
                    extraClass="addeNewUserExtraClass"
                  />
                </div>
              </div>
              <div className="PageTogglerDiv">
                <PageToggler
                  current={currentTab}
                  innerComponents={[
                    { name: "Annotator", element: <></> },
                    { name: "QC", element: <></> },
                  ]}
                  switchTab={(e) => {
                    setCurrentTab(e);
                  }}
                />
              </div>
            </div>
            <div className="TableDiv">
              <TableSaarthi
                data={tableData?.length > 0 ? tableData : []}
                cols={TableConstant(
                  handleEdit,
                  selectedDropdown,
                  selectUnAssign,
                  showManualUniqueModal,
                  handleClickUpdateUserDetail,
                  setHitApi,
                  handleDropDownClick,
                  dropDownOptions,
                  dropDownVisible,
                  handleDropDownSelectChange,
                  sortingIconType,
                  handleOnClickSorting,
                  tableDataByStore,
                  filterParameters,
                  pageLimit,
                  handleDropdownTickClick,
                  handleDropdownCloseClick,
                  false, // boolean to showEditIcon (opposite)
                  isLoading,
                  isItFilteredData,
                  assignTaskValue,
                  currentTab,
                  selectedProjectId,
                  getUpdatedPage
                )}
                isLoading={isLoading}
                extraClassTableThead="extraSaarthiTableThead"
                extraClassTBody="extraSaarthiTableTrow"
                extraOuterTable="extraTabledataAbhi"
                noData={<NoUserAdded />}
                pageNo={pageNo}
              />
              {isLoading && tableDataByStore?.length > 0 && (
                <Pagination
                  forcePage={pageNo}
                  totalNoOfPage={totalPageNo}
                  handleClickPageNo={(value) => handleClickPageNo(value)}
                />
              )}
            </div>

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
                userToUpdateData={userToUpdateData}
                toApiUpdate = {(data) => setApiUpdate(data)}
                //handleClickCreateUser={(value) => handleClickCreateUser(value)}
              /> */}
              <ManualEditUserModal
                handleClickCancelUpdateModel={() => {
                  handleClickCancelUpdateModel();
                }}
                userToUpdateData={userToUpdateData}
                toApiUpdate={(data) => setApiUpdate(data)}
                hideAssignTask={false}
                refreshData={() => {
                  refreshData();
                }}
              />
            </Modal>
          </div>
        </div>
      ) : (
        <AddUserOption
          role={
            currentTab === "Annotator"
              ? "Data Annotator"
              : currentTab === "QC"
              ? "Quality Analyst"
              : null
          }
          toPrevPage={toAddUserCallbackPage}
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

      {showManualUniqueModal && (
        <div className="manualUniqueModal InsideViewProjectDiv">
          <div className="showModalBlur">
            <div className="manualUniqueModalWrapper">
              <div className="manualUniqueModalDiv">
                <div className="closeModal">
                  <div className="closeIcon">
                    <img
                      src={cross}
                      onClick={() => {
                        setMannualUnique([]);
                        setAssignTask(dispatch, []);
                        setShowManualUniqueModal((prev) => false);
                        setShowManualUniqueModalAction(dispatch, false);
                      }}
                      alt="cross"
                    />
                  </div>
                </div>
                <div className="manual-unique-header">Manual unique</div>
                <div className="TableDiv">
                  <TableSaarthi
                    data={tableDataMU?.length ? tableDataMU : []}
                    cols={TableConstant(
                      handleEdit,
                      selectedDropdown,
                      selectUnAssign,
                      showManualUniqueModal,
                      handleClickUpdateUserDetail,
                      setHitApi,
                      handleDropDownClick,
                      dropDownOptions,
                      dropdownVisibleMU,
                      handleDropDownSelectChange,
                      sortingIconTypeMU,
                      handleOnClickSorting,
                      tableDataByStoreMU,
                      filterParametersMU,
                      pageLimit,
                      handleDropdownTickClick,
                      handleDropdownCloseClick,
                      showManualUniqueModal,
                      isLoadingMU,
                      isItFilteredDataMU,
                      assignTaskValue
                    )}
                    isLoading={isLoadingMU}
                    extraClassTableThead="extraSaarthiTableThead"
                    extraClassTBody="extraSaarthiTableTrow"
                    extraOuterTable="extraTabledataAbhi"
                    noData={<NoUserAdded />}
                    pageNo={pageNoMU}
                  />
                  {isLoading && tableDataByStoreMU?.length > 0 && (
                    <Pagination
                      forcePage={pageNoMU}
                      totalNoOfPage={totalPageNoMU}
                      handleClickPageNo={(value) => handleClickPageNo(value)}
                    />
                  )}
                </div>
                <div
                  className={`manual-unique-footer ${
                    isLoadingDone ? "DisabledDone" : ""
                  }`}
                >
                  <div
                    onClick={() => {
                      if (!isLoadingDone) {
                        if (selectedDropdown === "Manual-Unique") {
                          toAssignManualUnique();
                          setMannualUnique([]);
                          setAssignTask(dispatch, []);
                        } else {
                          toUnAssignManualUnique();
                          setMannualUnique([]);
                          setAssignTask(dispatch, []);
                        }
                      }
                    }}
                  >
                    Done
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const NoUserAdded = () => {
  return (
    <div className="noUserAddedDiv">
      <img className="noUserIcon" src={NoUserIcon} alt="No User" />
      <p className="noUserText">
        Ups!... Looks like you haven’t add any user to this project, click on
        add user.
      </p>
    </div>
  );
};

export default InsideViewProject;
