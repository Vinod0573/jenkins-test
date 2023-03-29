import { useState, useEffect } from "react";

function useAudioPlayer(onStop, onLoad) {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const [playBack, setPlayBack] = useState(1);
  const [volume, setVolume] = useState(1);
  // const [showSpeed]

  let audio;
  function playAtTime(e) {
    const audio = document.getElementById("audio");
    if (audio) {
      const isPlaying = playing;
      setPlaying(false);
      audio.currentTime = e;
      setClickedTime(e);
      setPlaying(isPlaying);
    }
  }
  function replay() {
    const audio = document.getElementById("audio");
    if (audio) {
      audio.currentTime = 0;
      setPlaying(true);
    }
  }
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);
  useEffect(() => {
    if (audio) {
      audio.playBackRate = playBack;
    }
  }, [playBack]);
  const setAudioData = (e) => {
    if (audio.currentTime <= 0) {
      setCurTime(0);
      return;
    }
    setCurTime(audio.currentTime);
    //console.log(e, "nithin audio");
  };
  const durationChange = () => {
    setDuration(audio.duration);

    //  console.log("duration", audio.duration);
  };
  function load() {
    audio = document.getElementById("audio");
    // DOM listeners: update React state on DOM events
    audio.load();
    if (onLoad) {
      onLoad();
    }
  }
  function endedPlaying() {
    setPlaying(false);
    setCurTime(0);
    onStop();
  }

  const setAudioTime = () => {
    setCurTime(audio.currentTime);

    // console.log("insideDuration", audio.duration);
  };
  useEffect(() => {
    // state setters wrappers
    audio = document.getElementById("audio");

    // DOM listeners: update React state on DOM events
    //audio.load();
    audio.addEventListener("durationchange", durationChange);
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", endedPlaying);
    //console.log(audio);
    // React state listeners: update DOM on React state changes
    audio.volume = volume;
    audio.playbackRate = playBack;
    playing
      ? audio.play().catch((e) => {
          console.error(e);
        })
      : audio.pause();
    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }
    //console.log("nithin audio loaded", audio);
    // effect cleanup
    return () => {
      if (audio) {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
        audio.removeEventListener("durationchange", durationChange);
        audio.removeEventListener("ended", endedPlaying);
      }
    };
  });

  return {
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
  };
}

export default useAudioPlayer;
