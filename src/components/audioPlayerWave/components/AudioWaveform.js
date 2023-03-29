/** @format */
import React, { useState, useEffect, useContext, useRef } from "react";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import Wavesurfer from "wavesurfer.js";
import ToggleButton from "./ToggleButton";
import "./AudioWaveform.css";
import Toggle from "../../toggle/Toggle";

// import ToggleNeoSwitch from "../../toggleNeoSwitch/ToggleNeoSwitch";
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
import { enIE } from "date-fns/locale";
import {
  getTagDropdownData,
  postChunkingTime,
} from "../../../actions/NavigationComponentApiAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AudioWaveform = (props) => {
  const wavesurferRef = useRef(null);
  const timelineRef = useRef(null);
  const dispatch = useDispatch();

  const markersDefault = [
    { id: "bot-didw", start: "1", end: "10", drag: false },
    { id: "customer-ddsdwie", start: "15", end: "28", drag: false },
  ];
  // fetch file url from the context
  const [showTags, setShowTags] = useState(false);

  // crate an instance of the wavesurfer
  const [wavesurferObj, setWavesurferObj] = useState(null);
  const [playing, setPlaying] = useState("inactive"); // to keep track whether audio is currently playing or not
  const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
  const [zoom, setZoom] = useState(1); // to control the zoom level of the waveform
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [sliderType, setSliderType] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [showCustomTag, setShowCustomTags] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [regions, setRegions] = useState([]);
  const [maxTimeLine, setMaxTimeline] = useState(0);
  const [endAvail, setEndAvail] = useState(0);
  const [multiselectoptions, setMultiselectOptions] = useState([]);
  const [multiLevelData, setMultiLevelData] = useState([]);
  const [selectedMultiSelect, setSelectedMultiSelect] = useState([]);
  const [ssData, setSSData] = useState({});
  const [multiLL, setMultiLL] = useState([]);
  const location = useLocation();
  // duration is used to set the default region of selection for trimming the audio

  // create the waveform inside the correct component
  //dispatcher

  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      let obj = Wavesurfer.create({
        container: "#waveform",
        autoCenter: true,
        cursorColor: "#9E9E9E",
        waveColor: "#6C7B8B",
        progressColor: "#6C7B8B",
        responsive: true,
        dragSelection: false,
        plugins: [
          TimelinePlugin.create({
            container: "#wave-timeline",
          }),
          // RegionsPlugin.create({ regions: [...regions] }),
          RegionsPlugin.create({}),
        ],
      });

      setWavesurferObj((prev) => obj);
    }
  }, [wavesurferRef]);
  useEffect(() => {
    wavesurferObj?.pause();
    console.log("Routes changes");
  }, [location]);
  useEffect(() => {
    if (wavesurferObj) {
      updateRegions();
    }
  }, [regions, wavesurferObj]);

  // once the file URL is ready, load the file to produce the waveform
  useEffect(() => {
    setEndAvail((prev) => duration);
    console.log("DURATION-->", duration);
  }, [duration]);
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.load(props?.url);
      wavesurferObj?.pause();
      setPlaying((prev) => "inactive");
    }
  }, [wavesurferObj, props?.url]);
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.zoom(zoom);
  }, [zoom, wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setPlaybackRate(speed);
  }, [speed, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      // once the waveform is ready, play the audio
      window.onresize = () => {
        setWavesurferObj((prev) => prev);
      };
      wavesurferObj.on("ready", () => {
        // wavesurferObj.play();
        //wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
        setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
      });

      // once audio starts playing, set the state variable to true
      wavesurferObj.on("play", () => {
        setPlaying((prev) => "pause");
      });

      // once audio starts playing, set the state variable to false
      wavesurferObj.on("finish", () => {
        setPlaying((prev) => "play");
      });

      // if multiple regions are created, then remove all the previous regions so that only 1 is present at any given time
      // wavesurferObj.on("region-updated", (region) => {
      //   // const regionsx = region.wavesurfer.regions.list;
      //   //console.log(region.play())
      //   // const keys = Object.keys(regions);
      //   // if (keys.length > 1) {
      //   //   regions[keys[0]].remove();
      //   // }
      // });

      const fun = (region) => {
        if (
          !props?.playEditData &&
          region.id == "trimmer" &&
          maxTimeLine >= region.start
        ) {
          region.onDrag(2);
          console.log("REGION-updated trigger");
        }
      };
      if (!props?.playEditData) wavesurferObj.on("region-updated", fun);
      else {
        wavesurferObj.unAll();

        // once audio starts playing, set the state variable to true
        wavesurferObj.on("play", () => {
          setPlaying((prev) => "pause");
        });

        // once audio starts playing, set the state variable to false
        wavesurferObj.on("finish", () => {
          setPlaying((prev) => "play");
        });
      }
    }
  }, [wavesurferObj, props?.playEditData, maxTimeLine]);
  //setMax on timeline
  useEffect(() => {
    let tempMax = maxTimeLine;
    regions.forEach((e) => {
      if (e.id != "trimmer" && e.end > tempMax) {
        tempMax = e.end;
      }
    });
    setMaxTimeline((prev) => tempMax);

    if (parseInt(duration) - parseInt(tempMax) < 10) {
      setEndAvail((prev) => duration);
    } else {
      setEndAvail((prev) => tempMax);
    }

    console.log("REGIONS UPDATED", regions);
  }, [regions]);
  // set volume of the wavesurfer object, whenever volume variable in state is changed

  // set zoom level of the wavesurfer object, whenever the zoom variable in state is changed

  // when the duration of the audio is available, set the length of the region depending on it, so as to not exceed the total lenght of the audio
  //defaultTrimmer
  useEffect(() => {
    //console.log("wav obj",wavesurferObj==null);

    if (
      duration &&
      wavesurferObj &&
      !props.playEditData &&
      !Object.keys(wavesurferObj.regions.list).includes("trimmer")
    ) {
      // add a region with default length
      wavesurferObj.addRegion({
        start: parseInt(maxTimeLine) + 1, // time in seconds
        end: parseInt(maxTimeLine) + 10, // time in seconds
        color: "rgba(217, 217, 217, 0.2)",
        loop: true,
        id: "trimmer",
        drag: true,
      });
      console.log("DEFAULT TRIMMER CREATED");
    }
  }, [duration, wavesurferObj, maxTimeLine, props?.playEditData]);

  useEffect(() => {
    console.log(props?.playEditData);

    if (
      wavesurferObj &&
      props?.playEditData &&
      props.playEditData.mode == "edit"
    ) {
      wavesurferObj.regions.list["trimmer"].remove();

      wavesurferObj.addRegion({
        start: parseInt(props.playEditData.data.start), // time in seconds
        end: parseInt(props.playEditData.data.end), // time in seconds
        color: "rgba(217, 217, 217, 0.2)",
        loop: true,
        id: "trimmer",
        drag: true,

        // color of the selected region, light hue of purple
      });
      wavesurferObj.pause();
    }

    if (
      wavesurferObj &&
      props?.playEditData &&
      props.playEditData.mode == "play"
    ) {
      wavesurferObj.regions.list["trimmer"].remove();
      wavesurferObj.addRegion({
        start: parseInt(props.playEditData.data.start), // time in seconds
        end: parseInt(props.playEditData.data.end), // time in seconds
        color: "rgba(217, 217, 217, 0.2)",
        loop: true,
        id: "trimmer",
        drag: false,

        // color of the selected region, light hue of purple
      });
      wavesurferObj.play(parseInt(props.playEditData.data.start));
    }
    if (
      wavesurferObj &&
      !props?.playEditData &&
      Object.keys(wavesurferObj.regions.list).includes("trimmer")
    ) {
      wavesurferObj.pause();
      wavesurferObj.regions.list["trimmer"].remove();
      wavesurferObj.addRegion({
        start: maxTimeLine, // time in seconds
        end: parseInt(maxTimeLine) + 10, // time in seconds
        color: "rgba(217, 217, 217, 0.2)",
        loop: true,
        id: "trimmer",
        drag: true,

        // color of the selected region, light hue of purple
      });
    }
  }, [props?.playEditData, wavesurferObj]);
  //responsive
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.zoom(zoom);
  }, [zoom, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      setTimeout(() => {
        wavesurferObj.zoom(zoom);
      }, 200);
    }
  }, [props.zoomDependency, wavesurferObj]);
  //edit mode handle trimmer
  //empty

  //getting conversation
  const conversationList = useSelector(
    (store) => store?.conversationLandingState?.conversationList?.results
  );
  const messageListData = useSelector((store) => store.messageListState);
  // handle trim
  const handleTrim = (e) => {
    if (wavesurferObj) {
      //get start and end points of the selected region
      //const region =
      //wavesurferObj.regions.list[Object.keys(wavesurferObj.regions.list)[0]];
      const region = wavesurferObj.regions.list["trimmer"];
      //region.update({start:10,end:60,id:});

      if (region && props?.playEditData && props?.playEditData.mode == "edit") {
        const start = region.start;
        const end = region.end;
        const id = !toggle ? "customer" + Math.random() : "bot" + Math.random();
        let regionf = regions;
        console.log(regionf);
        regionf = regionf.filter((e) => {
          let x =
            (e.start > start && e.start < end) ||
            (e.end > start && e.end < end);
          return e.id != "trimmer" && !x ? true : false;
        });
        regionf = [...regionf, { id: id, start: start, end: end, drag: false }];
        setRegions((prev) => regionf);
        wavesurferObj.clearRegions();
        regionf.forEach((e) => {
          if (e.id !== "trimmer") wavesurferObj.addRegion(e);
        });
        wavesurferObj.addRegion({
          id: "trimmer",
          start: end,
          end: duration - end > 10 ? end + 10 : duration,
          loop: true,
          drag: true,
        });
      } else if (region) {
        const start = region.start;
        const end = region.end;
        // post api chunk

        if (end - start > 0.4) {
          const lang = multiLL.find((e) => {
            if (e.type == "Language") {
              return true;
            }
          });

          postChunkingTime(
            {
              conversationId: messageListData.conversationId,
              sessionId: conversationList?.[0].sessionId,
              recordingFileUrl: props?.url,
              language: lang?.value ? lang.value : "Hindi",
              startTime: region.start,
              endTime: region.end,
              speaker: toggle ? "User" : "Bot",
            },

            dispatch
          );

          //modify ui
          const id = !toggle
            ? "customer" + Math.random()
            : "bot" + Math.random();
          let regionf = regions;
          regionf = regionf.filter((e) => {
            return e.id != "trimmer" ? true : false;
          });

          regionf = [
            ...regionf,
            { id: id, start: start, end: end, drag: false },
          ];
          setRegions((prev) => regionf);

          wavesurferObj.clearRegions();

          regionf.forEach((e) => {
            if (e.id !== "trimmer") wavesurferObj.addRegion(e);
          });
          wavesurferObj.addRegion({
            id: "trimmer",
            start: end,
            end: duration - end > 10 ? end + 10 : duration,
            loop: true,
            drag: true,
          });
        }
      }
      // if (region) {
      //   const start = region.start;
      //   const end = region.end;

      //   // obtain the original array of the audio
      //   const original_buffer = wavesurferObj.backend.buffer;

      //   // create a temporary new buffer array with the same length, sample rate and no of channels as the original audio
      //   const new_buffer = wavesurferObj.backend.ac.createBuffer(
      //     original_buffer.numberOfChannels,
      //     original_buffer.length,
      //     original_buffer.sampleRate
      //   );

      //   // create 2 indices:
      //   // left & right to the part to be trimmed
      //   const first_list_index = start * original_buffer.sampleRate;
      //   const second_list_index = end * original_buffer.sampleRate;
      //   const second_list_mem_alloc =
      //     original_buffer.length - end * original_buffer.sampleRate;

      //   // create a new array upto the region to be trimmed
      //   const new_list = new Float32Array(parseInt(first_list_index));

      //   // create a new array of region after the trimmed region
      //   const second_list = new Float32Array(parseInt(second_list_mem_alloc));

      //   // create an array to combine the 2 parts
      //   const combined = new Float32Array(original_buffer.length);

      //   // 2 channels: 1-right, 0-left
      //   // copy the buffer values for the 2 regions from the original buffer

      //   // for the region to the left of the trimmed section
      //   original_buffer.copyFromChannel(new_list, 1);
      //   original_buffer.copyFromChannel(new_list, 0);

      //   // for the region to the right of the trimmed section
      //   original_buffer.copyFromChannel(second_list, 1, second_list_index);
      //   original_buffer.copyFromChannel(second_list, 0, second_list_index);

      //   // create the combined buffer for the trimmed audio
      //   combined.set(new_list);
      //   combined.set(second_list, first_list_index);

      //   // copy the combined array to the new_buffer
      //   new_buffer.copyToChannel(combined, 1);
      //   new_buffer.copyToChannel(combined, 0);

      //   // load the new_buffer, to restart the wavesurfer's waveform display
      //   wavesurferObj.loadDecodedBuffer(new_buffer);
      // }
    }
  };

  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    if (playing === "inactive") {
      setPlaying((prev) => "pause");
    } else if (playing === "pause") {
      setPlaying((prev) => "play");
    } else if (playing === "play") {
      setPlaying((prev) => "pause");
    }
  };

  const handleReload = (e) => {
    // stop will return the audio to 0s, then play it again
    wavesurferObj.stop();
    wavesurferObj.play();
    setPlaying((prev) => "pause"); // to toggle the play/pause button icon
  };

  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  function updateRegions() {
    let Allregions = document.querySelectorAll("region");

    for (let region of Allregions) {
      // console.log(region);

      region.onmousemove = function (e) {
        //console.log(this.attributes["data-id"].value);
        // document.getElementById("customspantextforhover12").style.display ="block";
        const span = document.getElementById("customspantextforhover12");
        span.style.display = "block";

        //console.log(this.attributes)

        // console.log(this.getBoundingClientRect())

        if (this.attributes["data-id"].value.includes("bot")) {
          span.innerText = "AI-Agent";
        } else if (this.attributes["data-id"].value.includes("customer")) {
          span.innerText = "Customer";
        } else {
          span.style.display = "none";
        }
        //span.innerText = this.attributes["data-id"].value.includes("bot")?"AI-Agent":"Customer";
        console.log(this.getBoundingClientRect().y);
        span.style.top = `${this.getBoundingClientRect().top + 38}px`;

        span.style.left = `${
          this.getBoundingClientRect().left +
          this.getBoundingClientRect().width / 2 -
          span.clientWidth / 2
        }px`;
      };

      region.onmouseleave = function () {
        document.getElementById("customspantextforhover12").innerText = "";
        document.getElementById("customspantextforhover12").style.display =
          "none";
      };
      //console.log("UPDATED CURSOR")
    }
  }

  const handleSpeedSlider = (e) => {
    setSpeed(e.target.value);
  };
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
  let projectFilterData = [];
  projectFilterData = [
    {
      name: "Language",
      options: ["HINDI", "English", "MALAYALAM", "TAMIL", "TELUGU"],
    },
    { name: "Sentiment", options: ["POSITIVE", "NEGATIVE"] },
    { name: "Emotion", options: ["Angry", "Laugh"] },
  ];
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
    Object.keys(ssData)?.length > 0 &&
      setMultiLL((prev) => {
        return [...multiLL, ssData];
      });
  }, [ssData]);

  useEffect(() => {
    console.log("MULLL", multiLL);
  }, [multiLL]);

  return (
    <section className="waveform-container">
      <span id="customspantextforhover12"></span>
      <div className="waveform-wrapperx">
        <div ref={wavesurferRef} id="waveform" />
      </div>
      <div className="timelinewapper">
        {" "}
        <div ref={timelineRef} id="wave-timeline" />
      </div>
      <div className="all-controls">
        <div className="left-container">
          <div className="centerthetoogle">
            <ToggleSwitch
              id="aiOrCust"
              checked={toggle}
              optionLabels={["Customer", "AI Agent"]}
              small={false}
              onChange={(checked) => setToggle(checked)}
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
                style={{ cursor: "pointer" }}
                onClick={handleTrim}
                src={greyScissor}
                alt="trim"
              />
              <div>
                <img
                  style={{ cursor: "pointer" }}
                  src={greyTag}
                  onClick={() => {
                    setShowTags((prev) => true);
                  }}
                  alt="tags"
                />
                {showTags && (
                  <>
                    <div id="dsii2302-sdwee28zn"></div>

                    <div className="positioner-divdis834hdio">
                      {!showCustomTag && (
                        <>
                          <MultiSelectSimple
                            options={multiselectoptions}
                            setDataOut={setSelectedMultiSelect}
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
                )}
              </div>
              <img style={{ cursor: "pointer" }} src={greyVertical} alt="|" />
              <img
                style={{ cursor: "pointer" }}
                src={
                  playing === "pause"
                    ? bluePause
                    : playing === "play"
                    ? bluePlay
                    : greyPlay
                }
                onClick={handlePlayPause}
                alt="playpause"
              />
              <img
                style={{ cursor: "pointer" }}
                src={greyReplay}
                onClick={handleReload}
                onMouseOver={(e) => e.target.setAttribute("src", blueReplay)}
                onMouseOut={(e) => e.target.setAttribute("src", greyReplay)}
                alt="replay"
              />
              <img style={{ cursor: "pointer" }} src={greyVertical} alt="|" />
              <img
                style={{ cursor: "pointer" }}
                src={sliderType === "volume" ? blueVolume : greyVolume}
                onClick={handleVolumeBtn}
                alt="volume"
              />
              <img
                style={{ cursor: "pointer" }}
                src={sliderType === "speed" ? blueSpeed : greySpeed}
                onClick={handleSpeedBtn}
                alt="speed"
              />
              <img
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
                      value={zoom}
                      onChange={handleZoomSlider}
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
                      value={volume}
                      onChange={handleVolumeSlider}
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
                    <span>-1X</span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.25"
                      value={speed}
                      onChange={handleSpeedSlider}
                      className="slider volume-slider"
                    />
                    <span>1X</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioWaveform;
