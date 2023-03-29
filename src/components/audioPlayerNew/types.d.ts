export interface props {
  url: string;
  autoPlay?: boolean;
  onStop?: CallableFunction;
  onLoad?: CallableFunction;
}
export interface ref {
  playPause: () => void;
  replay: () => void;
}
