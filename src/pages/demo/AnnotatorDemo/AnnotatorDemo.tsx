import { useSelector } from "react-redux";
import { DemoState } from "../../../reducers/demo/Demo.interface";
import { useEffect, useRef, useState } from "react";
import WaveKiller from "../../../components/audioPlayerWave/waveNew/WaveKiller.library";
import "./AnnotatorDemo.css";
import PlayerController from "./components/player/PlayerController";
import ConversationCard from "./components/conversation/generic/ConversationCard";
import ConversationCardWrapper from "./components/conversation/ConversationCardWrapper";
import MessageCardDemo from "./components/messageCardDemo/MessageCardDemo";
interface region {
  id: string;
  start: number;
  end: number;
  speaker: "customer" | "bot";
  message: string;
}
export default function AnnotatorDemo() {
  const state: DemoState = useSelector((state: any) => state.demoReducer);
  const [wavesurferObj, setWavesurferObj] = useState<WaveKiller | undefined>();
  const wavesurferRef = useRef(null);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerValues, SetPlayerValues] = useState({
    zoom: 0,
    volume: 1,
    speed: 1,
  });

  //temp
  const [regions, setRegions] = useState<region[]>([
    {
      id: "dfsss",
      start: 1,
      end: 10,
      speaker: "bot",
      message:
        "Hello, I'm calling from ShriRam Housing Finance. Your accountis due with Rs. 2022. When can you make the payment?",
    },
    {
      id: "dss",
      start: 12,
      end: 20,
      speaker: "customer",
      message: "I'll be able to make the payment at this evening",
    },
    {
      id: "dfsss",
      start: 22,
      end: 30,
      speaker: "bot",
      message:
        " That's good to know, I’m sending you a payment link on SMS for Rs. 2022, please make the payment by clicking on the link",
    },
  ]);
  useEffect(() => {
    if (state.asrResponse.data) {
      const region_temp: region[] = [];
      const bot: region[] = state.asrResponse.data?.bot_trascripts.map(
        (e: any[], index: number) => {
          return {
            id: "tempb" + index,
            message: e[0],
            start: e[1],
            end: e[2],
            speaker: "bot",
          };
        }
      );
      const customer: region[] =
        state.asrResponse.data?.customer_trascripts.map(
          (e: any[], index: number) => {
            return {
              id: "tempcus" + index,
              message: e[0],

              start: e[1],
              end: e[2],
              speaker: "customer",
            };
          }
        );
      // console.log(bot, customer, state.asrResponse, "nithin");
      setRegions(
        [...bot, ...customer].sort((e, k) => {
          return e.start - k.start;
        })
      );
    } else {
      setRegions([]);
    }
  }, [state.asrResponse.data]);
  useEffect(() => {
    // console.log("nithin", regions);
  }, [regions]);
  const playerEvents = {
    play: () => {
      if (wavesurferObj) {
        wavesurferObj.play();
      }
    },
    pause: () => {
      if (wavesurferObj) {
        wavesurferObj.pause();
      }
    },
    stop: () => {
      if (wavesurferObj) {
        wavesurferObj.stop();
      }
    },
    replay: () => {
      if (wavesurferObj) {
        wavesurferObj.stop();
        wavesurferObj.play();
      }
    },
  };
  // audio events
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.setVolume(playerValues.volume);
      wavesurferObj.speed(playerValues.speed);
      wavesurferObj.zoom(playerValues.zoom);
    }
  }, [playerValues, wavesurferObj]);
  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      let obj = new WaveKiller(
        wavesurferRef.current,
        timelineRef.current,
        1,
        2
      );
      obj.obj.on("pause", () => {
        setIsPlaying(false);
      });
      obj.obj.on("play", () => {
        setIsPlaying(true);
      });

      setWavesurferObj((e) => {
        if (e) {
          //   console.log(" wave destroyed");
          e.obj.destroy();
        }
        // console.log("wave Resetted");
        return obj;
      });
    }
  }, [wavesurferRef]);
  function clickOnSpaceButton(e: KeyboardEvent) {
    if (wavesurferRef) {
      wavesurferObj?.playPause();
    }
  }
  // useEffect(() => {
  //   const listner = document.addEventListener("keydown", (e) => {
  //     clickOnSpaceButton(e);
  //   });
  //   return () => {
  //     document.removeEventListener("keydown", clickOnSpaceButton);
  //   };
  // }, []);
  useEffect(() => {
    if (wavesurferObj) {
      if (state.audioFile) {
        wavesurferObj.load(state.audioFile);
        wavesurferObj.pause();
      }
    }
  }, [wavesurferObj, state.audioFile]);
  //destry
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.renderRegions(regions);
    }
  }, [wavesurferObj, regions]);
  useEffect(() => {
    return () => {
      wavesurferObj?.destroy();
    };
  }, [wavesurferObj]);
  return (
    <>
      <div className="waveform_demo">
        <div className="waveform-wrapper_demo">
          <div ref={wavesurferRef} id="waveform">
            <span id="tagger"></span>
          </div>
        </div>
        <div className="timelinewrapper">
          <div ref={timelineRef} id="wave-timeline"></div>
        </div>
      </div>
      <PlayerController
        play={playerEvents.play}
        pause={playerEvents.pause}
        stop={playerEvents.stop}
        isPlaying={isPlaying}
        replay={playerEvents.replay}
        volume={{
          setVolume: (e) => {
            SetPlayerValues((prev) => {
              return { ...prev, volume: e };
            });
          },
          value: playerValues.volume,
        }}
        zoom={{
          setZoom: (e) => {
            SetPlayerValues((prev) => {
              return { ...prev, zoom: e };
            });
          },
          value: playerValues.zoom,
        }}
        speed={{
          setSpeed: (e) => {
            SetPlayerValues((prev) => {
              return { ...prev, speed: e };
            });
          },
          value: playerValues.speed,
        }}
      />
      <div className="demo_conversation">
        <ConversationCardWrapper
          messages={regions.map((e) => {
            return {
              type: e.speaker == "bot" ? "left" : "right",
              component: (
                <MessageCardDemo
                  message={e.message}
                  startTime={e.start}
                  endTime={e.end}
                  type={e.speaker == "bot" ? "left" : "right"}
                ></MessageCardDemo>
              ),
            };
          })}
        ></ConversationCardWrapper>
      </div>
      {/* <div className="demo_conversation">
        <ConversationCardWrapper
          messages={[
            {
              type: "left",
              component: (
                <MessageCardDemo
                  message="Hello, I'm calling from ShriRam Housing Finance. Your account
                  is due with Rs. 2022. When can you make the payment?"
                  startTime={1}
                  endTime={2}
                  type="left"
                ></MessageCardDemo>
              ),
            },
            {
              type: "right",
              component: (
                <MessageCardDemo
                  message="I'll be able to make the payment at this evening"
                  startTime={1}
                  endTime={2}
                  type="right"
                ></MessageCardDemo>
              ),
            },
            {
              type: "left",
              component: (
                <MessageCardDemo
                  message=" That's good to know, I’m sending you a payment link on SMS for
                  Rs. 2022, please make the payment by clicking on the link"
                  startTime={1}
                  endTime={2}
                  type="left"
                ></MessageCardDemo>
              ),
            },
          ]}
        />
      </div> */}
    </>
  );
}
