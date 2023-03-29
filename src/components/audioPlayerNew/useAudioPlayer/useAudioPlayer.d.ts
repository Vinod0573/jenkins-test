export default useAudioPlayer;
declare function useAudioPlayer(props,any): {
  curTime: number;
  setCurTime: import("react").Dispatch<import("react").SetStateAction<number>>;
  duration: undefined;
  playing: boolean;
  load: () => void;
  setPlaying: import("react").Dispatch<import("react").SetStateAction<boolean>>;
  volume: number;
  playBack: number;
  setClickedTime: import("react").Dispatch<
    import("react").SetStateAction<undefined>
  >;
  setPlayBack: import("react").Dispatch<import("react").SetStateAction<number>>;
  setVolume: import("react").Dispatch<import("react").SetStateAction<number>>;
  replay;
  playAtTime;
  setDuration;
};
