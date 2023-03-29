import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeIcon from "../../../../assets/AsrspecificViewIcons/HomeIcon.svg";
import BackIcon from "../../../../assets/AsrspecificViewIcons/BackIcon.svg";
import NextIcon from "../../../../assets/AsrspecificViewIcons/NextIcon.svg";
import NotebookIcon from "../../../../assets/AsrspecificViewIcons/NoteBookIcon.svg";
import NotebookActiveIcon from "../../../../assets/AsrspecificViewIcons/NoteBookActiveIcon.svg";
import translateIcon from "../../../../assets/AsrspecificViewIcons/translateIcon.svg";
import tranlateActiveIcon from "../../../../assets/AsrspecificViewIcons/translateActive.svg";
import GsrIcon from "../../../../assets/AsrspecificViewIcons/GsrIcon.svg";
import ReactAudioPlayer from "react-audio-player";

import { MESSAGE_LIST_URL } from "../../../../utilities/ApiRoutes";

import "./NavigationComponent.css";
import ToggleNeoSwitch from "../../../toggleNeoSwitch/ToggleNeoSwitch";
import LeftSideLanding from "../../../leftsidelanding/LeftSideLanding";
import ConversationTextCard from "../conversationTextCard/ConversationTextCard";
import {
  updateConversation,
  loaderAction,
  setSelectedConversationInfo,
} from "../../../../actions/LeftSideLandingAction";
import { getMessageList } from "../../../../actions/NavigationComponentApiAction";
import { setSelectedMessageDetails } from "../../../../actions/GetAllConversationApiAction";
import { useSelector, useDispatch } from "react-redux";
import AudioPlayer from "../../../audioPlayer/AudioPlayer";
import NodataFoundIcon from "../../../../assets/conversation/speech-bubble.png";
import LoaderSaarthi from "../../../loader/Loader";

