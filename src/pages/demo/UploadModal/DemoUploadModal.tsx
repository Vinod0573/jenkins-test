import { FileUploader } from "react-drag-drop-files";
// import UploadAudio from "../../../components/audioPlayerWave/components/UploadAudio";
import { uploadingGIF } from "../../../assets/Lodder";
// import uploadIcon from "../../../assets/projectPageIcon/UploadIcon.svg";
import styles from "./DemoUploadModal.module.scss";
import CrossIcon from "../../../assets/summarysection/CrossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheChunking,
  // setDemoLocalAudioUrl,
  // setDemoPageState,
} from "../../../reducers/demo/Demo.action";
import { DemoState } from "../../../reducers/demo/Demo.interface";
import { useHistory } from "react-router-dom";
import lang_id from "./lang.config";
import { option } from "yargs";
import { useState } from "react";
import SingleSelectDD from "../../../components/singleselectdd/SingleSelectDD";
export default function DemoUpladModal() {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState<string>("hi");
  const history = useHistory();
  const loadingData: DemoState = useSelector((state: any) => state.demoReducer);
  function handleChange(file: File[]) {
    if (file[0]?.name?.length > 0) {
      // console.log(file);
      dispatch(getTheChunking(file[0], language)); // call the api
      /**
       * comment after the api works
       */
      // const url = URL.createObjectURL(file[0]); //
      // dispatch(setDemoLocalAudioUrl(url));
      // dispatch(setDemoPageState("DEMO_ANNOTATE")); // move the page
    }
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.crossIcon}
        src={CrossIcon}
        alt="cross icon"
        onClick={() => {
          history.push("/");
        }}
      />
      {loadingData.asrResponse.isLoading ? (
        <div className={styles.imgWrapper}>
          <img src={uploadingGIF} alt="loading"></img>
        </div>
      ) : (
        <div className={styles.dragAndDropWrapper}>
          <span>Select the language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(lang_id).map((e) => {
              return <option value={lang_id[e]}> {e}</option>;
            })}
          </select>
          {/* <SingleSelectDD
            options={Object.keys(lang_id).map((e) => e)}
            defaultSelected={language}
          /> */}
          <FileUploader
            multiple={true}
            handleChange={(file: any) => handleChange(file)}
            name="file"
            types={["MP3"]}
            // children={<CustomDropArea/>}
          >
            <div className={styles.dragAndDrop}>
              <h2> Drag your audio file here </h2>
              <p>---------OR---------</p>
              <button className={styles.button}>Browse audio</button>
            </div>
          </FileUploader>
          {/* <img src={uploadingGIF} alt="uploding"></img> */}

          {/* <p>filename</p> */}
        </div>
      )}
    </div>
  );
}
