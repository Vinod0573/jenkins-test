import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from "react";
import "./Waveform.css";
import WaveKiller from "./WaveKiller.library";
import { playerEventReducer } from "./Waveform.utils";

//-------- assets

import greyScissor from "../../../assets/summarysection/greyScissor.svg";
import greyTag from "../../../assets/summarysection/greyTag.svg";
import greyReplay from "../../../assets/summarysection/greyReplay.svg";
import greyPlay from "../../../assets/summarysection/greyPlay.svg";
import greyPause from "../../../assets/summarysection/greyPause.svg";
import greySpeed from "../../../assets/summarysection/greySpeed.svg";
import greyVolume from "../../../assets/summarysection/greyVolume.svg";
import greyZoom from "../../../assets/summarysection/greyZoom.svg";
import greyVertical from "../../../assets/summarysection/greyVertical.svg";
import blueVolume from "../../../assets/summarysection/blueVolume.svg";
import blueSpeed from "../../../assets/summarysection/blueSpeed.svg";
import blueZoom from "../../../assets/summarysection/blueZoom.svg";
import bluePause from "../../../assets/summarysection/bluePause.svg";
import bluePlay from "../../../assets/summarysection/bluePlay.svg";
import MultiSelectSimple from "../../multiselectsimple/MultiSelectSimple";
import blueReplay from "../../../assets/summarysection/blueReplay.svg";
import ToggleSwitch from "../../ui-kits/toggleSwitch/ToggleSwitch";
import avatar from "../../../assets/summarysection/avatar.svg";
import Dropdown from "react-multilevel-dropdown";
import SingleSelectDD from "../../singleselectdd/SingleSelectDD";
import blackArrow from "../../../assets/summarysection/blackArrow.svg";
import blackPlus from "../../../assets/summarysection/blackPlus.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getTagDropdownData,
  postChunkingTime,
  postTagsForDropdown,
  getAgentTypeByToggleButton,
  chunkingMsgList,
  getAudioPlayOrPause,
} from "../../../actions/NavigationComponentApiAction";

import { es } from "date-fns/locale";
import { string } from "prop-types";
import blueTags from "../../../assets/summarysection/blueTags.svg";
//
//import WaveKiller from "./WaveKiller.class";
/**
 * @typedef {Object} waveformParam
 * @property {string} url : pass the url of the component
 * @property {object} editMode : edit mode enable
 * @property {regions} regions : pass an array of regions
 */

/**
 * this
 * @param {waveformParam} props
 * @param {object} ref
 */
