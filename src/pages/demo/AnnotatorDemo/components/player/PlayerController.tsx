import bluePause from "../../../../../assets/summarysection/bluePause.svg";
import greyPause from "../../../../../assets/summarysection/greyPause.svg";
import blueReplay from "../../../../../assets/summarysection/blueReplay.svg";
import greyReplay from "../../../../../assets/summarysection/greyReplay.svg";
import bluePlay from "../../../../../assets/summarysection/bluePlay.svg";
import blueZoom from "../../../../../assets/summarysection/blueZoom.svg";
import blueVolume from "../../../../../assets/summarysection/blueVolume.svg";
import blueSpeed from "../../../../../assets/summarysection/blueSpeed.svg";
import SliderNew from "../slider/SliderNew";
import { useState } from "react";
import styles from "./PlayerController.module.scss";
import CloseOnClickOutside from "../closeOnClickOutside/CloseOnClickOutside";
interface props {
  play: CallableFunction;
  pause: CallableFunction;
  stop: CallableFunction;
  replay: CallableFunction;
  isPlaying: boolean;
  volume: { setVolume: (v: number) => void; value: number };
  zoom: { setZoom: (z: number) => void; value: number };
  speed: { setSpeed: (s: number) => void; value: number };
}
export default function PlayerController(props: props) {
  const [showSlider, setShowSlider] = useState<
    "volume" | "zoom" | "speed" | undefined
  >(undefined);

  return (
    <div className={styles.wrapper}>
      {props.isPlaying ? (
        <img
          className={styles.element}
          src={bluePause}
          alt="pauseButton"
          onClick={() => {
            props.pause();
          }}
        />
      ) : (
        <img
          className={styles.element}
          src={bluePlay}
          alt="playbutton"
          onClick={() => {
            props.play();
          }}
        ></img>
      )}
      <img
        className={styles.element}
        src={blueReplay}
        alt="replay"
        onClick={() => {
          props.replay();
        }}
      />

      <img
        className={styles.element}
        src={blueVolume}
        alt="volume"
        onClick={() => {
          if (showSlider === "volume") {
            setShowSlider(undefined);
          } else {
            setShowSlider("volume");
          }
        }}
      />
      <div className={styles.slider}>
        {showSlider === "volume" && (
          <CloseOnClickOutside
            onClose={() => {
              setShowSlider(undefined);
            }}
          >
            <div></div>
            <SliderNew
              lable={{
                left: "0",
                right: "1",
              }}
              limit={{
                min: 0,
                max: 1,
                step: 0.25,
              }}
              value={props.volume.value}
              onChange={(e) => {
                props.volume.setVolume(parseFloat(e));
              }}
            />
          </CloseOnClickOutside>
        )}
      </div>
      <img
        src={blueSpeed}
        alt="speed"
        className={styles.element}
        onClick={() => {
          if (showSlider === "speed") {
            setShowSlider(undefined);
          } else {
            setShowSlider("speed");
          }
        }}
      />
      <div className={styles.slider}>
        {showSlider === "speed" && (
          <CloseOnClickOutside
            onClose={() => {
              setShowSlider(undefined);
            }}
          >
            <SliderNew
              lable={{
                left: "0.25",
                right: "2",
              }}
              limit={{
                min: 0.25,
                max: 2,
                step: 0.25,
              }}
              value={props.speed.value}
              onChange={(e) => {
                props.speed.setSpeed(parseFloat(e));
              }}
            />
          </CloseOnClickOutside>
        )}
      </div>
      <img
        src={blueZoom}
        alt="zoom"
        className={styles.element}
        onClick={() => {
          if (showSlider === "zoom") {
            setShowSlider(undefined);
          } else {
            setShowSlider("zoom");
          }
        }}
      />
      <div className={styles.slider}>
        {showSlider === "zoom" && (
          <CloseOnClickOutside
            onClose={() => {
              setShowSlider(undefined);
            }}
          >
            <SliderNew
              lable={{
                left: "1",
                right: "500",
              }}
              limit={{
                min: 1,
                max: 500,
                step: 5,
              }}
              value={props.zoom.value}
              onChange={(e) => {
                props.zoom.setZoom(parseFloat(e));
              }}
            />
          </CloseOnClickOutside>
        )}
      </div>
    </div>
  );
}
