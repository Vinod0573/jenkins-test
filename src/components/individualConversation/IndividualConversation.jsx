import React, { useEffect, useRef } from "react";
import "./IndividualConversation.css";
import edit from "../../assets/summarysection/edit.svg";
import trash from "../../assets/summarysection/trash.svg";
import play from "../../assets/summarysection/play.svg";
import pause from "../../assets/summarysection/pause.svg";
import refresh from "../../assets/summarysection/refresh.svg";
import blueplus from "../../assets/summarysection/blueplus.svg";
import bluedit from "../../assets/summarysection/bluedit.svg";
import cross from "../../assets/summarysection/cross.svg";
import saveBtn from "../../assets/summarysection/saveBtn.svg";
import botIcon from "../../assets/summarysection/aiIcon.svg";
import agentIon from "../../assets/summarysection/agentIcon.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectSimple from "../multiselectsimple/MultiSelectSimple";
import MultiSelectDropdown from "../../components/ui-kits/multiselectdropdown/MultiSelectDropdown";
import SingleSelectDD from "../singleselectdd/SingleSelectDD";
import { showSummaryofConversation } from "../../actions/GetAllConversationApiAction";
import caratdown from "../../assets/summarysection/caratdown.svg";
import tickBlue from "../../assets/summarysection/tickBlue.svg";
import closeBlue from "../../assets/summarysection/closeBlue.svg";
import blackPlus from "../../assets/summarysection/blackPlus.svg";
import blueTags from "../../assets/summarysection/blueTags.svg";
import greyTag from "../../assets/summarysection/greyTag.svg";
import blackArrow from "../../assets/summarysection/blackArrow.svg";
import Dropdown from "react-multilevel-dropdown";
import { postTagsForDropdown } from "../../actions/NavigationComponentApiAction";
import crossBlack from "../../assets/summarysection/crossBlack.svg";
import {
  chunkStartEndTime,
  getAudioPlayOrPause,
  getAudioReplay,
} from "../../actions/NavigationComponentApiAction";
import { el } from "date-fns/locale";
import { element } from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import { refreshPlayTranscript, setPlayTranscriptAudio, setStartEndTranscriptAudio, togglePlayTranscriptAudio } from "../../actions/TranscriptAudioAction";
import useOnClickOutside from "../../utilities/useOnClickOutside";