function Waveform(props, ref) {
  /**
   * ## this constains wave object
   *   @type {WaveKiller}
   */
  let wavesurferObj;
  let setWavesurferObj;
  [wavesurferObj, setWavesurferObj] = useState();
  const [toggle, setToggle] = useState(false);
  const [url, regions, editMode, chunk] = [
    props.url,
    props.regions,
    props.editMode,
    props.chunk,
  ];
  const wavesurferRef = useRef();
  const timelineRef = useRef();
  const [playerEvents, dispatchPlayerEvents] = useReducer(playerEventReducer, {
    zoom: 1,
    volume: 0.5,
    play: false,
    speed: 1,
    speaker: "bot",
  });

  const dispatch = useDispatch();

  //-------integration
  const [showTags, setShowTags] = useState(false);
  const [showCustomTag, setShowCustomTags] = useState(false);
  const [multiselectoptions, setMultiselectOptions] = useState([]);
  const [multiLevelData, setMultiLevelData] = useState([]);
  const [selectedMultiSelect, setSelectedMultiSelect] = useState([]);
  const [ssData, setSSData] = useState({});
  const [multiLL, setMultiLL] = useState([]);
  const [sliderType, setSliderType] = useState(null);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const handleVolumeBtn = () => {
    if (sliderType == "volume") {
      setSliderType((prev) => null);
    } else {
      setSliderType((prev) => "volume");
    }
  };

  const handleSpeedBtn = () => {
    if (sliderType == "speed") {
      setSliderType((prev) => null);
    } else {
      setSliderType((prev) => "speed");
    }
  };
  const handleZoomBtn = () => {
    if (sliderType == "zoom") {
      setSliderType((prev) => null);
    } else {
      setSliderType((prev) => "zoom");
    }
  };
  const handleSubmitOFCustomTags = (e) => {
    e.preventDefault();
    postTagsForDropdown(dispatch, {
      name: e.target.title.value,
      description: e.target.description.value,
      type: "multiselect",
    });
    setShowCustomTags(false);
    setShowTags(false);
  };
  const handleTitleChange = (e) => {
    if (e.target.value && e.target.value?.length > 0) {
      setShowSubmitBtn((prev) => true);
    } else {
      setShowSubmitBtn((prev) => false);
    }
  };

  window.onclick = (e) => {
    if (e.target === document.getElementById("maskjduefjd")) {
      setShowCustomTags((prev) => false);
      setShowTags((prev) => false);
    }
    if (e.target === document.getElementById("dsii2302-sdwee28zn")) {
      setShowTags((prev) => false);
      setShowCustomTags((prev) => false);
    }
  };

  //getting tag data
  useEffect(() => {
    //calling data for tags
    getTagDropdownData(dispatch).then((res) => {
      let resd = res.data.data;
      let multi = [];
      let multilevel = [];
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
    });
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

  useEffect(() => {
    console.log("MULLL", multiLL);
  }, [multiLL]);
  //-------

  // initiate the waveform
  //--------------------------–––––––––––------–––––––--–--------------

  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      let obj = new WaveKiller(wavesurferRef.current, timelineRef.current);

      setWavesurferObj((e) => {
        if (e) {
          //   console.log(" wave destroyed");
          e.obj.destroy();
        }
        // console.log("wave Resetted");
        return obj;
      });
    }
  }, [wavesurferRef, wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.obj.on("finish", () => {
        dispatchPlayerEvents({ type: "SET_PLAY", payload: false });
      });
    }
  }, [wavesurferObj]);

  //destry

  useEffect(() => {
    return () => {
      wavesurferObj?.destroy();
    };
  }, [wavesurferObj]);
  // ------------------------------------------------------------------
  // loading the object url
  useEffect(() => {
    if (wavesurferObj) {
      if (url) {
        wavesurferObj.load(url);
        wavesurferObj.pause();
      }
    }
  }, [wavesurferObj, url]);
  // ------------------------------------------------------–––––––––---
  // updating the regions when props region change

  useEffect(() => {
    if (wavesurferObj) {
      if (editMode.isEditMode) {
        if (editMode.id) {
          wavesurferObj.renderEditRegions(editMode.id);
        } else {
          console.log("id is not passed properly");
        }
      } else {
        wavesurferObj.renderRegions(regions);
      }
    }
  }, [editMode, regions, wavesurferObj]);
  // ------------------------------------------------------–––––––––---
  // audio events like pause play zoom
  function zoom() {
    if (wavesurferObj) {
      wavesurferObj.zoom(playerEvents.zoom);
    }
  }
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.zoom(playerEvents.zoom);
      console.log("zoomed");
    }
  }, [playerEvents.zoom, wavesurferObj]);
  //------ play pause
  useEffect(() => {
    if (wavesurferObj) {
      if (playerEvents.play) {
        wavesurferObj.play();
        console.log("Playing");
      } else {
        wavesurferObj.pause();
      }
      if (playerEvents.play === false) {
        wavesurferObj.removeLoopAllRegions();
      }
    }
    if (playerEvents.play) {
      setGreyPlay(false);
    }
  }, [playerEvents.play, wavesurferObj]);
  // toggle play on pressing space button
  function togglePlay(e) {
    //console.log(e,"play pause out")
    try {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        dispatchPlayerEvents({ type: "TOGGLE_PLAY" });
      }
    } catch (err) {
      console.error(err);
    }
  }
  // event listner for space button pressed and toggle play
  const keyDown = useRef();
  useEffect(() => {
    if (keyDown.current) {
      keyDown.current.addEventListener("keydown", togglePlay);
    }
    return () => {
      if (keyDown?.current) {
        keyDown.current.removeEventListener("keydown", togglePlay);
      }
    };
  }, [keyDown]);

  const [greyPlayEnable, setGreyPlay] = useState(true);
  //----- replay
  async function resetPlaying() {
    if (wavesurferObj) {
      dispatchPlayerEvents({ type: "SET_PLAY", payload: false });
      getAudioPlayOrPause(dispatch, false);
      await wavesurferObj.stop();
      await wavesurferObj.play();

      dispatchPlayerEvents({ type: "SET_PLAY", payload: true });
    }
  }
  useEffect(() => {
    dispatchPlayerEvents({
      type: "SET_SPEAKER",
      payload: toggle ? "customer" : "bot",
    });
  }, [toggle]);

  // change the id of region currently in edit mode
  useEffect(() => {
    if (wavesurferObj) {
      if (editMode.isEditMode)
        wavesurferObj.resetEditChunkSpeaker(playerEvents.speaker, editMode.id);
    }
  }, [playerEvents.speaker, wavesurferObj, editMode]);
  //------ volume
  useEffect(() => {
    if (wavesurferObj) {
      //console.log(playerEvents.volume);
      wavesurferObj.setVolume(playerEvents.volume);
    }
  }, [playerEvents.volume, wavesurferObj]);
  //-------zoom
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.zoom(playerEvents.zoom);
    }
  }, [playerEvents.zoom, wavesurferObj]);
  //--------- zoom on resize
  useEffect(() => {
    function zoomOnResize() {
      if (wavesurferObj) {
        wavesurferObj.zoom(playerEvents.zoom);
        // console.log("resizing");
      }
    }
    window.addEventListener("resize", zoomOnResize);
    return () => {
      window.removeEventListener("resize", zoomOnResize);
    };
  }, [wavesurferObj, playerEvents.zoom]);
  //--------soeed
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.speed(playerEvents.speed);
    }
  }, [playerEvents.speed, wavesurferObj]);

  //----------------chunk
  function chunkCurrent(id) {
    const speaker = playerEvents.speaker;
    const [start, end] = wavesurferObj.getRegionTime("trimmer");
    if (!editMode.isEditMode) {
      chunk(start, end, speaker, multiLL, selectedMultiSelect);
    }
  }
  //------- toggle speaker
  function fetchEditChunkInfo(id) {
    const [start, end] = wavesurferObj?.getRegionTime(id);

    return { start, end, speaker: playerEvents.speaker };
  }
  function playRegionWave(id, play) {
    if (wavesurferObj) {
      if (play) {
        dispatchPlayerEvents({ type: "SET_PLAY", payload: true });
        wavesurferObj.playRegion(id);
      } else {
        dispatchPlayerEvents({ type: "SET_PLAY", payload: false });
      }
    }
  }
  useImperativeHandle(ref, () => ({
    fetchEditChunkInfo: fetchEditChunkInfo,
    setSpeaker: (e) => {
      if (e === "bot") {
        setToggle(false);
      } else {
        setToggle(true);
      }
    },
    playRegion: playRegionWave,
    zoom: zoom,
  }));

  // for setting agent into redux
  useEffect(() => {
    if (toggle) {
      getAgentTypeByToggleButton(dispatch, "User");
    } else {
      getAgentTypeByToggleButton(dispatch, "Bot");
    }
  }, [toggle]);
  // for play and pause
  useEffect(() => {
    if (!playerEvents.play) {
      getAudioPlayOrPause(dispatch, false);
    }
  }, [playerEvents.play]);

  return (
    <section ref={keyDown} className="waveform-container">
      <div className="waveform-wrapperx">
        <div ref={wavesurferRef} id="waveform">
          <span id="tagger"></span>
        </div>
      </div>
      <div className="timelinewrapper">
        <div ref={timelineRef} id="wave-timeline"></div>
      </div>
      <div className="all-controls">
        <div className="left-container">
          <div className="centerthetoogle">
            <ToggleSwitch
              id="aiOrCust"
              checked={toggle}
              optionLabels={["Customer", "AI Agent"]}
              small={false}
              onChange={(checked) => {
                const speaker = checked ? "customer" : "bot";
                setToggle(checked);
              }}
            />
          </div>
          {/* <button
            title="play/pause"
            className="controls"
            onClick={handlePlayPause}
          >
            {playing ? (
              <i className="material-icons">pause</i>
            ) : (
              <i className="material-icons">play_arrow</i>
            )}
          </button>
          <button title="reload" className="controls" onClick={handleReload}>
            <i className="material-icons">replay</i>
          </button> */}
          <div className="controllersx">
            <div className="controls-in-center">
              <img
                style={
                  props.editMode.isEditMode
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
                onClick={() => {
                  if (!props.editMode.isEditMode) {
                    chunkCurrent();
                  }
                }}
                src={greyScissor}
                alt="trim"
              />
              {/* <div> */}
              {/* <img
                  style={{ cursor: "pointer" }}
                  src={(multiLL.length>0||selectedMultiSelect.length>0)? blueTags:greyTag}
                  onClick={() => {
                    setShowTags((prev) => true);
                  }}
                  alt="tags"
                /> */}
              {/* {showTags && (
                  <>
                    <div id="dsii2302-sdwee28zn"></div>

                    <div className="positioner-divdis834hdio">
                      {!showCustomTag && (
                        <>
                          <MultiSelectSimple
                            options={multiselectoptions}
                            setDataOut={setSelectedMultiSelect}
                            defaultSelected={selectedMultiSelect}
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
                                        
                                        multiLL.filter(e=>{return e.type===each.name}).length>0&&
                                        multiLL.filter(e=>{return e.type===each.name})[0].value
                                      }
                                    />
                                  </Dropdown.Submenu>
                                </Dropdown.Item>
                              );
                            })}
                        </>
                      )}
                      <div
                        className="addcustome"
                        onClick={() => {
                          setShowCustomTags((prev) => true);
                        }}
                      >
                        <img className="blackadd" src={blackPlus} alt="+" />
                        <p className="addtextshjs">Add</p>
                      </div>

                      {showCustomTag && (
                        <>
                          <div id="maskjduefjd"></div>
                          <div className="positruirbdjihde">
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
                                {showSubmitBtn && (
                                  <button
                                    type="submit"
                                    className="buttonofsubmitie82_1"
                                  >
                                    Done
                                  </button>
                                )}
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )} */}
              {/* </div> */}
              <img style={{ cursor: "pointer" }} src={greyVertical} alt="|" />
              <img
                className={`${
                  props.editMode.isEditMode ? "cursornone-wave" : ""
                }`}
                style={{ cursor: "pointer" }}
                src={
                  greyPlayEnable
                    ? greyPlay
                    : playerEvents.play
                    ? bluePause
                    : bluePlay
                }
                onClick={() => {
                  return (
                    dispatchPlayerEvents({ type: "TOGGLE_PLAY" }),
                    props.selectedConversationMsg(dispatch, [])
                  );
                }}
                alt="playpause"
              />
              <img
                style={{ cursor: "pointer" }}
                className={`${
                  props.editMode.isEditMode ? "cursornone-wave" : ""
                }`}
                src={greyReplay}
                onClick={() => {
                  resetPlaying();
                }}
                onMouseOver={(e) => e.target.setAttribute("src", blueReplay)}
                onMouseOut={(e) => e.target.setAttribute("src", greyReplay)}
                alt="replay"
              />
              <img style={{ cursor: "pointer" }} src={greyVertical} alt="|" />
              <img
                className={`${
                  props.editMode.isEditMode ? "cursornone-wave" : ""
                }`}
                style={{ cursor: "pointer" }}
                src={sliderType === "volume" ? blueVolume : greyVolume}
                onClick={handleVolumeBtn}
                alt="volume"
              />
              <img
                className={`${
                  props.editMode.isEditMode ? "cursornone-wave" : ""
                }`}
                style={{ cursor: "pointer" }}
                src={sliderType === "speed" ? blueSpeed : greySpeed}
                onClick={handleSpeedBtn}
                alt="speed"
              />
              <img
                className={`${
                  props.editMode.isEditMode ? "cursornone-wave" : ""
                }`}
                style={{ cursor: "pointer" }}
                src={sliderType === "zoom" ? blueZoom : greyZoom}
                onClick={handleZoomBtn}
                alt="zoom"
              />
            </div>
            <div className="right-container">
              {/* <div className="volume-slide-container">
            {volume > 0 ? (
              <i className="material-icons">volume_up</i>
            ) : (
              <i className="material-icons">volume_off</i>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeSlider}
              className="slider volume-slider"
            />
          </div> */}
              {sliderType == "zoom" && (
                <div className="volume-slide-container-wrapper">
                  <p>Zoom</p>
                  <div className="volume-slide-container">
                    <span id="bluepm">-</span>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      defaultValue={playerEvents.zoom}
                      onChange={(e) => {
                        dispatchPlayerEvents({
                          type: "SET_ZOOM",
                          payload: e.target.value,
                        });
                      }}
                      className="slider volume-slider"
                    />
                    <span id="bluepm">+</span>
                  </div>
                </div>
              )}
              {sliderType == "volume" && (
                <div className="volume-slide-container-wrapper">
                  <p>Volume</p>
                  <div className="volume-slide-container">
                    <span id="bluepm">-</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step=".05"
                      defaultValue={playerEvents.volume}
                      onChange={(e) => {
                        dispatchPlayerEvents({
                          type: "SET_VOLUME",
                          payload: e.target.value,
                        });
                      }}
                      className="slider volume-slider"
                    />
                    <span id="bluepm">+</span>
                  </div>
                </div>
              )}
              {sliderType == "speed" && (
                <div className="volume-slide-container-wrapper">
                  <p>Speed</p>
                  <div className="volume-slide-container">
                    <span>
                      {playerEvents.speed < 1 ? playerEvents.speed : -1}X
                    </span>
                    <input
                      type="range"
                      min=".25"
                      max="2"
                      step="0.25"
                      defaultValue={playerEvents.speed}
                      onChange={(e) => {
                        dispatchPlayerEvents({
                          type: "SET_SPEED",
                          payload: e.target.value,
                        });
                      }}
                      className="slider volume-slider"
                    />
                    <span>
                      {playerEvents.speed >= 1 ? playerEvents.speed : 1}X
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/**
 * this is comment
 * @example
 * const waveRef =useRef()
 * //to play
 * if(waveRef.current) {
 * waveRef.current.playRegion(id,play) // play the region of id
 * const {start,end,speaker}=waveRef.current.fetchEditChunkInfo(id) // get [start,end,speaker] of current edit
 * }
 * @param {string} url
 * @param {regions} regions pass the region
 * @param {object} editMode `{ isEditMode: boolean,id:string}
 * @param {function} chunk function used when trimmer is selected to create
 * @param {object} ref
 */
export default forwardRef(Waveform);
