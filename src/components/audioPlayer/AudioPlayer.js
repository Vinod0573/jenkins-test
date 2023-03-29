import React,{useEffect,useState} from 'react'
import "./AudioPlayer.css";
// import ReactPlayer from 'react-player'
import ReactPlayer from "react-audio-player";

function AudioPlayer(props) {
    const [volume,setVolume]=useState(true)
    const [playing,setPlaying]=useState(false)
    const [controls,setControls]=useState(true)
  


    const startPlaying=()=>{
        let temp=playing
        setPlaying(!temp)
        props.getPlaying(true)
    }
    const pauseAudio =() => {
        props.getPlaying(false)
    }
    const onSeek=()=>{
        setPlaying(true)
    }
    const onratechange=()=>{

    }

    // for sending status of audio --play or --pause
    // useEffect(
    //     () => {
    //      props.getPlaying(playing)
    //     },[playing]
    // )
 
//      handleDuration = (duration) => {
//     console.log('onDuration', duration)
//     this.setState({ duration })
//   }
     
    return (
        props.selectedAudioUrl?.length>0 &&
        // Only loads the YouTube player
        <ReactPlayer 
        //  ref = {props.refs}
        // url={props.selectedAudioUrl} 
        // volume={volume}
        // playing={props.outsidePlay}
        // controls={controls}
        // onPlay={startPlaying}
        // onPause={startPlaying}
        // onSeek={onSeek}
        // onPlaybackRateChange={onratechange}
        // onDuration={setD}
                ref={props.refs}
                src={props.selectedAudioUrl}
                 preload="metadata"
                  type="audio/mpeg"
                  controls
                  autoPlay
                  onPause={pauseAudio}
                  onPlay={startPlaying}
                 
        />
    )
}

export default AudioPlayer
