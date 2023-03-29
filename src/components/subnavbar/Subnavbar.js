import React, { useEffect } from "react";
import "./Subnavbar.css";
import { useState, useRef } from "react";
// import MultiSelectSimple from "../multiselectsimple/MultiSelectSimple";
import lang from "../../assets/summarysection/lang.svg";
import langHighLight from "../../assets/summarysection/langHighlight.svg";
import bigScissor from "../../assets/summarysection/bigScissor.svg";
import save from "../../assets/summarysection/save.svg";
import trans from "../../assets/summarysection/trans.svg";
import NotebookIcon from "../../assets/AsrspecificViewIcons/NoteBookIcon.svg";
import NotebookActiveIcon from "../../assets/AsrspecificViewIcons/NoteBookActiveIcon.svg";
import { useDispatch, useSelector } from "react-redux";
// import SingleSelectDD from "../singleselectdd/SingleSelectDD";
// import Warn from "../warn/Warn";
// import greenTick from "../../assets/summarysection/greenTick.svg";
// import blackCross from "../../assets/summarysection/blackCross.svg";
import backArrow from "../../assets/chunkingViewIcons/backArrow.svg";
import forwadArrow from "../../assets/chunkingViewIcons/forwardArrow.svg";
// import { set } from "date-fns";
import ToggleNeoSwitch from "../../components/toggleNeoSwitch/ToggleNeoSwitch";
import AudioPlayer from "../../components/audioPlayer/AudioPlayer";
import {
  showSummaryofConversation,
  setTypeofMessage,
} from "../../actions/GetAllConversationApiAction";
import {
  getAudioPlayOrPause,
  getAudioReplay,
} from "../../actions/NavigationComponentApiAction";
import {
  getAllConversations,
  setSelectedConversationInfo,
  getUpdatedAllConversations,
} from "../../actions/LeftSideLandingAction";
import { MESSAGE_LIST_URL } from "../../utilities/ApiRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AudioPlayerWrapper from "../audioPlayerNew/AudioPlayerWrapper";
import { setPlayTranscriptAudio } from "../../actions/TranscriptAudioAction";
let timer;
export default function Subnavbar(props) {
  const [active, setActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);
  const [getaudio, setGetAudio] = useState();
  const [ToggleDataStatus, setToggleDataStatus] = useState(["Open", "Done"]);
  const [ToggleStatus, setToggleStatus] = useState(false);
  const [editToggleStatus, setEditToggleStatus] = useState("");

  const dispatch = useDispatch();
  const audioRef = useRef();
  const userId = useSelector(
    (state) => state?.loginState?.logInData?.userDetail?._id
  );
  //const [chunk,setChunk]=useState(true);

  //data from redux
  /**
   * @type {"Data Annotator" | "Quality Analyst" | "Annotator Admin"}
   *  Data Annotator / Quality Analyst
   *  */
  const role = useSelector((state) => state?.RoleToggler.role);

  const showMsgSummary = useSelector(
    (store) => store.getAllConversationApiState.showSummaryforConversation
  );
  const selectedMessage = useSelector(
    (store) => store.getAllConversationApiState.getSelectedData
  );
  const selectedProjectGoal = useSelector(
    (store) => store?.assignProjectDataState.assignedProjectDetails?.projectGoal
  );
  const playBtn = useSelector(
    (store) => store.messageListState?.audioPlayOrPause
  );
  const replay = useSelector((store) => store.messageListState?.audioReplay);
  const selectedConversationInfo = useSelector(
    (store) => store.conversationLandingState.selectedConversationInfo
  );

  const typeOfMessage = useSelector(
    (store) => store?.getAllConversationApiState.typeOfMessage
  );
  const conversationList = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.results
  );
  // console.log("conv", conversationList);
  const messageLoader = useSelector(
    (store) => store.conversationLandingState.listLoader
  );
  // getting msg of conversation data
  const messageListData = useSelector((store) => store.messageListState);
  console.log("edit", props.editMode);
  const transcriptAudioState = useSelector(
    (store) => store.getAllConversationApiState?.transcriptAudioPlay
  );
  const transcriptStartEnd = useSelector(
    (store) => store.getAllConversationApiState?.transcriptAudioPlayStartEnd
  );
  const refreshPlay = useSelector(
    (store) => store.getAllConversationApiState?.refreshPlay
  );

  useEffect(() => {
    clearTimeout(timer);
    if (transcriptAudioState) {
      // audioRef?.current?.pause();
      transcriptStartEnd &&
        transcriptStartEnd.startTime &&
        audioRef?.current?.setCurrentTime(transcriptStartEnd.startTime);
      audioRef?.current?.play();
      timer = setTimeout(() => {
        audioRef?.current?.pause();
        dispatch(setPlayTranscriptAudio(false));
      }, (transcriptStartEnd?.endTime - transcriptStartEnd?.startTime) * 1000);
      //  audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }

    //   function pauseONpause(){
    //     if(audioRef.current){
    //      if( audioRef.current.isPlaying ) {

    //       if(transcriptAudioState){
    //         dispatch(setPlayTranscriptAudio(false))
    //         audioRef?.current?.pause();
    //       }

    //      }
    //     }
    //   }
    //   console.log(transcriptStartEnd,"TIMSJKDIISO");
    //  const timer=setTimeout(pauseONpause,1000)

    return () => {
      clearTimeout(timer);
    };
  }, [transcriptAudioState, audioRef, transcriptStartEnd, refreshPlay]);

  const handleToggle = (e) => {
    setActive((prev) => !prev);
    if (props?.toggle) {
      props.toggle.handler((prev) => !prev);
    }
  };
  function toggleChunk(e) {
    // setSelectedConversationInfo({},dispatch);

    if (selectedProjectGoal?.length > 1) {
      if (props?.chunkType == "Transcript") {
        props.getChunkType("Chunking");
        setTypeofMessage(dispatch, "Chunking");
      } else {
        props.getChunkType("Transcript");
        setTypeofMessage(dispatch, "Transcript");
      }
    }
  }

  window.onclick = (e) => {
    if (e.target == document.getElementById("maskd9jd38jdflufe")) {
      setShowLang((prev) => false);
    }
    if (e.target == document.getElementById("massdhf8233831e")) {
      setShowInfo((prev) => false);
    }
  };

  useEffect(() => {
    props?.togetLangShow(showLang);
  }, [showLang]);
  useEffect(() => {
    showSummaryofConversation(dispatch, showInfo);
  }, [showInfo]);
  useEffect(() => {
    setAudioPlay(playBtn);
    if (playBtn) {
      audioRef?.current?.audioEl?.current.play();
    } else {
      audioRef?.current?.audioEl?.current.pause();
    }
  }, [playBtn]);

  const makePlayOrpause = (data) => {
    getAudioPlayOrPause(dispatch, data);
  };

  useEffect(() => {
    if (audioRef?.current?.audioEl) {
      if (replay === "replay") audioRef.current.audioEl.current.currentTime = 0;
      getAudioReplay(dispatch, "");
    }
  }, [replay]);

  //
  const totalConversationPage = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.totalPages
  );

  const totalConversationNextPage = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.next
  );
  /**
   * for Data annotator send the transcript/chunk status
   * for quality analyst send the review (transciprt/chunk) status
   * @param {*} e
   */

  const setStatus = async (e) => {
    let temp = ToggleStatus;
    let statusToggle = e;
    setToggleStatus((prev) => e);
    let tempConInfo = selectedConversationInfo;
    // following the prev code logic

    setEditToggleStatus("Done");

    let updateStatusUrl;
    if (role === "Data Annotator") {
      updateStatusUrl = `${MESSAGE_LIST_URL.UPDATE_STATUS_TAGGER}`;
    } else {
      updateStatusUrl = `${MESSAGE_LIST_URL.UPDATE_STATUS_REVIEW}`;
    }
    let bodyData;
    if (typeOfMessage === "Chunking") {
      if (role === "Data Annotator") {
        bodyData = {
          id: selectedConversationInfo.id,
          taggerChunk: {
            status: e ? "Done" : "Open",
          },
        };
      } else if (role === "Quality Analyst") {
        // qa
        bodyData = {
          userId, //todo
          id: selectedConversationInfo.id,
          reviewChunk: {
            status: e ? "Done" : "Open",
          },
        };
      }
    } else {
      if (role === "Data Annotator") {
        bodyData = {
          id: selectedConversationInfo.id,
          taggerTranscript: {
            status: e ? "Done" : "Open",
          },
        };
      } else if (role === "Quality Analyst") {
        //qa

        bodyData = {
          userId, //todo
          id: selectedConversationInfo.id,
          reviewTranscript: {
            status: e ? "Done" : "Open",
          },
        };
      }
    }

    try {
      let result = await axios.post(updateStatusUrl, bodyData);
      if (result) {
        toast.success("Status updated successfully !");
        console.log("conv", conversationList);
        let updateList = conversationList?.map((d) => {
          if (d?.id == selectedConversationInfo.id) {
            if (role === "Data Annotator") {
              if (typeOfMessage === "Chunking") {
                if (d) {
                  d.taggerChunk.status = statusToggle ? "Done" : "Open";
                }
              } else {
                d.taggerTranscript.status = statusToggle ? "Done" : "Open";
              }
            } else if (role === "Quality Analyst") {
              if (typeOfMessage === "Chunking") {
                d.reviewChunk = [
                  { user: userId, status: statusToggle ? "Done" : "Open" },
                ]; //todo
              } else {
                d.reviewTranscript = [
                  { user: userId, status: statusToggle ? "Done" : "Open" },
                ];
              }
            }
          }
          return d;
        });
        let finalResult = {
          totalPages: totalConversationPage,
          results: updateList,
          next: totalConversationNextPage,
        };
        console.log(finalResult, "result");
        getUpdatedAllConversations(finalResult, dispatch);
        if (typeOfMessage === "Chunking") {
          if (role === "Data Annotator") {
            tempConInfo.taggerChunk.status = e ? "Done" : "Open";
          } else if (role === "Quality Analyst") {
            tempConInfo.reviewChunk = [
              { user: userId, status: e ? "Done" : "Open" },
            ]; //todo review st
          }
        } else {
          if (role === "Data Annotator") {
            tempConInfo.taggerTranscript.status = e ? "Done" : "Open";
          } else if (role === "Quality Analyst") {
            tempConInfo.reviewTranscript = [
              { user: userId, status: e ? "Done" : "Open" },
            ];
          }
        }
        setSelectedConversationInfo(tempConInfo, dispatch);
      } else {
        toast.error("Status not changed");
      }
    } catch (err) {
      // setToggleStatus((prev) => !prev);
      console.error(err);
    }
  };

  useEffect(() => {
    if (role === "Data Annotator") {
      if (typeOfMessage === "Chunking") {
        if (selectedConversationInfo?.taggerChunk?.status === "Done") {
          setToggleStatus((prev) => true);
        } else {
          setToggleStatus((prev) => false);
          setEditToggleStatus(
            (prev) => selectedConversationInfo?.taggerChunk?.status
          );
        }
      } else {
        if (selectedConversationInfo?.taggerTranscript?.status === "Done") {
          setToggleStatus((prev) => true);
        } else {
          setToggleStatus((prev) => false);
          setEditToggleStatus(
            (prev) => selectedConversationInfo?.taggerTranscript?.status
          );
        }
      }
    } else if (role === "Quality Analyst") {
      if (typeOfMessage === "Chunking") {
        if (
          selectedConversationInfo?.reviewChunk?.filter((e) => {
            return e.user === userId;
          })?.[0]?.status === "Done"
        ) {
          //todo
          setToggleStatus((prev) => true);
        } else {
          setToggleStatus((prev) => false);
          setEditToggleStatus(
            (prev) =>
              selectedConversationInfo?.reviewChunk?.filter((e) => {
                return e.user === userId;
              })?.[0]?.status
          );
        }
      } else {
        if (
          selectedConversationInfo?.reviewTranscript?.filter((e) => {
            return e.user === userId;
          })?.[0]?.status === "Done"
        ) {
          //todo
          setToggleStatus((prev) => true);
        } else {
          setToggleStatus((prev) => false);
          setEditToggleStatus(
            (prev) =>
              selectedConversationInfo?.reviewTranscript?.filter((e) => {
                return e.user === userId;
              })?.[0]?.status
          );
        }
      }
    }
  }, [selectedConversationInfo, props?.chunkType, typeOfMessage, role, userId]);

  const handleStatusArrow = (data) => {
    setToggleStatus((prev) => data);
    if (data !== ToggleStatus) {
      setStatus(data);
    }
  };

  useEffect(() => {}, [transcriptAudioState]);

  return (
    <div
      className={`subbarcontainerxc ${
        props.parentClass ? props.parentClass : ""
      }`}
    >
      <div className="left-subnavbar">
        {props.leftIcons &&
          props.leftIcons?.length > 0 &&
          props.leftIcons.map((e, i) => {
            return (
              <>
                <img
                  src={e.icon ? e.icon : null}
                  onClick={e.onClick ? e.onClick : null}
                  style={{ cursor: "pointer" }}
                  alt=""
                />
              </>
            );
          })}
        {props.toggle !== undefined ? (
          active ? (
            <img
              onClick={handleToggle}
              style={{ cursor: "pointer" }}
              src={props.toggle.open}
              alt=""
            />
          ) : (
            <img
              onClick={handleToggle}
              style={{ cursor: "pointer" }}
              src={props.toggle.close}
              alt=""
            />
          )
        ) : null}
      </div>
      {props?.chunkType === "Transcript" &&
      selectedConversationInfo?.recordingFile ? (
        //  <audio ref={audioRef} src={selectedMessage?.audioUrl} controls />
        <div className="AudioComponentDiv">
          <AudioPlayerWrapper
            url={
              selectedConversationInfo?.recordingFile?.includes("saarthicalls")
                ? selectedConversationInfo?.recordingFile +
                  `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_SAARTHICALL}`
                : selectedConversationInfo?.recordingFile +
                  `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_AMEYOCALL}`
            }
            ref={audioRef}
            autoPlay={false}
            onStop={() => {
              dispatch(setPlayTranscriptAudio(false));
            }}
            onLoad={() => {}}
          />

          {/* : ( <AudioPlayerWrapper url="" ref={audioRef} />) */}
        </div>
      ) : (
        ""
      )}
      <div className="right-subnavbar">
        {
          <>
            {(selectedConversationInfo?.taggerTranscript?.status ||
              selectedConversationInfo?.taggerChunk?.status) &&
              !messageLoader && (
                <div className="statusButtonChunking">
                  <img
                    src={backArrow}
                    onClick={() => handleStatusArrow(false)}
                    alt="kbalck"
                  ></img>
                  <ToggleNeoSwitch
                    isActive={ToggleStatus}
                    status={
                      role === "Data Annotator"
                        ? ["Open", "Done"]
                        : ["Review", "Reviewed"]
                    }
                    setToggleData={(e) => {
                      setStatus(e);
                    }}
                    ToggleData={ToggleDataStatus}
                  />
                  <img
                    src={forwadArrow}
                    onClick={() => handleStatusArrow(true)}
                    alt="kss"
                  ></img>
                </div>
              )}
            {selectedProjectGoal?.length > 1 ? (
              <img
                src={props?.chunkType != "Transcript" ? trans : bigScissor}
                onClick={(e) => toggleChunk(e)}
                alt="tran"
              />
            ) : (
              ""
            )}
            {messageListData?.messageList?.length > 0 &&
            !messageListData?.loadingmessageList &&
            !messageLoader ? (
              <>
                <img
                  src={showLang ? langHighLight : lang}
                  onClick={() => setShowLang((prev) => !prev)}
                  className={`transLanguagePic`}
                  alt=""
                />
                {/* {showLang && (
              <>
                <div id="maskd9jd38jdflufe"></div>
                <div className="positiosdn932r2bjrboe9">
                  <SingleSelectDD
                    options={props?.allLang}
                  />
                </div>
              </>
            )} */}
                <img
                  src={showMsgSummary ? NotebookActiveIcon : NotebookIcon}
                  onClick={() => {
                    setShowInfo((prev) => !prev);
                  }}
                  className={`transLanguagePic ${
                    props.editMode?.isEditMode ? "cursorNone" : ""
                  }`}
                  alt=""
                />{" "}
              </>
            ) : (
              ""
            )}
          </>
        }
      </div>
    </div>
  );
}
