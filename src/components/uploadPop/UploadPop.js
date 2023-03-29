import React, { useEffect, useState, useRef } from "react";
import DndOrBrowse from "../dndOrBrowse/DndOrBrowse";
import DndProgress from "../dndProgress/DndProgress";
import MetaInfo from "../metaInfo/MetaInfo";
import UploadHistory from "../uploadHistory/UploadHIstory";
import PasteUrl from "../pasteUrl/PasteUrl";
import Warn from "../warn/Warn";
import "./UploadPop.css";
import SingleSelectDD from "../singleselectdd/SingleSelectDD";
import { useDispatch, useSelector } from "react-redux";
import {
  setAgentDetails,
  setUploadedFiles,
} from "../../actions/PopupUploadFileAction";
import { setIsUploadModal } from "../../actions/AssignProject";
import cross from "../../assets/projectPageIcon/cross.svg";
import UploadedHistoryModal from "./UploadedHistoryModal";
import useOnClickOutside from "../../utilities/useOnClickOutside";

export default function UploadPop(props) {
  const selectedFileDetails = useSelector((store) => {
    return store.popUpState;
  });

  const [isUploadedDetails, setIsUploadedDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [humanAgentDetails, setHumanAgentDetails] = useState({
    url: "",
    uploadedFiles: "",
    type: "",
    isTypeAudioDetails: {
      language: [],
      level: "",
      format: "",
    },
    isUploadedFiles: false,
  });

  const [uploadDetails, setUploadDetails] = useState({
    name: "",
    percent: "",
  });

  const dispatch = useDispatch();
  let interval = undefined;
  useEffect(() => {
    if (props.projectDetails) {
      let data =
        props.projectDetails.uploadedFiles &&
        props.projectDetails.uploadedFiles[0]
          ? props.projectDetails.uploadedFiles[0]
          : "";
      setHumanAgentDetails((prev) => {
        return {
          ...prev,

          url: "",
          uploadedFiles: "",
          type: data?.type,
          isTypeAudioDetails: {
            language: data?.language,
            level: data?.level,
            format: data?.format,
          },
          isUploadedFiles: true,
        };
      });
    }
  }, [props.projectDetails]);

  const handleUploadDetails = (name, data) => {
    setUploadDetails((prev) => {
      return {
        ...prev,
        [name]: data,
      };
    });
  };

  const handleChange = (name, data, isValue) => {
    if (isValue) {
      setHumanAgentDetails((prev) => {
        return {
          ...prev,
          [name]: { ...humanAgentDetails.isTypeAudioDetails, [isValue]: data },
        };
      });
    } else {
      setHumanAgentDetails((prev) => {
        return {
          ...prev,
          [name]: data,
        };
      });
    }
  };

  const uploadedDetails = useSelector((store) => {
    return store.popUpState.uploadedDetails;
  });

  const agentDetails = useSelector((store) => {
    return store.popUpState.agentDetails;
  });

  const isUploadModalVisisble = useSelector(
    (store) => store.assignProjectDataState.isUpload
  );

  useEffect(() => {
    setUploadDetails((prev) => uploadedDetails);
  }, [uploadedDetails]);

  useEffect(() => {
    if (agentDetails?.isUploadedFiles) {
      setHumanAgentDetails((prev) => agentDetails);
    }
  }, [agentDetails]);

  // useEffect(()=>{
  //   setIsOpen(prev=>isUploadModalVisisble)
  // },[isUploadModalVisisble])

  const closeModal = () => {
    setIsUploadModal(false, dispatch);
  };

  console.log(props.projectDetails, "112");

  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      closeModal();
    } else {
      setIsUploadModal(true, dispatch);
    }
  }, [isOpen]);

  useOnClickOutside(ref, () => setIsOpen(true));
  console.log(props.projectDetails);

  return (
    <div className="upload-pop-cont" ref={ref}>
      <div
        className="closeIcon"
        onClick={() => {
          closeModal();
        }}
      >
        <img src={cross} />
      </div>
      <div className="upload-cont-inner">
        <DndOrBrowse
          fileName={(name) => {
            handleUploadDetails("name", name);
          }}
          file={(file, mode) => {
            handleChange(mode, file);
          }}
          percentValue={(percent) => {
            handleUploadDetails("percent", percent);
            // setRunning(false);
            // setProgress(0);
          }}
          uploadedDetails={uploadDetails}
          agentDetails={humanAgentDetails}
          isEditClicked={props.editClicked}
        />
        <p className="orinupload">or</p>
        <PasteUrl
          uploadedURL={(file, mode) => {
            handleChange(mode, file);
          }}
          uploadedDetails={uploadDetails}
          agentDetails={humanAgentDetails}
        />
        {uploadDetails?.name && (
          <DndProgress
            progress={uploadDetails?.percent + "%"}
            filename={
              uploadDetails?.name && uploadDetails.name?.length > 36
                ? uploadDetails.name.substr(0, 36) + "..."
                : uploadDetails?.name
            }
            clearData={() => {
              handleUploadDetails("name", "");
            }}
            detail={uploadDetails?.percent == 100 ? "Uploaded" : "Uploading"}
            uploadedDetails={uploadDetails}
            agentDetails={humanAgentDetails}
          />
        )}

        {props.projectDetails?.uploadedFiles?.length > 0 && (
          <div
            className="blue-upload-btn-dat"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              setIsUploadedDetails((prev) => true);
            }}
          >
            <p className="blue-upload-btn-text-dat">Upload History</p>
          </div>
        )}

        {/* <UploadHistory
          UploadHistoryData={[{ fileName: "Djfhjd.zip", date: "12th Jly" }]}
        /> */}
        {/* <SingleSelectDD options={["MP3","Aud","RAW","CSV"]} /> */}
        <MetaInfo
          typedata={(data) => {
            handleChange("type", data);
          }}
          selectedLanguages={(data) => {
            handleChange("isTypeAudioDetails", data, "language");
          }}
          selectedLevel={(data) => {
            handleChange("isTypeAudioDetails", data, "level");
          }}
          selectedFormat={(data) => {
            handleChange("isTypeAudioDetails", data, "format");
          }}
          isUploadPossible={(data) => {
            handleChange("isUploadedFiles", true);
            setAgentDetails(dispatch, {
              ...humanAgentDetails,
              isUploadedFiles: true,
            });
            setUploadedFiles(dispatch, uploadDetails);
          }}
          uploadedDetails={uploadDetails}
          agentDetails={humanAgentDetails}
          isEditClicked={props.editClicked}
        />

        {/* <Warn /> */}
      </div>
      {isUploadedDetails && (
        <UploadedHistoryModal
          closeModal={() => {
            setIsUploadedDetails((prev) => false);
          }}
          uploadedFiles={props.uploadedFilesData}
        />
      )}
    </div>
  );
}