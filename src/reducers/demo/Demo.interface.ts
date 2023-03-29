export type pageState = "UPLOAD" | "DEMO_ANNOTATE";
export interface DemoState {
  /**
   * convert this to blob url
   */
  audioFile: string;
  asrResponse: {
    data: undefined | any;
    isLoading: boolean;
    error: any;
  };
  /**
   * the current page is weather UPLOAD or Annotation
   */
  state: pageState;
}
