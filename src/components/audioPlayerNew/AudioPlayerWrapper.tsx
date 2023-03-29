import React, { useEffect, useState, useRef, useImperativeHandle } from "react";

import AudioPlayer from "./AudioPlayer";
import Loader from "../loader/Loader";
const AudioPlayerWrapper = React.forwardRef(
  (props: any, ref: React.ForwardedRef<any>) => {
    // reducer will be used
    // const url =
    //   "https://saarthistorage.blob.core.windows.net/saarthicalls/3244e66348af0c5961a129412dcc169s.mp3";

    const [url, setUrl] = useState("");
    const [ready, setReady] = useState(false);
    const innerRef = useRef<any>();
    async function loadBlob(url: any) {
      setReady(false);
      if (url) {
        const blob = await fetch(url).then((r: any) => {
          if (r?.status === 200) {
            return r.blob();
          }
          return undefined;
        });
        if (blob) {
          const objUrl = URL.createObjectURL(blob);
          setUrl(objUrl);
        } else {
          setUrl("");
        }
        //console.log({ blob });
      } else {
        setUrl("");
      }
      setReady(true);
      if (props.autoPlay) {
        if (innerRef.current) {
          innerRef.current?.play();
        }
      }
    }
    useImperativeHandle(ref, () => ({
      playPause: (e: any) => {
        if (innerRef.current) {
          innerRef.current.playPause();
        }
      },
      play: (e: any) => {
        if (innerRef.current) {
          innerRef.current.play();
        }
      },
      isPlaying: innerRef.current?.isPlaying,
      replay: (e: any) => {
        if (innerRef.current) {
          innerRef.current.replay();
        }
      },
      pause: (e: any) => {
        if (innerRef.current) {
          innerRef.current.pause();
        }
      },
      stop: (e: any) => {
        if (innerRef.current) {
          innerRef.current.stop();
        }
      },
      setCurrentTime: (e: number) => {
        if (innerRef.current) {
          innerRef.current.setCurrentTime(e);
        }
      },
    }));
    useEffect(() => {
      //console.log(url2, "nithin");
      if (props.url && props.url !== "") {
        loadBlob(props.url);
      } else {
        loadBlob("");

        innerRef.current?.stop();
      }
      if (innerRef.current) {
        innerRef.current.pause();
      }
    }, [props.url, props?.autoPlay]);
    return ready === true ? (
      <AudioPlayer
        ref={innerRef}
        url={url}
        autoPlay={props?.autoPlay}
        onStop={props.onStop}
        onLoad={props.onLoad}
      />
    ) : (
      <AudioPlayer url="" ref={innerRef} />
    );
  }
);
AudioPlayerWrapper.displayName = "AudioPlayer";
export default AudioPlayerWrapper;