export default function IndividualConversation(props) {
  const [showMSpopupEntity, setShowMSpopupEntity] = useState(false);
  const [showMSpopupIntent, setshowMSpopupIntent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [crossId, setCrossId] = useState(null);
  const [obj, setObj] = useState(props.obj);

  const [message, setMessage] = useState();
  const [suffledIntents, setsuffledIntents] = useState();
  const [suffledEntents, setSuffeledEntents] = useState();
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [audioPlay, setAudioPlay] = useState(false);
  const [msgEdited, setmsgEdited] = useState();
  const [intentOut, intentSelectedOut] = useState();
  const [entityOut, entitySelectedOut] = useState();
  const [multiLL, setMultiLL] = useState([]);
  const [selectedMultiSelect, setSelectedMultiSelect] = useState([]);
  const [ssData, setSSData] = useState({});
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showCustomTag, setShowCustomTags] = useState(false);
  const [multiselectoptions, setMultiselectOptions] = useState([]);
  const [multiLevelData, setMultiLevelData] = useState([]);
  const popref = useRef();
  const allEntity = ["Date", "Time"];
  const selectedMessage = useSelector(
    (store) => store.getAllConversationApiState.getSelectedData
  );
  const showMsgSummary = useSelector(
    (store) => store.getAllConversationApiState.showSummaryforConversation
  );
  const typeOfMessage = useSelector(
    (store) => store?.getAllConversationApiState.typeOfMessage
  );
  const palyorpause = useSelector(
    (store) => store.messageListState?.audioPlayOrPause
  );
  const transcriptPlayPause= useSelector(
    (store) => store.getAllConversationApiState?.transcriptAudioPlay
  );

  const ref = useRef();

  const dispatch = useDispatch();
  //all handles for inputs
  const handleMouseOver = (e, i) => {
    if (editMode) {
      setCrossId((prev) => i);
      setShowCross((prev) => true);
    }
  };
  const handleMouseOut = (e, i) => {
    if (editMode) {
      setCrossId((prev) => null);
      setShowCross((prev) => false);
    }
  };
  const handleDeleteIntent = (data) => {
    let tempArr = [...intentOut];
    const indexr = tempArr.indexOf(data);
    if (indexr > -1) {
      tempArr.splice(indexr, 1);
    }
    intentSelectedOut((prev) => [...tempArr]);
    suffleIntent([...tempArr]);
    console.log("ff", data);
  };
  //----------------
  const speakerType = useSelector(
    (store) => store.messageListState?.agentTypeByToggle
  );
  const [speaker, setSpeaker] = useState(props?.obj?.speaker);
  useEffect(() => {
    if (editMode && props.chunk === "Chunking") {
      setSpeaker(speakerType);
    }
  }, [editMode, speakerType]);
  //----------------
  const handleDeleteEntent = (data) => {
    let tempArr = [...entityOut];
    const indexr = tempArr.indexOf(data);
    if (indexr > -1) {
      tempArr.splice(indexr, 1);
    }
    entitySelectedOut((prev) => [...tempArr]);
    suffleEntent([...tempArr]);
  };

  const handleChangeInText = (e) => {
    setMessage((prev) => [e.target.value]);
    setmsgEdited((prev) => [e.target.value]);
  };
  const handlePlayAudioBetweenTwoPoints = (data, id) => {
    props.play(!audioPlay);
    let obj = {
      startTime: data?.tags?.startTime,
      endTime: data?.tags?.endTime,
      speaker: data?.speaker,
      mode: "play",
      id: id,
    };
    let audio = audioPlay;
    setAudioPlay((prev) => !audio);

    if (typeOfMessage !== "Transcript") {
      chunkStartEndTime(dispatch, obj);
      getAudioPlayOrPause(dispatch, !audio);
    } else {
      getAudioPlayOrPause(dispatch, !audio);
    }
  };

  const handleTransciptReplay=(data)=>{
     
    dispatch(setStartEndTranscriptAudio({startTime:data?.tags?.startTime,endTime:data?.tags?.endTime}));
    
    dispatch(refreshPlayTranscript())
    dispatch(setPlayTranscriptAudio(true));
  };
  const handlePlayAudioBetweenTwoPointsTrancript=(data)=>{
    dispatch(setStartEndTranscriptAudio({startTime:data?.tags?.startTime,endTime:data?.tags?.endTime}));
       dispatch(togglePlayTranscriptAudio());
  }
  window.onclick = (e) => {
    console.log("CLICKED -mk win");
    if (e.target == document.getElementById("maskerdhsird98_32")) {
      console.log("clicked ,mkso");
      setShowMSpopupEntity(false);
      setshowMSpopupIntent(false);
    }
  };

  const onSvaeEditData = (obj, id) => 
  {   
    showSummaryofConversation(dispatch, false);
    if (editMode) {
       
      props.updateMsg(
        obj,
        id,
        suffledIntents,
        suffledEntents,
        selectedLanguage,
        { multiselect: selectedMultiSelect, otherTags: multiLL }
      );
       
     

    } else {
      let obj = {
        startTime: id?.tags?.startTime,
        endTime: id?.tags?.endTime,
        speaker: id?.speaker,
        mode: "edit",
        id: id,
      };

      if (typeOfMessage !== "Transcript") {
        chunkStartEndTime(dispatch, obj);
      }
    }
    setEditMode((prev) => !prev);
  };
  useEffect(() => {
    if (editMode) {
      props.setGlobalEditMode();
    } else {
      props.setEditModeTranscript({ isEditMode: false, id: null });
    }
  }, [editMode]);
  //delete msg
  const deleteConversation = (id) => {
    props.deleteMsg(id);
  };

  //use Effect sections
  // useEffect(() => {
  //   setObj((prev) => {
  //     return { ...obj, intent: intentOut };
  //   });
  // }, [intentOut]);

  // useEffect(() => {
  //   setObj((prev) => {
  //     let temp = obj;
  //     let toshow = temp?.entity?.filter((e) => {
  //       // to filter what to show on box
  //       return entityOut.includes(e.name);
  //     });
  //     return { ...obj, entity: toshow };
  //   });
  // }, [entityOut]);

  useEffect(() => {
    if (obj?.updatedText?.length > 0) {
      setMessage((prev) => obj?.updatedText);
    } else {
      setMessage((prev) => obj?.text);
    }
  }, [obj]);
  let intentArray = obj?.tags?.nlu_data?.intent_ranking?.map((e) => e?.name);
  useEffect(() => {
    let intentArray = obj?.tags?.nlu_data?.intent_ranking?.map((e) => e?.name);
    intentSelectedOut((prev) => intentArray);
  }, [obj?.tags?.nlu_data]);
  useEffect(() => {
    let EntentArray = obj?.tags?.nlu_data?.entities?.map((e) => e?.entity);
    entitySelectedOut((prev) => EntentArray);
  }, [obj?.tags?.nlu_data]);

  const suffleEntent = (Entent) => {
    if (Entent) {
      let EntentArray = obj?.tags?.nlu_data?.entities?.map((e) => e?.entity);
      let temp = [];
      Entent?.map((e) => {
        EntentArray?.map((d) => {
          if (d?.entity === e) {
            temp?.push(d);
          }
        });
      });
      setSuffeledEntents((prev) => temp);
    }
  };

  const suffleIntent = (intent) => {
    let intentArray = obj?.tags?.nlu_data?.intent_ranking;
    let temp = [];
    intent?.map((e) => {
      intentArray?.map((d) => {
        if (d?.name === e) {
          temp?.push(d);
        }
      });
    });

    setsuffledIntents((prev) => temp);
  };

  //onChange event for intent dropdown
  const onChangeIntent = (data) => {
    suffleIntent(data);
    intentSelectedOut((prev) => data);
  };

  //onChange event for Entent dropdown
  const onChangeEntent = (data) => {
    suffleEntent(data);
    entitySelectedOut((prev) => data);
  };

  // handle replay
  const handleRePlayAudio = () => {
    getAudioReplay(dispatch, "replay");
    props.play(true);
  };

  const handleTitleChange = (e) => {
    if (e.target.value && e.target.value?.length > 0) {
      setShowSubmitBtn((prev) => true);
    } else {
      setShowSubmitBtn((prev) => false);
    }
  };
  const handleSubmitOFCustomTags = (e) => {
    e.preventDefault();
    postTagsForDropdown(dispatch, {
      name: e.target.title.value,
      description: e.target.description.value,
      type: "multiselect",
    });
    setShowCustomTags((prev) => false);
    setShowTags((prev) => false);
  };

  let resd = useSelector((state) => {
    return state.messageListState?.tagDropdownData?.data;
  });
  useEffect(() => {
    let multi = [];
    let multilevel = [];
    resd &&
      resd.length > 0 &&
      resd.forEach((e) => {
        if (e.type === "multiselect") {
          multi.push(e.name.charAt(0).toUpperCase() + e.name.substring(1));
        }

        if (e.type === "options") {
          multilevel.push({
            name: e.name.charAt(0).toUpperCase() + e.name.substring(1),
            options: e.options,
          });
        }
      });

    setMultiLevelData((prev) => [...multilevel]);
    setMultiselectOptions((prev) => [...multi]);
  }, []);
  useEffect(() => {
    if (Object.keys(ssData)?.length > 0) {
      if (ssData.type == "Language") {
        let x = multiLL;
        x = x.filter((e) => e.type !== "Language");
        ssData.value == ""
          ? setMultiLL((prev) => {
              return [...x];
            })
          : setMultiLL((prev) => {
              return [...x, ssData];
            });
      } else if (ssData.type == "Sentiment") {
        let x = multiLL;
        x = x.filter((e) => e.type !== "Sentiment");
        ssData.value == ""
          ? setMultiLL((prev) => {
              return [...x];
            })
          : setMultiLL((prev) => {
              return [...x, ssData];
            });
      } else if (ssData.type == "Emotion") {
        let x = multiLL;
        x = x.filter((e) => e.type !== "Emotion");
        ssData.value == ""
          ? setMultiLL((prev) => {
              return [...x];
            })
          : setMultiLL((prev) => {
              return [...x, ssData];
            });
      } else {
        setMultiLL((prev) => {
          return [...multiLL, ssData];
        });
      }
    }
  }, [ssData]);
  //pop of tags

  const handleClose = (e) => {
    setMultiLL([]);
    setSelectedMultiSelect([]);
    setShowTags(false);
  };
  const handleOk = (e) => {
    setShowTags(false);
  };

  useEffect(()=>{
    
     if(showTags){
      setShow(false);
      
     }
     if(show){
      setShowTags(false)
     }
  },[show ,showTags])
  // console.log(multiLL, selectedMultiSelect,"SELECTED CUSTOMS");
  // console.log(props.obj,"SELECTED CUSTOMS");
  useEffect(()=>{
    props.obj?.tags?.customTags?.otherTags&&setMultiLL(props.obj?.tags?.customTags?.otherTags);
    props.obj?.tags?.customTags?.multiselect&&setSelectedMultiSelect(props.obj?.tags?.customTags?.multiselect)
  },[props.obj])

  useOnClickOutside(ref, () => setShowTags(false));

  return (
    <div className="individual-conversation-ghfj_1">
      <div
        className="individual-conversation-inner0e3"
        onClick={(e) => {
          props.getAllDataInfo(obj);
        }}
      >
        <div
          className={
            "individual-conversation-top-sec " + "a" + obj.id + "indiwe"
          }
        >
          <div className="firstContainerIconAndName">
            <p className="lightertextp">
            
              {obj?.tags?.startTime || obj?.tags?.startTime == 0
                ? Number(obj?.tags?.startTime)?.toFixed(2) +
                  "s" +
                  "-" +
                  Number(obj?.tags?.endTime)?.toFixed(2) +
                  "s"
                : ""}
            </p>
            <div>
              {props.showDropdown &&
              editMode &&
              selectedMessage?.id == obj?.id ? (
                <>
                  <div className="mask0-223ye">
                    <div
                      className="lang_292"
                      onClick={(e) => setShow((prev) => !prev)}
                    >
                      <p className="langdjd928">
                        {selectedLanguage?.length > 0
                          ? selectedLanguage
                          : "Language"}
                      </p>
                      <img src={caratdown} alt="" />{" "}
                    </div>
                    {show && (
                      <div className="posiuerjrefi" id="djsskd_92283Xps">
                        {" "}
                        <SingleSelectDD
                          options={props?.allLang}
                          dataOutSide={setSelectedLanguage}
                          defaultSelected={selectedLanguage}
                        />
                        <div className="made-d29383">
                          <img
                            className="closeblue"
                            src={closeBlue}
                            onClick={(e) => {
                              setShow((prev) => false);
                              setSelectedLanguage((orev) => []);
                            }}
                            alt=""
                          />
                          |
                          <img
                            className="closetick"
                            onClick={(e) => setShow((prev) => false)}
                            src={tickBlue}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="agentNameIconContainer">
              <img
                className="speakerTypeimg"
                src={speaker == "Bot" ? botIcon : agentIon}
                alt="Agent"
              ></img>
              <div className="agentTypeP">
                {" "}
                {speaker == "Bot" ? "AI Agent" : "Customer"}
              
              </div>
            </div>
          </div>
          <div className="iconContainer">
            {
              <>
                {" "}
                {editMode && (
                  <img
                    className="tagei9382ckd93j icon-style"
                    src={
                      multiLL.length > 0 || selectedMultiSelect.length > 0
                        ? blueTags
                        : greyTag
                    }
                    onClick={() => {
                      setShowTags((prev) => {
                        return prev ? false : true;
                      });
                    }}
                    alt="tags"
                  />
                )}
                {selectedMessage?.id == obj?.id && showTags && (
                  <div ref={ref}>
                    {/* <div className="maskerdhsird98_32"
                        id="maskerdhsird98_32"></div> */}
                    <div
                      className={
                        speaker == "Bot"
                          ? "positioner-divd933983034983is834hdio"
                          : "posieieuyrbcie92bxmwo2_cus"
                      }
                    >
                      {!showCustomTag && (
                        <>
                          <div className="makemerecsdsothatnooencanse">
                            <MultiSelectSimple
                              options={multiselectoptions}
                              setDataOut={setSelectedMultiSelect}
                              defaultSelected={selectedMultiSelect}
                              freeze={!editMode}
                            />

                            {multiLevelData?.length > 0 &&
                              multiLevelData.map((each, i) => {
                                return (
                                  <Dropdown.Item className="eachitemieiruwe93">
                                    <p>{each.name}</p>
                                    <img
                                      style={{ width: "7px" }}
                                      src={blackArrow}
                                      alt="dks"
                                    />

                                    <Dropdown.Submenu position="right">
                                      <SingleSelectDD
                                        options={each.options}
                                        extraData={each.name}
                                        dataOutSide={setSSData}
                                        selectedDataBlueBackground={true}
                                        defaultSelected={
                                          multiLL.filter((e) => {
                                            return e.type === each.name;
                                          }).length > 0 &&
                                          multiLL.filter((e) => {
                                            return e.type === each.name;
                                          })[0].value
                                        }
                                        freeze={!editMode}
                                      />
                                    </Dropdown.Submenu>
                                  </Dropdown.Item>
                                );
                              })}
                          </div>

                          <div
                            className="addcustome"
                            onClick={() => {
                              setShowCustomTags((prev) => true);
                            }}
                          >
                            <img
                              className="blackadd"
                              src={blackPlus}
                              alt="+"
                              id="dscnchdje9e3jnucsnrfcsiuf030fgrfuglisj"
                            />
                            <p className="addtextshjs">Add</p>
                          </div>
                          <div className="belolowokclose-20dnwjd">
                            <button
                              className="bthdniwbxf92"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button className="bthdniwbxf92" onClick={handleOk}>
                              OK
                            </button>
                          </div>
                        </>
                      )}

                      {showCustomTag && (
                        <>
                          <div
                            className="positruirbdjihde_s82su8w2"
                            ref={popref}
                          >
                            <form
                              action=""
                              method="POST"
                              onSubmit={handleSubmitOFCustomTags}
                            >
                              <div className="innerdesing">
                                <p className="labelp8272">Title</p>
                                <input
                                  className="inputrhd8lsk"
                                  onChange={handleTitleChange}
                                  name="title"
                                  type="text"
                                />
                                <p className="labelp8272">Description</p>
                                <textarea
                                  name="description"
                                  className="diwe927he8"
                                ></textarea>
                                <div className="handldie93843hfidu93">
                                  <button
                                    type="submit"
                                    className="buttonofsubmitie82_1srpl"
                                   
                                  >
                                    Cancel
                                  </button>
                                  {showSubmitBtn && (
                                    <>
                                      <button
                                        type="submit"
                                        className="buttonofsubmitie82_14"
                                      >
                                        Done
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            }

            {showMsgSummary && selectedMessage?.id == obj?.id ? (
              ""
            ) : (
              <img
                src={editMode ? saveBtn : edit}
                onClick={async () => {
                  if (!props.editMode?.isEditMode) {
                   
                    onSvaeEditData(msgEdited, obj);
                  } else {
                    if (props.editMode.id === props.obj.id) {
                     
                      const isValid = await props.validOnSave(props.obj.id);

                      if (isValid) {
                        onSvaeEditData(msgEdited, obj);
                      } else {
                        toast("same regions cannot be chunked!");
                      }
                    }
                  }
                }}
                alt="edit"
                className="editIconconversation icon-style"
              />
            )}
            <img
              src={trash}
              onClick={() => deleteConversation(obj?.id)}
              className="deleteIcon icon-style"
              alt="del"
            />
          </div>
          <div className="toparawithedit">
            {
              // obj?.text?.map(
              //   (e) => {
              //     return(

              !editMode && showMsgSummary && selectedMessage?.id == obj?.id ? (
                <>
                  <p className={"bottxtew3"}>{[...obj?.text]}</p>
                  <p className={"customertxtew3"}>
                    {obj?.updatedText?.length ? [...obj?.updatedText] : ""}
                    {console.log([...obj?.updatedText], "bot")}
                  </p>
                </>
              ) : !editMode ? (
                <p
                  className={
                    obj?.updatedText?.length ? "customertxtew3" : "bottxtew3"
                  }
                >
                  {obj?.updatedText?.length
                    ? [...obj?.updatedText]
                    : [...obj?.text]}
                </p>
              ) : (
                // )
                //   }
                // )

                // obj?.text?.map(e => {
                //     return (
                <input
                  className="inpurbnhdhue672"
                  onChange={(e) => handleChangeInText(e)}
                  value={message}
                ></input>
              )
              //     )
              // })
            }
          </div>
        </div>
        <div className="individual-conversation-bottm">
          <div className="intenthallsdft">
            <p className="entity-intetpara">Intent</p>
            <div className="intent-connt">
              {intentOut?.map((each, i) => {
                return (
                  <>
                    <div
                      className="eachintentdsh"
                      onMouseLeave={(e) => handleMouseOut(e, 0)}
                      onMouseOver={(e) => handleMouseOver(e, 0)}
                    >
                      <div>{each}</div>
                      <div
                        style={{
                          width: "13px",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        {showCross && crossId == 0 && (
                          <img
                            onClick={(e) => handleDeleteIntent(each)}
                            src={cross}
                            alt="x"
                          />
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
              {editMode && (
                <>
                  {" "}
                  {intentArray?.length ? (
                    <img
                      src={blueplus}
                      onClick={(e) => setshowMSpopupIntent((prev) => true)}
                      style={{ marginLeft: ".6em", cursor: "pointer" }}
                      alt="+"
                    />
                  ) : (
                    ""
                  )}
                  {showMSpopupIntent && (
                    <>
                      <div
                        className="maskerdhsird98_32"
                        id="maskerdhsird98_32"
                      ></div>
                      <div className="positioner_3tue">
                        <MultiSelectSimple
                          options={intentArray}
                          setDataOut={onChangeIntent}
                          defaultSelected={intentOut}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="intenthallsdf">
            <div className="submakingsdsa">
              {" "}
              <p className="entity-intetpara">Entity</p>
              <div className="intent-connt">
                {entityOut?.map((each, i) => {
                  return (
                    <>
                      <div
                        className="eachintentdsh"
                        onMouseLeave={(e) => handleMouseOut(e, i)}
                        onMouseOver={(e) => handleMouseOver(e, i)}
                      >
                        <span className="bluepsands" style={{textTransform:'capitalize'}}>{each+":"}</span>
                        <span className="blackspansjd">{ obj?.tags?.nlu_data?.entities?.find(data=>data.entity==each)?.value}</span>
                        <div
                          style={{
                            width: "13px",
                            display: "flex",
                            cursor: "pointer",
                          }}
                        >
                          {showCross && crossId == i && (
                            <img
                              onClick={(e) => handleDeleteEntent(obj)}
                              src={cross}
                              alt="x"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
                {editMode && (
                  <>
                    {entityOut?.length ? (
                      <img
                        src={blueplus}
                        onClick={(e) => setShowMSpopupEntity((prev) => true)}
                        style={{ marginLeft: ".6em", cursor: "pointer" }}
                        alt="+"
                      />
                    ) : (
                      ""
                    )}
                    {showMSpopupEntity && (
                      <>
                        <div
                          className="maskerdhsird98_32"
                          id="maskerdhsird98_32"
                        ></div>
                        <div className="positioner_3tue">
                          <MultiSelectSimple
                            options={entityOut}
                            defaultSelected={entityOut}
                            setDataOut={onChangeEntent}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {obj?.audioUrl || typeOfMessage !== "Transcript" ? (
              <div className="playpausehalls">
                <img
                  className="imgplay"
                  src={
                    palyorpause && selectedMessage?.id == obj?.id ? pause : play
                  }
                  onClick={() => handlePlayAudioBetweenTwoPoints(obj)}
                  alt="play"
                />
                <img
                  src={refresh}
                  onClick={() => {
                    handleRePlayAudio();
                  }}
                  alt="refresh"
                />
              </div>
            ) : (
              obj.tags.startTime? <div className="playpausehalls">
              <img
                className="imgplay"
                src={
                  transcriptPlayPause&& selectedMessage?.id == obj?.id ? pause : play
                }
                onClick={() => handlePlayAudioBetweenTwoPointsTrancript(obj)}
                alt="play"
              />
              <img
                src={refresh}
                onClick={() => {
                  handleTransciptReplay(obj);
                }}
                alt="refresh"
              />
            </div>:<></>
            )}
          </div>
        </div>
        <div></div>
      </div>

      <div
        className={
          speaker === "Bot" ? "chat-arrowlilbot" : "chat-arrowlilspeaker"
        }
      ></div>
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