import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useThrotle from "../../../hooks/useThrotle/useThrotle";
function NavigationComponent() {
  const [ToggleStatus, setToggleStatus] = useState(false);
  const [languageDrop, setLanguageDrop] = useState(false);
  const [showTextChanges, setShowTextChanges] = useState(false);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState("");
  const [prevClick, setPrevClick] = useState(false);
  const [nextClick, setNextClick] = useState(false);
  const [editToggleStatus, setEditToggleStatus] = useState("");
  const [toggleDoneMess, setToggleDoneMess] = useState("Done");
  const [ToggleDataStatus, setToggleDataStatus] = useState(["Open", "Done"]);
  const [disablePrevNext, setDisablePrevNext] = useState(false);
  const [isChanged, setIsChanged] = useState(true);

  const throtledToast = useThrotle(() => {
    toast.info(
      "Please select the message for which language needs to be selected"
    );
  }, 3000);
  const history = useHistory();

  const selectedConversationInfo = useSelector(
    (store) => store.conversationLandingState.selectedConversationInfo
  );

  const dispatch = useDispatch();

  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const [messagesList, setMessagesList] = useState("no-data");
  const selectedMessage = useSelector(
    (store) => store.getAllConversationApiState.getSelectedData
  );
  const messageListData = useSelector((store) => store.messageListState);
  const messageLoader = useSelector(
    (store) => store.conversationLandingState.listLoader
  );
  const conversationStatus = useSelector(
    (store) => store.conversationLandingState.selectedConversationInfo
  );

  useEffect(() => {
    console.log(conversationStatus);
    if (conversationStatus?.tagger) {
      setEditToggleStatus((prev) => conversationStatus.tagger.status);
    }
  }, [conversationStatus]);
  useEffect(() => {
    let temp = [];
    temp.push(messageListData);
    setMessagesList(temp[0].messageList);
    //console.log(messageListData)
    if (temp[0].messageList?.length > 0) {
      loaderAction(dispatch);
    }
  }, [messageListData]);

  const getUpdateMessage = (msg, id) => {
    let conversationData = {
      id: id,
      conversationId: messageListData.conversationId,
      updatedText: [msg],
    };
    updateConversation(conversationData, dispatch).then((res) => {
      if (res.data) {
        getMessageList(messageListData.conversationId, dispatch);
      }
    });
  };

  const setStatus = async (e) => {
    // console.log(e);
    if (e != "Inprogress") {
      let temp = ToggleStatus;
      setToggleStatus((prev) => e);
      let tempConInfo = selectedConversationInfo;
      tempConInfo.tagger.status = e ? "Done" : "Inprogress";
      setEditToggleStatus("Done");
      setSelectedConversationInfo(tempConInfo, dispatch);
      //if(!temp){
      const updateStatusUrl = `${MESSAGE_LIST_URL.UPDATE_STATUS_TAGGER}`;
      let bodyData = {
        id: selectedConversationInfo.id,
        tagger: {
          status: e ? "Done" : "Inprogress",
        },
      };
      try {
        let result = await axios.post(updateStatusUrl, bodyData);
      } catch (err) {}
    } else {
      const updateStatusUrl = `${MESSAGE_LIST_URL.UPDATE_STATUS_TAGGER}`;
      let bodyData = {
        id: selectedConversationInfo.id,
        tagger: {
          status: "Inprogress",
        },
      };
      try {
        let result = await axios.post(updateStatusUrl, bodyData);
        setDisablePrevNext(false);
      } catch (err) {}
    }
    // }
  };

  useEffect(() => {
    //setEditToggleStatus(prev =>selectedConversationInfo?.tagger?.status)
    if (selectedConversationInfo?.tagger?.status === "Done") {
      setToggleStatus((prev) => true);
    } else {
      setToggleStatus((prev) => false);
      setEditToggleStatus((prev) => selectedConversationInfo?.tagger?.status);
    }
  }, [selectedConversationInfo]);

  const checkEditClick = () => {
    setEditToggleStatus((prev) => "Inprogress");
    setToggleStatus((prev) => false);
    let temp = selectedConversationInfo;
    temp.tagger.status = "Inprogress";
    setSelectedConversationInfo(temp, dispatch);
    //setStatus();
  };
  useEffect(() => {
    setEditToggleStatus((prev) => editToggleStatus);
  }, [editToggleStatus]);

  const ShowDropSection = () => {
    let temp = languageDrop;
    setLanguageDrop(!temp);
  };

  const showChanges = () => {
    let temp = showTextChanges;
    setShowTextChanges(!temp);
  };

  const setAudioUrl = (url, data) => {
    setSelectedAudioUrl(url);
    setSelectedMessageDetails(dispatch, data);
  };

  const [isShowSideBar, setIsShowSideBar] = useState(true);
  const showSideBar = (evnt) => {
    setIsShowSideBar((prev) => evnt);
  };

  const setBackendStatusInprogress = (data) => {
    setStatus(data);
  };

  const disableData = () => {
    setDisablePrevNext(true);
  };

  return (
    <div className="childDiv NavigationComponentWrapper">
      <div className="LeftSideComponent">
        <LeftSideLanding
          prevClick={prevClick}
          nextClick={nextClick}
          showSideBar={(evnt) => showSideBar(evnt)}
          status={isChanged}
        />
      </div>
      <div className="MessageBoxComponent">
        <div className="NavigationComponent">
          <div className="HomeIconDiv">
            <img
              src={HomeIcon}
              onClick={() => history.push("/assignedproject")}
              style={{ cursor: "pointer" }}
              alt="o"
            ></img>
          </div>
          <div className="AudioComponentDiv">
            <AudioPlayer
              selectedAudioUrl={
                selectedAudioUrl?.includes("saarthicalls")
                  ? selectedAudioUrl +
                    `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_SAARTHICALL}`
                  : selectedAudioUrl +
                    `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_AMEYOCALL}`
              }
            />
          </div>
          {Array.isArray(messagesList) && messagesList?.length > 0 && (
            <div className="Buttondiv">
              <div
                className={`backBtn ${disablePrevNext ? "btn-disabled" : ""}`}
              >
                <img
                  src={BackIcon}
                  alt="prev icon"
                  onClick={() => {
                    if (!disablePrevNext) {
                      setPrevClick((prev) => !prev);
                    }
                  }}
                />
                <p>Previous</p>
              </div>
              <div className="DoneBtn">
                <ToggleNeoSwitch
                  isActive={ToggleStatus}
                  status={[editToggleStatus, "Done"]}
                  setToggleData={(e) => {
                    setStatus(e);
                  }}
                  ToggleData={ToggleDataStatus}
                />
              </div>
              <div
                className={`nextBtn ${disablePrevNext ? "btn-disabled" : ""}`}
              >
                <img
                  src={NextIcon}
                  alt="next icon"
                  onClick={() => {
                    if (!disablePrevNext) {
                      setNextClick((prev) => !prev);
                    }
                  }}
                />
                <p>Next</p>
              </div>
            </div>
          )}

          <div className="endIcons">
            <div
              className="secondIcon"
              onClick={() => {
                if (selectedMessage && selectedMessage.id) {
                  ShowDropSection();
                } else {
                  throtledToast();
                }
              }}
            >
              {languageDrop ? (
                <img src={tranlateActiveIcon} alt="img"></img>
              ) : (
                <img src={translateIcon} alt="img"></img>
              )}
            </div>
            <div
              className="NotedIcon"
              onClick={() => {
                showChanges();
              }}
            >
              {showTextChanges ? (
                <img src={NotebookActiveIcon} />
              ) : (
                <img src={NotebookIcon}></img>
              )}
            </div>
          </div>
        </div>
        <div
          className={`Message-section ${
            isShowSideBar ? "" : "addClassMessageSection"
          }`}
        >
          <div className="Message-List-Section">
            {messageLoader ? (
              <LoaderSaarthi />
            ) : Array.isArray(messagesList) && messagesList?.length > 0 ? (
              messagesList.map((each, i) => {
                return (
                  <ConversationTextCard
                    responsedata={each}
                    index={i}
                    updateMessage={(msg, id) => {
                      getUpdateMessage(msg, id);
                    }}
                    textChanges={showTextChanges}
                    checkEditClick={() => {
                      checkEditClick();
                    }}
                    showLanguage={languageDrop}
                    isInprogress={() => {
                      setBackendStatusInprogress("Inprogress");
                      setToggleDataStatus(["Inprogress", "Done"]);
                    }}
                    disableNextPrevButton={() => {
                      disableData();
                    }}
                    setAudio={(url, data) => {
                      setAudioUrl(url, data);
                    }}
                  />
                );
              })
            ) : (
              <div className="no-messages">
                {/* <div>
                  <img className="no-data-found" src={NodataFoundIcon} />
                </div> */}
                <div>No conversations found</div>
              </div>
            )}
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
    </div>
  );
}

export default NavigationComponent;
