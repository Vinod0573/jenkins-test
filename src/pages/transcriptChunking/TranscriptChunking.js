import React, { useEffect, useRef, useReducer } from "react";
import "./TranscriptChunking.css";
import LeftSideChunking from "../../components/leftSideChunking/LeftSideChunking";
import Subnavbar from "../../components/subnavbar/Subnavbar";
import close from "../../assets/summarysection/close.svg";
import open from "../../assets/summarysection/open.svg";
import lang from "../../assets/summarysection/lang.svg";
import save from "../../assets/summarysection/save.svg";
import goback from "../../assets/summarysection/goback.svg";
import bigScissor from "../../assets/summarysection/bigScissor.svg";
import trans from "../../assets/summarysection/trans.svg";
import noDataPic from "../../assets/noDataPic/noDataImg.svg";
import IndividualConversation from "../../components/individualConversation/IndividualConversation";
import { useState } from "react";
//import AudioWaveform from "../../components/audioPlayerWave/components/AudioWaveform";
import { isValid, set } from "date-fns";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderSaarthi from "../../components/loader/Loader";
import {
  updateConversation,
  deleteConversation,
  updateChunkingConversation,
  loaderAction,
  setSelectedConversationInfo,
} from "../../actions/LeftSideLandingAction";
import {
  getMessageList,
  getMsgListwithLiveChunk,
} from "../../actions/NavigationComponentApiAction";
import { getTagDropdownData } from "../../actions/NavigationComponentApiAction";
import {
  setSelectedMessageDetails,
  setTypeofMessage,
  updateTextLanguage,
} from "../../actions/GetAllConversationApiAction";
import { getLodderUpdate } from "../../actions/LodderUpdate";
import { toast, ToastContainer } from "react-toastify";
import Waveform from "../../components/audioPlayerWave/waveNew/Waveform";
import { v4 as uuidv4 } from "uuid";
import { postChunkingTime } from "../../actions/NavigationComponentApiAction";
import TransparentModal from "../../components/transparentModal/TransparentModal";
import { LineLoader } from "react-spinner-overlay";
import NoDataModal from "../../components/noDataFoundComponent/NoDataModal";
import useThrotle from "../../components/hooks/useThrotle/useThrotle";
import { resetChunkingDataAction } from "../../actions/NavigationComponentApiAction";

