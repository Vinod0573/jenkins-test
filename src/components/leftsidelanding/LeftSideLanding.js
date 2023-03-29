import React, { useEffect, useState } from "react";
import "./LeftSideLanding.css";
import GsrIcon from "../../assets/AsrspecificViewIcons/GsrIcon.svg";
import dropdownIcon from "../../assets/dropdownIcon.svg";
import GsrTopIcon from "../../assets/AsrspecificViewIcons/GsrTopIcon.svg";
import DropdownSaarthi from "../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import SearchBox from "../ui-kits/searchBox/SearchBox";
import SearchIcon from "../../assets/searchIcon/searchIcon.svg";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import {
  getAllConversations,
  loaderAction,
  setSelectedConversationInfo,
} from "../../actions/LeftSideLandingAction";
import { useDispatch, useSelector } from "react-redux";
import { getMessageList } from "../../actions/NavigationComponentApiAction";
import LoaderSaarthi from "../loader/Loader";
import useDidMountEffect from "../useDidMount/UseDidMountEffect";
import {
  setSelectedProjectDetail,
  getAllLangauge,
} from "../../actions/AssignProject";
import MultiLevel from "../ui-kits/multiLevel/MultiLevel";
import useDebounce from "../hooks/useDebounce/UseDebounce";

function LeftSideLanding(props) {
  const [buttonList, setButtonList] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState();
  const [showSideBar, setShowSideBar] = useState(true);
  const [selectedPhoneNo, setSelectedPhoneNo] = useState("");
  const [selectedPhoneId, setSelectedPhoneId] = useState("");
  const [clickedListid, setClickedListid] = useState(0);
  const [projectListClientWise, setProjectListClientWise] = useState();
  const [projectName, setProjectName] = useState();
  const [status, setStatus] = useState("");

  const selectedProjectName = useSelector(
    (store) => store.assignProjectDataState.assignedProjectDetails.project
  );
  const conversationList = useSelector(
    (store) => store.conversationLandingState.conversationList
  );
  const messageLoader = useSelector(
    (store) => store.conversationLandingState.listLoader
  );
  const role = useSelector((state) => state.RoleToggler.role);
  const accountName = useSelector(
    (store) => store.assignProjectDataState.assignedAccountName
  );

  const projectList = useSelector(
    (store) => store.assignProjectDataState.assignedProjectListClientWise
  );

  const assignProjectList = useSelector(
    (store) => store.assignProjectDataState.assignedProjectList
  );

  const selectedConversationInfo = useSelector(
    (store) => store.conversationLandingState.selectedConversationInfo
  );
  const dispatch = useDispatch();
  console.log("project", selectedProjectName, accountName, assignProjectList);
  let arr = ["Mannual", "Auto", "Default"];
  const [dropdownList, setDropdownList] = useState({
    optionList: projectName,
    imgSrcRight: dropdownIcon,
    placeHolderText: selectedProjectName ? selectedProjectName : "Projects",
  });

  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [selectedParentChild, setSelectedParentChild] = useState("");

  useEffect(() => {
    setDropdownList((prev) => {
      return {
        ...prev,
        optionList: projectName,
      };
    });
  }, [projectName]);

  useEffect(() => {
    setParentName(accountName);
    setChildName(selectedProjectName);
    setSelectedParentChild(`${accountName}-${selectedProjectName}`);
  }, [selectedProjectName]);

  // useEffect(()=>{
  //   console.log(selectedConversationInfo?.tagger?.status)
  //   if(selectedConversationInfo?.tagger?.status){
  //     setStatus(selectedConversationInfo?.tagger?.status)
  //   }

  // },[selectedConversationInfo])

  const OnChangeDropdown = (item) => {
    setSelectedDropdown((prev) => item);
    if (item?.length > 0) {
      let payload = {
        project: item,
        user: window.sessionStorage.getItem("name"),
        accountName: accountName,
        role,
      };
      getAllConversations(payload, dispatch);
    }
  };

  const isHideSideBar = () => {
    let temp = showSideBar;
    setShowSideBar(!temp);
    props.showSideBar(!temp);
  };

  useEffect(() => {
    if (selectedProjectName?.length > 0) {
      let payload = {
        project: selectedProjectName,
        user: window.sessionStorage.getItem("name"),
        accountName: accountName,
        role,
      };
      getAllConversations(payload, dispatch);
    }
  }, [selectedProjectName]);

  useEffect(() => {
    getAllLangauge(dispatch);
  }, []);

  useEffect(() => {
    if (conversationList) {
      setButtonList((prev) => conversationList);
      // loaderAction(dispatch)
    }
    if (conversationList && conversationList?.length === 0) {
      getMessageList("", dispatch);
      setSelectedPhoneNo((prev) => "");
      setSelectedPhoneId((prev) => "");
      //loaderAction(dispatch)
    }
  }, [conversationList]);

  useEffect(() => {
    if (selectedPhoneId) {
      getMessageList(selectedPhoneId, dispatch);
    }
  }, [selectedPhoneId]);

  useEffect(() => {
    if (buttonList?.length > 0 && selectedPhoneNo?.length == 0) {
      setSelectedPhoneNo((prev) => buttonList[0].sessionId);
      setSelectedPhoneId((prev) => buttonList[0].id);
      setSelectedConversationInfo(buttonList[0], dispatch);
    }
  }, [buttonList]);

  useEffect(() => {
    //console.log(projectList);
    setProjectListClientWise((prev) => projectList);
    const tempProject = projectList.map((item, i) => {
      return item.name;
    });
    setProjectName((prev) => tempProject);
  }, [projectList]);

  // To search to be selected data
  const handleSearchChange = (e) => {
    const phNo = e.target.value.trim();
    let toSearch = e.target.value.toLowerCase();

    let finalData = conversationList?.map((dat, i) => {
      if (dat.phoneNo.toLowerCase().match(toSearch) && toSearch) {
        return dat;
      }
    });
    let data = finalData.filter((e) => {
      return e;
    });
    if (e.target.value) {
      setButtonList(data);
    } else {
      setButtonList(conversationList);
    }
  };

  const debounce = useDebounce(handleSearchChange, 1000);

  const getSelectedData = (parent, child) => {
    setParentName(parent);
    setChildName(child);
    setSelectedDropdown((prev) => child);
    setSelectedParentChild(`${parent}-${child}`);
    if (child?.length > 0) {
      let payload = {
        project: child,
        user: window.sessionStorage.getItem("name"),
        accountName: parent,
        role,
      };
      getAllConversations(payload, dispatch);
    }
  };

  // to handle prev and next phone no click
  const handleClickedListid = (i) => {
    setClickedListid((prev) => i);
  };

  useDidMountEffect(() => {
    if (buttonList?.length > 0 && clickedListid > 0) {
      setSelectedPhoneNo((prev) => buttonList[clickedListid - 1].sessionId);
      setSelectedPhoneId((prev) => buttonList[clickedListid - 1].id);
      setClickedListid((prev) => prev - 1);
      setSelectedConversationInfo(buttonList[clickedListid - 1], dispatch);
    }
  }, [props.prevClick]);

  useDidMountEffect(() => {
    if (buttonList?.length > 0 && clickedListid < buttonList?.length) {
      setSelectedPhoneNo((prev) => buttonList[clickedListid + 1].sessionId);
      setSelectedPhoneId((prev) => buttonList[clickedListid + 1].id);
      setClickedListid((prev) => prev + 1);
      setSelectedConversationInfo(buttonList[clickedListid + 1], dispatch);
    }
  }, [props.nextClick]);

  // const selectedProjectDetail = (e) => {
  //   setSelectedProjectDetail(e, dispatch,history,props.listData.accountName);
  // };

  console.log(assignProjectList);
  return (
    <div
      className={`LeftSideLandingWrapper ${showSideBar ? "" : "minimal-width"}`}
    >
      <div
        className="navBar"
        onClick={() => {
          isHideSideBar();
        }}
      >
        {showSideBar ? (
          <img src={GsrIcon} alt="icon" className="firstIconImg"></img>
        ) : (
          <img src={GsrTopIcon} alt="icon" className="firstIconImg"></img>
        )}

        <div className="GrDiv">
          <p className="paraGrDiv">
            {selectedDropdown ? selectedDropdown : selectedProjectName}
          </p>
        </div>
      </div>

      {showSideBar ? (
        <>
          <div className="search-section">
            <SearchBox
              className="reportTableSearchInput"
              parentClass="InputBoxDiv"
              type="search"
              placeholder=""
              imgSrcLeft={SearchIcon}
              // onChangeValue={(e) => handleSearchUser(e)}
              // onKeyUp={() => handleOnKeyUp()}
              onChangeValue={(e) => debounce(e)}
              imageClickLeft={() => {}}
            />
          </div>
          <div className="drop-section">
            {/* <DropdownSaarthi
              droplist={dropdownList}
              placeHolderText={
                selectedDropdown ? selectedDropdown : " -select-"
              }
              loading={() => false}
              selectedItem={(item) => OnChangeDropdown(item)}
              extraClassSelectedArea={"extraStyleSfObject"}
              extraClassToBeSelectedArea={"dropdownStyling"}
              extraClassDropdownSearchArea={"searchIconStyle"}
            /> */}
            <MultiLevel
              mapData={assignProjectList.accountDetails}
              selectedData={getSelectedData}
              selectedParentChild={selectedParentChild}
              parent={parentName}
              child={childName}
            />
          </div>

          <div className="ButtonCollection">
            {messageLoader ? (
              <LoaderSaarthi />
            ) : (
              buttonList.map((each, i) => {
                console.log(each, "ee");
                return (
                  <>
                    <button
                      className={`ButtonComponent button-comp ${
                        selectedPhoneNo == each.sessionId
                          ? "isActiveButton"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedPhoneNo((prev) => each.sessionId);
                        setSelectedPhoneId((prev) => each.id);
                        handleClickedListid(i);
                        setSelectedConversationInfo(each, dispatch);
                      }}
                    >
                      {each.phoneNo}
                      <div
                        className={`${
                          each.tagger.status == "Done"
                            ? "dot-done"
                            : "dot-inprogress"
                        }`}
                      ></div>
                    </button>
                  </>
                );
              })
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default LeftSideLanding;
