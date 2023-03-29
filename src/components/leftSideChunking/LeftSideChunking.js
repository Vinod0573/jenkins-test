import React, { useEffect, useState, useRef } from "react";
import "./LeftSideChunking.css";
import SearchBox from "../ui-kits/searchBox/SearchBox";
import SearchIcon from "../../assets/searchIcon/searchIcon.svg";
import Dropdown from "react-multilevel-dropdown";
import SingleSelectDD from "../singleselectdd/SingleSelectDD";
import downarrow from "../../assets/summarysection/downarrow.svg";
import searchgrey from "../../assets/summarysection/searchgrey.svg";
import whitearrow from "../../assets/summarysection/whitearrow.svg";
import greyarrow from "../../assets/summarysection/greyarrow.svg";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversations,
  loaderAction,
  setSelectedConversationInfo,
  setAgentType,
} from "../../actions/LeftSideLandingAction";
import { getAllLangauge } from "../../actions/AssignProject";
import { getMessageList } from "../../actions/NavigationComponentApiAction";
import LoaderSaarthi from "../loader/Loader";
import useDebounce from "../hooks/useDebounce/UseDebounce";

export default function LeftSideChunking() {
  const [projectArray, setProjectArray] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedPhoneNo, setSelectedPhoneNo] = useState("");
  const [selectedPhoneId, setSelectedPhoneId] = useState("");
  const [clickedListid, setClickedListid] = useState(0);
  const [typeOfAgent, setTypeOfAgent] = useState();
  const [msgType, setMsgType] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchNumber, setSearchNumber] = useState();
  const showDropDown = useRef(null);
  /**
   * @type {"Data Annotator" | "Quality Analyst" | "Annotator Admin"}
   *  Data Annotator / Quality Analyst
   *  */
  // const role = useSelector(
  //   (state) => state?.loginState?.logInData?.userDetail?.role
  // );
  const role = useSelector((state) => state.RoleToggler.role);
  const userId = useSelector(
    (state) => state?.loginState?.logInData?.userDetail?._id
  );
  //data getting from redux
  const selectedProjectName = useSelector(
    (store) => store?.assignProjectDataState.assignedProjectDetails?.project
  );
  const conversationList = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.results
  );
  //getting total page from api responce
  const totalConversationPage = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.totalPages
  );
  const updateListHighlight = useSelector(
    (store) => store?.conversationLandingState?.updateListHighlight
  );

  const accountName = useSelector(
    (store) => store?.assignProjectDataState?.assignedAccountName
  );
  // all assignproject for all accountwise
  const assignProjectList = useSelector(
    (store) => store.assignProjectDataState.assignedProjectList
  );
  const messageLoader = useSelector(
    (store) => store.conversationLandingState.listLoader
  );

  const agentTypeRedux = useSelector(
    (store) => store.conversationLandingState.agentTyperedux
  );
  const typeOfMessage = useSelector(
    (store) => store?.getAllConversationApiState.typeOfMessage
  );

  const selectedConversationInfo = useSelector(
    (store) => store?.conversationLandingState?.selectedConversationInfo
  );
  //for getting conversation
  const dispatch = useDispatch();

  const handleClickPageNo = (page) => {
    const NewPage = page + 1;
    setPageNo((prev) => NewPage);
  };
  const handleSearch = (e) => {
    setSearchNumber((prev) => e.target.value);
  };

  const debounce = useDebounce(handleSearch, 1000);
  // console.log("search", searchNumber);
  useEffect(() => {
    if (typeOfMessage) {
      if (typeOfMessage === "Chunking") {
        setMsgType((prev) => "Chunk_Transcript");
      } else {
        setMsgType((prev) => "Live_Transcript");
      }
    }
  }, [typeOfMessage]);
  useEffect(() => {
    if (selectedProject?.length) {
      let payload = {
        project: selectedProject,
        user: window.sessionStorage.getItem("name"),
        accountName: accountName,
        limit: 12,
        page: pageNo,
        role,
      };
      if (searchNumber) {
        payload["search"] = searchNumber;
      }
      getAllConversations(payload, agentTypeRedux, dispatch);
    }
  }, [
    selectedProject,
    agentTypeRedux,
    msgType,
    pageNo,
    searchNumber,
    accountName,
  ]);

  useEffect(() => {
    let project = assignProjectList?.accountDetails
      ?.map((e) => {
        if (e.accountName === accountName) {
          return e.projects;
        }
      })
      ?.filter((o) => o);
    project = project?.[0]?.map((e) => {
      return e?.project;
    });

    setProjectArray((prev) => project);
  }, [assignProjectList, accountName]);

  useEffect(() => {
    if (selectedProjectName) {
      setSelectedProject((prev) => selectedProjectName);
    }
  }, [selectedProjectName]);
  const handleClickedListid = (i) => {
    setClickedListid((prev) => i);
  };
  // for getting type of agent
  useEffect(() => {
    let project = assignProjectList?.accountDetails
      ?.map((e) => {
        if (e.accountName === accountName) {
          return e.projects;
        }
      })
      ?.filter((o) => o);
    project = project?.[0]?.map((e) => {
      if (e?.project === selectedProject) {
        setTypeOfAgent(e?.agent);
        setAgentType(e?.agent, dispatch);
      }
    });
  }, [selectedProject, assignProjectList, accountName]);

  // for initial msg setup
  useEffect(() => {
    if (conversationList && conversationList?.length > 0) {
      if (!updateListHighlight && selectedConversationInfo) {
        setSelectedPhoneNo((prev) => selectedConversationInfo?.sessionId);
        setSelectedPhoneId((prev) => selectedConversationInfo?.id);
        setSelectedConversationInfo(selectedConversationInfo, dispatch);
      }
      if (!selectedConversationInfo) {
        setSelectedPhoneNo((prev) => conversationList?.[0].sessionId);
        setSelectedPhoneId((prev) => conversationList?.[0].id);
        setSelectedConversationInfo(conversationList?.[0], dispatch);
      }
    }
  }, [conversationList, selectedConversationInfo]);

  //get msgconversation
  useEffect(() => {
    if (selectedPhoneId) {
      getMessageList(selectedPhoneId, msgType, dispatch);
    }
  }, [selectedPhoneId, msgType]);

  useEffect(() => {
    if (conversationList && conversationList?.length === 0) {
      getMessageList("", msgType, dispatch);
      setSelectedPhoneNo((prev) => "");
      setSelectedPhoneId((prev) => "");
      setSelectedConversationInfo([], dispatch);
    }
  }, [conversationList, msgType]);

  //get all language
  useEffect(() => {
    getAllLangauge(dispatch);
  }, []);
  useEffect(() => {
    showDropDown.current.toggle();
  }, [selectedProject]);

  // set total page
  useEffect(() => {
    setTotalPage(totalConversationPage);
  }, [totalConversationPage]);
  // console.log("page 1", totalConversationPage, totalPage);

  useEffect(() => {
    if (selectedConversationInfo) {
      setSelectedPhoneNo((prev) => selectedConversationInfo.sessionId);
      setSelectedPhoneId((prev) => selectedConversationInfo.id);
    }
  }, [selectedConversationInfo]);
  return (
    <div className="leftsidechunking-container">
      <div className="leftsidechunking-inner">
        <div className="firstDivContainerAnna">
          <div style={{ marginTop: "10px" }}>
            <SearchBox
              className="reportTableSearchInputxx"
              parentClass="InputeSearchBoxDivxx"
              type="search"
              placeholder="Search"
              imgSrcLeft={searchgrey}
              onChangeValue={(e) => {
                debounce(e);
              }}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <Dropdown
              ref={showDropDown}
              title={<Projects Projectselected={selectedProject} />}
              className="filterMultiDropdowsdsnsd"
            >
              <SingleSelectDD
                options={projectArray}
                dataOutSide={(data) => {
                  setSelectedProject(data);
                }}
              />
            </Dropdown>
          </div>
        </div>
        <div className="textblackbolddiv">
          <p className="textblackbold">Conversation</p>
        </div>

        <div style={{ width: "100%" }} className="conversationListDiv">
          <div className="conversationMainDiv">
            {messageLoader ? (
              <LoaderSaarthi />
            ) : !conversationList || conversationList?.length == 0 ? (
              <div className="noDataFoundMsgDiv">
                <p className="noDataFoundMsgP"> No data found</p>
              </div>
            ) : (
              conversationList?.map((each, i) => {
                return (
                  <>
                    <div
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
                      {(
                        role === "Data Annotator"
                          ? typeOfMessage === "Chunking"
                            ? each?.taggerChunk?.status !== "Done"
                            : each?.taggerTranscript?.status !== "Done"
                          : typeOfMessage === "Chunking"
                          ? each?.reviewChunk?.filter((e) => {
                              return e?.user === userId;
                            })?.[0]?.status !== "Done" //todo .filter(e=>{e.user===userId})?.[0].status
                          : each?.reviewTranscript?.filter((e) => {
                              return e?.user === userId;
                            })?.[0]?.status !== "Done"
                      ) ? (
                        //todo
                        <div
                          style={{ marginLeft: ".8em", marginRight: ".5em" }}
                        >
                          <div className="redcircle"></div>
                        </div>
                      ) : (
                        <div
                          style={{ marginLeft: ".8em", marginRight: ".5em" }}
                        >
                          <div className="greencircle"></div>
                        </div>
                      )}
                      <p className="converasation-para">{each.sessionId}</p>
                    </div>
                  </>
                );
              })
            )}
          </div>
          <div className="fixed-at-botton9282">
            {totalPage > 1 && (
              <Pagination
                totalNoOfPage={totalPage}
                handleClickPageNo={(value) => handleClickPageNo(value)}
                forcePage={pageNo}
              />
            )}
          </div>
        </div>
        <></>
      </div>
    </div>
  );
}

const Projects = (props) => {
  return (
    <div className="allprojectsds">
      <p>{props.Projectselected}</p>
      <img style={{ width: "14px" }} src={downarrow} alt="" />
    </div>
  );
};
