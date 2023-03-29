import React, { useEffect, useImperativeHandle, useRef } from "react";

import { props, ref } from "./types";
import styles from "./AudioPlayer.module.scss";
import useAudioPlayer from "./useAudioPlayer/useAudioPlayer";
import pause from "./pause.svg";
import playIcon from "./playIcon.svg";
import speakerIcon from "./speakerIcon.svg";
import speedIcon from "./speedIcon.svg";

import Bar from "./subComponents/Bar";
// import PravidIcons from "../pravidIcons/PravidIcons";
import { useState } from "react";
const AudioPlayer = React.forwardRef(
  (props: props, ref: React.ForwardedRef<ref>) => {
    const {
      curTime,
      setCurTime,
      duration,
      playing,
      load,
      setPlaying,
      volume,
      playBack,
      setClickedTime,
      setPlayBack,
      setVolume,
      replay,
      playAtTime,
      setDuration,
    } = useAudioPlayer(props.onStop, props.onLoad);
    // console.log({ curTime, duration, playing });
    const [display, setDisplay] = useState<{
      volume: boolean;
      playback: boolean;
    }>({
      volume: false,
      playback: false,
    });

    const volumeCover = useRef() as React.MutableRefObject<HTMLInputElement>;
    const playBackCover = useRef() as React.MutableRefObject<HTMLInputElement>;
    // useEffect(() => {});
    function playAudio() {
      setPlaying(!playing);
    }
    function timeFormater(t: number | undefined) {
      if (t === undefined) {
        return "0:0";
      }
      const min = Math.floor(t / 60);
      const sec = Math.floor(t % 60);
      return `${min}:${sec}`;
    }
    function play() {
      setPlaying(true);
    }
    // function replay() {
    //   setPlaying(false);
    //   setCurTime(0);
    //   //setPlaying(true);
    // }
    useImperativeHandle(ref, () => ({
      playPause: playAudio,
      play: play,
      isPlaying: playing,
      replay: replay,
      pause: () => {
        setPlaying(false);
      },
      setDuration: (e: any) => {
        setDuration(e);
      },
      stop: () => {
        setDuration(0);
        setCurTime(0);
        setPlaying(false);
      },
      setCurrentTime:(e:number)=>{playAtTime(e)}
    }));
    useEffect(() => {
      load();
      if (props?.autoPlay) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }, [props.url, props?.autoPlay]);
    function closeAudioThings(e: any) {
      if (volumeCover.current) {
        if (!volumeCover.current.contains(e.target)) {
          setDisplay((prev) => {
            return { ...prev, volume: false };
          });
        }
      }
      if (playBackCover.current) {
        if (!playBackCover.current.contains(e.target)) {
          setDisplay((prev) => {
            return { ...prev, playback: false };
          });
        }
      }
    }
    useEffect(() => {
      document.addEventListener("click", closeAudioThings);
      return () => {
        document.removeEventListener("click", closeAudioThings);
      };
    }, []);
    return (
      <>
        {/* <audio
          src={props.url}
          preload="auto"
          style={{ display: "none" }}
        ></audio> */}
        <audio preload="auto" id="audio">
          <source src={props.url} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div className={styles.wrapper}>
          <span className={styles.playPause}>
            <img
              src={playing ? pause:playIcon}
              onClick={playAudio}
              alt='play'
            />
          </span>
          <span className={styles.time}>
            {" "}
            {`${timeFormater(curTime)}/${timeFormater(duration)}`}
          </span>
          <div className={styles.bar}>
            <Bar
              duration={duration}
              curTime={curTime}
              onTimeUpdate={(e: any) => {
                console.log(e, "bar");
                playAtTime(e);
              }}
            ></Bar>
          </div>
          <div  >
          <span className={styles.speaker} ref={volumeCover}>
            {/* <img
              src={speakerIcon}
              alt="sound"
              onClick={(e) => {
                e.stopPropagation();
                setDisplay((state) => {
                  return { playback: false, volume: !state.volume };
                });
              }}
            /> */}

            <img
              src={speakerIcon}
              onClick={() => {
                setDisplay((state) => {
                  return { playback: false, volume: !state.volume };
                });
              }}
              alt='un'
            ></img>
            {display.volume && (
              <>
                <span className={styles.volumeCover}>
                  <span
                    className={styles.changeVolume}
                    onClick={() => {
                      setVolume((prev) => {
                        return prev - 0.1 < 0 ? 0 : prev - 0.1;
                      });
                    }}
                  >
                    -
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    value={volume}
                    step={0.1}
                    className={styles.slider}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                    }}
                  ></input>
                  <span
                    className={styles.changeVolume}
                    onClick={() => {
                      setVolume((prev) => {
                        return prev + 0.1 > 1 ? 1 : prev + 0.1;
                      });
                    }}
                  >
                    +
                  </span>
                </span>
              </>
            )}
          </span>
          <span className={styles.speed} ref={playBackCover}>
            {/* <img
              src={speedIcon}
              alt="playBack"
              onClick={(e) => {
                e.stopPropagation();
                setDisplay((state) => {
                  return { volume: false, playback: !state.playback };
                });
              }}
            /> */}
            <img
            src={speedIcon}
              onClick={() => {
                setDisplay((state) => {
                  return { volume: false, playback: !state.playback };
                });
              }}
              alt='paly'
            />
            {display.playback && (
              <>
                <span className={styles.playbackrate}>
                  <span
                    data-selected={playBack === 0.5}
                    onClick={() => {
                      setPlayBack(0.5);
                    }}
                  >
                    0.5x
                  </span>
                  <span
                    data-selected={playBack === 0.75}
                    onClick={() => {
                      setPlayBack(0.75);
                    }}
                  >
                    0.75x
                  </span>
                  <span
                    data-selected={playBack === 1}
                    onClick={() => {
                      setPlayBack(1);
                    }}
                  >
                    1x
                  </span>
                  <span
                    data-selected={playBack === 1.25}
                    onClick={() => {
                      setPlayBack(1.25);
                    }}
                  >
                    1.25x
                  </span>
                  <span
                    data-selected={playBack === 1.5}
                    onClick={() => {
                      setPlayBack(1.5);
                    }}
                  >
                    1.5x
                  </span>
                </span>
              </>
            )}
          </span>
          </div>
        </div>
      </>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
