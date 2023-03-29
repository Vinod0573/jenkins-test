import React, { useEffect, useRef, useState } from "react";
import Radio from "../radio/Radio";
import "./MetaInfo.css";
import carat from "../../assets/projectPageIcon/carat.svg";
import sound from "../../assets/projectPageIcon/sound.svg";
import text from "../../assets/projectPageIcon/text.svg";

import SingleSelectDD from "../singleselectdd/SingleSelectDD";
import MultiSelectSimple from "../multiselectsimple/MultiSelectSimple";
import redPlus from "../../assets/projectPageIcon/redPlus.svg";
import cross from "../../assets/projectPageIcon/cross.svg";
import Warn from "../warn/Warn";
import { useDispatch, useSelector } from "react-redux";
import { setIsUploadModal } from "../../actions/AssignProject";
import { getAllLangauge } from "../../actions/AssignProject";

export default function MetaInfo(props) {
  const { agentDetails } = props;
  const dispatch = useDispatch();
  //options
  const optionsForSingleSelect = ["WAV", "MP3", "RAW", "WMA"];
  const [selectedDataFormat, setSelectedDataFormat] = useState(
    agentDetails?.isTypeAudioDetails?.format
  );
  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );

  //option multislect
  const [optionsForMultiSelect, setOptionsForMultiSelect] = useState([]);
  useEffect(() => {
    let arr = allLanguageList?.map((e) => {
      return e?.name;
    });

    const language = arr;
    setOptionsForMultiSelect(language);
  }, [allLanguageList]);

  useEffect(async () => {
    getAllLangauge(dispatch);
  }, []);

  const [optionsSelected, setOptionsSelected] = useState([]);
  //for audio text
  const [out, setOut] = useState(null);
  const [audio, setAudio] = useState(null);
  //for converasation chunking
  const [outCC, setOutCC] = useState(null);
  const [convs, setConvs] = useState(null);
  //for ssdd  msdd drop down
  const [shouldsSDDAppear, setShouldSSDDAppear] = useState(false);
  const [shouldMSDDShow, setShouldMSDDShow] = useState(false);
  const [shouldShowWarn, setShouldShowWarn] = useState(false);

  const projectDetails = useSelector((store) => {
    return store.popUpState;
  });

  useEffect(() => {
    if (out && out.text == "Audio") {
      setAudio(true);
    }
    if (out && out.text == "Text") {
      setAudio(false);
    }
    if (out) {
      props.typedata(out.text);
    }
  }, [out]);

  useEffect(() => {
    if (outCC && outCC.text == "Conversation") {
      setConvs(true);
    }
    if (outCC && outCC.text == "Chunking") {
      setConvs(false);
    }
    if (outCC) {
      props.selectedLevel(outCC.text);
    }
  }, [outCC]);

  useEffect(() => {
    // dispatch({ type: "SET_META_DATA_LANGUAGE", payload: optionsSelected });
    props.selectedLanguages(optionsSelected);
  }, [optionsSelected]);

  useEffect(() => {
    if (selectedDataFormat) {
      props.selectedFormat(selectedDataFormat);
    }
  }, [selectedDataFormat]);
  const appearsSDD = (e) => {
    setShouldSSDDAppear((prev) => !prev);
  };
  const handleWarn = () => {
    //for test
    if (agentDetails?.type?.length > 0) {
      setIsUploadModal(false, dispatch);
      props.isUploadPossible(true);
    } else {
      setShouldShowWarn(true);
      props.isUploadPossible(false);
    }
  };
  window.onclick = (e) => {
    if (e.target == document.getElementById("maskeddffhj")) {
      setShouldSSDDAppear(false);
    }
    if (e.target == document.getElementById("maksedhdsjdi")) {
      setShouldMSDDShow(false);
    }
    if (e.target == document.getElementById("maskeddjfdueyw")) {
      setShouldShowWarn(false);
    }
  };

  useEffect(() => {
    console.log(agentDetails?.isTypeAudioDetails?.language, "112");
    if (agentDetails?.isTypeAudioDetails?.language?.length > 0) {
      setOptionsSelected(agentDetails?.isTypeAudioDetails?.language);
    }

    if (agentDetails?.isTypeAudioDetails?.level == "Conversation") {
      setConvs((prev) => true);
    } else {
      setConvs((prev) => false);
    }
  }, [agentDetails]);

  console.log(props.isEditClicked);

  return (
    <div className="meta-info-wrapper">
      <p className="metatilte">Meta Data Info</p>
      <div className="meta-info-wrapper-inner">
        <div className="audio-text">
          <Radio
            text={"Audio"}
            icon={sound}
            defaultValue={false}
            valueSetOut={agentDetails?.type == "Audio" ? true : false}
            sendOut={setOut}
            disabled={false}
          />
          <div style={{ width: "1.6em" }}></div>
          <Radio
            text={"Text"}
            icon={text}
            defaultValue={false}
            valueSetOut={agentDetails?.type == "Text" ? true : false}
            sendOut={setOut}
            disabled={false}
          />
        </div>

        {/* {out && out?.text == "Audio" && out.state && (
          <>
            <div className="lang">
              <p className="langua">Language</p>
              <img className="carat" onClick={e=>setShouldMSDDShow(prev=>true)} src={carat} alt=">" />
              <div className="slectedlang mtmksdj">{optionsSelected.length>0?`${optionsSelected[0]}${optionsSelected.length>1?`+${optionsSelected.length-1}`:""}`:""}</div>
            </div>
            {shouldMSDDShow&&<>
            <div id="maksedhdsjdi">
              <div id="positionsfddsjdf">
              <MultiSelectSimple options={optionsForMultiSelect} setDataOut={setOptionsSelected}
              defaultSelected={defaultSelected}
              />
              </div>
            </div>
            {shouldMSDDShow && (
              <>
                <div id="maksedhdsjdi">
                  <div id="positionsfddsjdf">
                    <MultiSelectSimple
                      options={optionsForMultiSelect}
                      setDataOut={setOptionsSelected}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="audio-text">
              <p className="langua" style={{ marginRight: "1em" }}>
                Level
              </p>
              <Radio
                text={"Conversation"}
                defaultValue={false}
                valueSetOut={agentDetails?.isTypeAudioDetails?.level=="Conversation"?true:false}
                sendOut={setOutCC}
              />
              <div style={{ width: "1.6em" }}></div>
              <Radio
                text={"Chunking"}
                defaultValue={false}
                valueSetOut={agentDetails?.isTypeAudioDetails?.level=="Chunking"?true:false}
                sendOut={setOutCC}
              />
            </div>

          </>
        )} */}

        {agentDetails?.type?.length > 0 && (
          <>
            <div className="lang">
              <p className="langua">Language</p>
              <img
                className="carat"
                onClick={(e) => {
                  setShouldMSDDShow((prev) => true);
                }}
                src={carat}
                alt=">"
              />
              <div className="slectedlang mtmksdj">
                {optionsSelected?.length > 0
                  ? `${optionsSelected[0]}${
                      optionsSelected?.length > 1
                        ? `+${optionsSelected.length - 1}`
                        : ""
                    }`
                  : ""}
              </div>
            </div>
            <>
              {shouldMSDDShow && (
                <div id="maksedhdsjdi">
                  <div id="positionsfddsjdf">
                    <MultiSelectSimple
                      options={optionsForMultiSelect}
                      setDataOut={setOptionsSelected}
                      defaultSelected={optionsSelected}
                      // actLikeSingleSelect={true}
                    />
                  </div>
                </div>
              )}
            </>
            <div className="audio-text">
              <p className="langua" style={{ marginRight: "1em" }}>
                Level
              </p>
              <Radio
                text={"Conversation"}
                defaultValue={props.isEditClicked ? convs : false}
                valueSetOut={convs}
                sendOut={setOutCC}
                disabled={false}
              />
              <div style={{ width: "1.6em" }}></div>
              <Radio
                text={"Chunking"}
                defaultValue={props.isEditClicked ? !convs : false}
                valueSetOut={!convs}
                sendOut={setOutCC}
                disabled={false}
              />
            </div>
            {agentDetails?.type == "Audio" && (
              <div className="lang lndrel">
                <p className="langua">Select Format</p>
                <img
                  onClick={() => {
                    appearsSDD();
                  }}
                  className="carat"
                  src={carat}
                  alt=">"
                />
                <div className="slectedlang formatmkdjd">
                  {agentDetails?.isTypeAudioDetails?.format}
                </div>
                {shouldsSDDAppear && (
                  <div className="maskeddf" id="maskeddffhj">
                    <div id="djsdh" className="bringssdtop">
                      <SingleSelectDD
                        options={optionsForSingleSelect}
                        dataOutSide={setSelectedDataFormat}
                        defaultSelected={selectedDataFormat}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div
        className="blue-upload-btn"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          handleWarn(e);
        }}
      >
        <p className="blue-upload-btn-text">UPLOAD FILES</p>
      </div>
      {shouldShowWarn && (
        <div id="maskeddjfdueyw">
          <div id="posirerneusdheri">
            <Warn
              icon={redPlus}
              text={"You Must select type of meta data"}
              color={"#FE0000"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