import { ResetLandingStateAction } from "../../actions/LeftSideLandingAction";
//import useDebounce from "../../components/hooks/useDebounce/UseDebounce";
// nit
function regionsReducer(state, action) {
  switch (action.type) {
    case "ADD_REGION":
      return [...state, { ...action.payload, id: uuidv4() }];
    case "EDIT_REGION":
      return state.map((e) => {
        if (e.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return e;
        }
      });
  }
}
// const Throtle = (cb, wait = 1000) => {
//   let shouldwait = false;
//   let cacheArgs;
//   return (...args) => {
//     cacheArgs = args;
//     if (shouldwait) {
//       return;
//     }
//     cb(cacheArgs);
//     shouldwait = true;
//     setTimeout(() => {
//       shouldwait = false;
//     }, wait);
//   };
// };
// const throtledToast = Throtle(() => {
//   toast.info(
//     "Please select the message for which language needs to be selected"
//   );
// }, 3000);
// --------- nit
export default function TranscriptChunking() {
  const [leftSideShow, setLeftSideShow] = useState(true);
  const [chunk, setChunk] = useState("Chunking");
  const [allLanguage, setAllLanguage] = useState([]);
  const [messageConversation, setMessageConversation] = useState([]);
  const [showLangDrop, setShowLangDrop] = useState();
  const [msgType, setMsgType] = useState();
  const [editMode, setEditMode] = useState({ isEditMode: false, id: null });
  const history = useHistory();
  const dispatch = useDispatch();
  function getChunk(data) {
    setChunk((prev) => data);
  }
  const goBackToProjects = () => {
    history.push("/assignedproject");
  };

  let role = window.sessionStorage.getItem("role");
  const throtledToast = useThrotle(() => {
    toast.info(
      "Please select the message for which language needs to be selected"
    );
  }, 3000);
  // if (role === "Data Annotator" || role === "Quality Analyst") {
  //   history.push("/assignedproject");
  // } else
  if (role === "Annotator Admin") {
    history.push("/");
  }
  //----------- initiate regions
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    //onsole.log(messageConversation,"nithin")
    const regionNew = messageConversation.map((each) => {
      return {
        id: each.id,
        start: parseFloat(each?.tags?.startTime),
        end: parseFloat(each?.tags?.endTime),
        speaker: each.speaker === "User" ? "customer" : "bot",
      };
    });
    //console.log(messageConversation, "chunking 123");
    setRegions((prev) => regionNew);
  }, [messageConversation]);

  //data from redux
  //for getting all conversation msg
  const messageListData = useSelector((store) => store.messageListState);
  const messageLoader = useSelector(
    (store) => store.conversationLandingState.listLoader
  );
  const agentTypeRedux = useSelector(
    (store) => store.conversationLandingState.agentTyperedux
  );
  // for selected conversation message data
  const selectedMessage = useSelector(
    (store) => store.getAllConversationApiState.getSelectedData
  );
  //for selected data of perticuler phone number info
  const selectedConversationInfo = useSelector(
    (store) => store.conversationLandingState.selectedConversationInfo
  );
  // selected  project  info
  const selectedProjectGoal = useSelector(
    (store) => store?.assignProjectDataState.assignedProjectDetails?.projectGoal
  );
  const typeOfMessage = useSelector(
    (store) => store?.getAllConversationApiState.typeOfMessage
  );
  const chunkMsgList = useSelector(
    (store) => store.messageListState?.chunkmsgListData
  );
  //chunkmsgListData
  //toggle agent
  const speakerType = useSelector(
    (store) => store.messageListState?.agentTypeByToggle
  );
  //for getting lodder status when upadate
  const lodderUpdate = useSelector(
    (store) => store.lodderUpdateState?.lodderupdate
  );
  const conversationList = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.results
  );
  const converationsSelectedLang = useSelector(
    (store) =>
      store?.conversationLandingState?.selectedConversationInfo?.languageDetails
        ?.language
  );
  const converationsSelected = useSelector(
    (store) => store?.conversationLandingState?.selectedConversationInfo
  );
  useEffect(() => {
    if (typeOfMessage) {
      if (typeOfMessage === "Chunking") {
        setMsgType((prev) => "Chunk_Transcript");
      } else {
        setMsgType((prev) => "Live_Transcript");
      }
    }
  }, [typeOfMessage]);
  //nit       ---------------------------

  const waveformRef = useRef();
  function chunkCurrent(start, end, speaker, tags, other) {
    //regionDispacher({ type: "ADD_REGION", payload: { start, end, speaker } });

    let isValid = true;
    regions.forEach((e) => {
      if (e.speaker === speaker) {
        //console.log("chunking things","trimmer",start,end,"current",e.start,e.end)
        // let x=(start<e.start &&end>e.start)||(start<e.end&&end>e.end)||(start<e.start&& end<e.end)
        //       if(x) {
        //         isValid=false
        //       }
        if (e.start <= start && start < e.end) {
          isValid = false;
        }
        if (e.start < end && end <= e.end) {
          isValid = false;
        }
      }
    });

    const lang = tags.find((e) => e.type === "Language");
    if (isValid) {
      postChunkingTime(
        {
          conversationId: messageListData?.conversationId,

          sessionId: conversationList?.[0]?.sessionId,

          recordingFileUrl: selectedConversationInfo?.recordingFile
            ? selectedConversationInfo?.recordingFile
            : "",

          language: converationsSelectedLang
            ? converationsSelectedLang
            : "Hindi",

          startTime: start,

          endTime: end,

          speaker: speaker === "bot" ? "Bot" : "User",
          tags: {
            others: { other, multi: tags },
          },
        },

        dispatch
      );
    } else {
      toast.error("Same regions cannot be chunked!");
    }
  }

  function playRegion(id, play) {
    if (waveformRef.current) {
      waveformRef.current.playRegion(id, play);
    }
  }

  async function validOnSave(id) {
    if (chunk !== "Chunking") {
      return true;
    }
    if (waveformRef?.current) {
      const { start, end, speaker } =
        await waveformRef.current.fetchEditChunkInfo(id);
      let isValid = true;

      regions.forEach((each) => {
        if (each.speaker === speaker) {
          if (each.id != id) {
            if (
              (each.start <= start && start < each.end) ||
              (each.start < end && end <= each.end)
            ) {
              isValid = false;
            }
          }
        }
      });

      return isValid;
    }
    return false;
  }
  function save(id) {
    if (waveformRef.current) {
      const { start, end, speaker } =
        waveformRef.current.fetchEditChunkInfo(id);
      // regionDispacher({
      //   type: "EDIT_REGION",
      //   payload: { id, start, end, speaker },
      // });
      console.log(start, end, speaker, "new data");
    }

    setEditMode(() => {
      return { isEditMode: false, id: null };
    });
  }
  function edit(id) {
    if (waveformRef.current) {
      if (!edit.isEditMode) {
        setEditMode(() => {
          return {
            isEditMode: true,
            id: id,
          };
        });
        let currentSpeaker;
        regions.map((e) => {
          if (e.id === id) {
            currentSpeaker = e.speaker;
          }
          return e;
        });
        console.log(currentSpeaker, "speaker");
        waveformRef.current.setSpeaker(currentSpeaker);
      }
    } else {
      console.error("first commit the edit");
    }
    if (chunk !== "Chunking") {
      setEditMode({ isEditMode: true, id });
    }
  }
  // zoom
  useEffect(() => {
    setTimeout(() => {
      if (waveformRef.current) {
        waveformRef.current.zoom();
        console.log("zoom outside");
      }
    }, 300);
  }, [waveformRef, leftSideShow]);
  //-------------------------------

  // console.log("agent Type", chunkMsgList);

  const [playEditData, setPlayEditData] = useState(null);

  //get language from redux
  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );
  // console.log("chunk", selectedConversationInfo);
  useEffect(() => {
    let arr = allLanguageList?.map((e) => {
      return e?.name;
    });
    setAllLanguage((prev) => arr);
  }, [allLanguageList]);
  //get conversationMsg for id
  useEffect(() => {
    // console.log("ggg1", messageListData?.messageList);
    setMessageConversation((prev) => messageListData?.messageList);
  }, [messageListData]);
  useEffect(() => {
    if (chunkMsgList) {
      let dataArray = messageListData?.messageList
        ? messageListData?.messageList
        : [];
      dataArray?.push(chunkMsgList);
      //  dataArray?.sort((a ,b) => {
      //             if(a?.tags?.startTime && b?.tags?.startTime){
      //               return a?.tags?.startTime - b?.tags?.startTime
      //             }
      //           })
      getMsgListwithLiveChunk(dispatch, dataArray);
      setMessageConversation((prev) => [...dataArray]);
    }
  }, [chunkMsgList]);
  // console.log(messageListData, "rr", messageConversation);
  // console.log(
  //   "lodderbhai",
  //   messageListData?.loadingmessageList,
  //   messageLoader,
  //   messageListData
  // );

  // update message
  const getUpdateMessage = (
    msg,
    data,
    intentData,
    EntentsData,
    language,
    customTags
  ) => {
    if (
      msg ||
      intentData ||
      EntentsData ||
      language?.length ||
      speakerType ||
      customTags
    ) {
      let conversationData = {
        id: data?.id,
        conversationId: messageListData.conversationId,
        updatedText: msg,
        // speaker: speakerType,
        tags: data?.tags,
      };
      if (chunk === "Chunking") {
        conversationData.speaker = speakerType;
      }
      if (intentData) {
        let tags = data?.tags;
        // console.log("btn", intentData, conversationData, data?.tags);
        tags["nlu_data"]["intent_ranking"] = intentData;
        conversationData["tags"] = tags;
        // console.log("btn", intentData, conversationData, data?.tags);
      }
      if (EntentsData) {
        let tags = data?.tags;
        tags["nlu_data"]["entities"] = EntentsData;
        conversationData["tags"] = tags;
      }
      if (language?.length) {
        conversationData["language"] = language;
      }
      if (customTags) {
        conversationData["tags"]["customTags"] = customTags;
      }
      if (waveformRef?.current) {
        const { start, end, speaker } = waveformRef.current?.fetchEditChunkInfo(
          data?.id
        );
        // console.log(start,end ,"current time of region")

        if (conversationData["tags"] && (start || start == 0) && end) {
          conversationData["tags"]["startTime"] = start;
          conversationData["tags"]["endTime"] = end;
        } else {
          conversationData["tags"] = { startTime: start, endTime: end };
        }
      }
      language?.length
        ? updateTextLanguage(
            conversationData,
            converationsSelected?.sessionId,
            converationsSelected?.recordingFile,
            dispatch
          ).then((res) => {
            updateConversation(conversationData, dispatch).then((res) => {
              if (res.data) {
                getMessageList(
                  messageListData.conversationId,
                  msgType,
                  dispatch
                );
              }
            });
          })
        : updateConversation(conversationData, dispatch).then((res) => {
            if (res.data) {
              getMessageList(messageListData.conversationId, msgType, dispatch);
            }
          });
    } else if (waveformRef?.current) {
      let conversationData = {
        conversationId: messageListData.conversationId,
        messageId: data?.id,
        sessionId: selectedConversationInfo?.sessionId,
        recordingFileUrl: selectedConversationInfo?.recordingFile,
        // speaker: speakerType,
      };
      const { start, end, speaker } = waveformRef.current?.fetchEditChunkInfo(
        data?.id
      );
      console.log("@", start, end);
      if (chunk === "Chunking") {
        conversationData.speaker = speakerType;
      }
      if ((start || start == 0) && end) {
        conversationData["startTime"] = start;
        conversationData["endTime"] = end;
      }
      if (customTags) {
        conversationData["tags"]["customTags"] = customTags;
      }
      if (selectedMessage?.language) {
        conversationData["language"] = selectedMessage?.language;
      }
      // console.log("chunkabhi-2", conversationData);
      language?.length &&
        updateTextLanguage(
          conversationData,
          converationsSelected?.sessionId,
          converationsSelected?.recordingFile,
          dispatch
        ).then((res) => {
          getMessageList(messageListData.conversationId, msgType, dispatch);
        });
      //  conversationData.recordingFileUrl = undefined;
      // updateChunkingConversation(conversationData, dispatch).then((res) => {
      updateConversation(conversationData, dispatch).then((res) => {
        if (res?.data) {
          getMessageList(messageListData.conversationId, msgType, dispatch);
        }
      });
    }
  };

  // delete message
  const deleteConversationMsg = async (data) => {
    let obj = {
      id: data,
    };

    await deleteConversation(obj, dispatch);
    getMessageList(messageListData.conversationId, msgType, dispatch);
    setEditMode(() => {
      return { isEditMode: false, id: null };
    });
  };

  // get all data of conversation card
  const getAllDataOfConversationCard = (data) => {
    setSelectedMessageDetails(dispatch, data);
  };

  // console.log("abhishekjjjjjj", messageConversation);
  const toshowLang = (data) => {
    setShowLangDrop(data);
  };
  //for showing toster
  useEffect(() => {
    if (showLangDrop && !selectedMessage?.id) {
      throtledToast();
    }
  }, [showLangDrop]);
  useEffect(() => {
    if (selectedProjectGoal) {
      setChunk((prev) => {
        return selectedProjectGoal[0] ? selectedProjectGoal[0] : "Chunking";
      });
      setTypeofMessage(dispatch, selectedProjectGoal[0]);
    }
  }, [selectedProjectGoal]);

  // useEffect(
  //   () => {
  //    let data = messageConversation?.sort((a ,b) => {
  //           if(a?.tags?.startTime && b?.tags?.startTime){
  //             return a?.tags?.startTime - b?.tags?.startTime
  //           }
  //         })
  //         setMessageConversation(prev => [...data])
  //        console.log("ggg" , data)
  //   },[messageConversation?.length]
  // )

  const [array, setArray] = useState([]);

  useEffect(() => {
    const arr = [...messageConversation].sort((a, b) => {
      return parseFloat(a.tags.startTime) - parseFloat(b.tags.startTime);
    });
    // console.log(arr, "sorted array");
    setArray(arr);
  }, [messageConversation]);
  useEffect(() => {
    if (editMode.isEditMode) {
      // console.log(editMode, "nithin");
      setArray((prev) => {
        return prev.map((e) => {
          if (e.id == editMode.id) {
            e.speake = speakerType;
          }

          return e;
        });
      });
    }
  }, [editMode, speakerType]);
  useEffect(() => {
    return () => {
      resetChunkingDataAction(dispatch);
      ResetLandingStateAction(dispatch);
    };
  }, []);
  // console.log("oo" , lodderUpdate)
  return (
    <div className="transcriptChunkingwrapper">
      <Subnavbar
        leftIcons={[{ icon: goback, onClick: goBackToProjects }]}
        toggle={{ open: open, close: close, handler: setLeftSideShow }}
        chunkType={chunk}
        getChunkType={getChunk}
        togetLangShow={toshowLang}
        msgList={messageConversation}
        editMode={editMode}
      />
      <div className={`chunsidewrapper`}>
        {" "}
        <div className={`${leftSideShow ? "" : "hideVissibility"}`}>
          <LeftSideChunking />
        </div>
        <div className={`${leftSideShow ? "smallrightside" : "bigrightside"}`}>
          {lodderUpdate && (
            <TransparentModal>
              {" "}
              <div className="lodderLibery">
                <div className="lodderUpdate">Processing</div>
                <LineLoader />
              </div>{" "}
            </TransparentModal>
          )}
          {(messageLoader || messageListData?.loadingmessageList) &&
          lodderUpdate == false ? (
            <LoaderSaarthi />
          ) : !conversationList || conversationList?.length == 0 ? (
            <NoDataModal img={noDataPic} message="No Conversation Found!" />
          ) : (
            <>
              {chunk == "Chunking" ? (
                <>
                  <Waveform
                    url={
                      selectedConversationInfo?.recordingFile?.includes(
                        "saarthicalls"
                      )
                        ? selectedConversationInfo?.recordingFile +
                          `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_SAARTHICALL}`
                        : selectedConversationInfo?.recordingFile +
                          `?${process.env.REACT_APP_ACCESS_TOKEN_LOGGER_AMEYOCALL}`
                    }
                    regions={regions}
                    editMode={editMode}
                    chunk={chunkCurrent}
                    ref={waveformRef}
                    selectedConversationMsg={setSelectedMessageDetails}
                  />
                </>
              ) : null}
              {/* <button onClick={handlePlay}>Play</button>
            <button onClick={handleEdit}>Edit</button> */}
              {
                <div
                  className={
                    chunk === "Chunking" ? "columnar" : "columnar columnar2"
                  }
                >
                  {messageLoader || messageListData?.loadingmessageList
                    ? ""
                    : array?.map((each, i) => {
                        if (each.speaker == "Bot") {
                          return (
                            <div
                              key={i}
                              id={each.id}
                              className="botwala-converations"
                            >
                              <IndividualConversation
                                key={each.id}
                                obj={each}
                                updateMsg={(
                                  msg,
                                  data,
                                  intentData,
                                  EntentsData,
                                  language,
                                  customTags
                                ) => {
                                  getUpdateMessage(
                                    msg,
                                    data,
                                    intentData,
                                    EntentsData,
                                    language,
                                    customTags
                                  );
                                }}
                                deleteMsg={(id) => {
                                  deleteConversationMsg(id);
                                }}
                                getAllDataInfo={getAllDataOfConversationCard}
                                showDropdown={showLangDrop}
                                allLang={allLanguage}
                                setGlobalEditMode={() => edit(each.id)}
                                save={save}
                                validOnSave={validOnSave}
                                setEditModeTranscript={setEditMode}
                                editMode={editMode}
                                play={(play) => {
                                  playRegion(each.id, play);
                                }}
                                chunk={chunk}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={i}
                              id={each.id}
                              className="clientwala-converations"
                            >
                              <IndividualConversation
                                key={each.id}
                                obj={each}
                                updateMsg={(
                                  msg,
                                  data,
                                  intentData,
                                  EntentsData,
                                  language,
                                  customTags
                                ) => {
                                  getUpdateMessage(
                                    msg,
                                    data,
                                    intentData,
                                    EntentsData,
                                    language,
                                    customTags
                                  );
                                }}
                                deleteMsg={(id) => {
                                  deleteConversationMsg(id);
                                }}
                                getAllDataInfo={getAllDataOfConversationCard}
                                showDropdown={showLangDrop}
                                allLang={allLanguage}
                                setGlobalEditMode={() => edit(each.id)}
                                validOnSave={validOnSave}
                                save={save}
                                setEditModeTranscript={setEditMode}
                                play={(play) => {
                                  playRegion(each.id, play);
                                }}
                                editMode={editMode}
                                chunk={chunk}
                              />
                            </div>
                          );
                        }
                      })}
                  {/* <div className="botwala-converations">
                  <IndividualConversation />
                </div>
                <div className="clientwala-converations">
                  <IndividualConversation />
                </div> */}
                </div>
              }
            </>
          )}
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
    </div>
  );
}
