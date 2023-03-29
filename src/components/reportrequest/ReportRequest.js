import React, { useState, useEffect } from "react";
import { SERVER_URL, ONBOARDING_URL } from "../../utilities/ApiRoutes";
import axios from "axios";
import TitleInput from "../ui-kits/titleinput/TitleInput";
import Description from "../ui-kits/description/Description";
import UploadFileInput from "../ui-kits/uploadfile/UploadFileInput";
import ErrorMessage from "../../components/error/ErrorMessage";

import CrossIcon from "../../assets/summarysection/CrossIcon.svg";
import "./ReportRequest.css";

import SuccessfulUI from "./Successful";
import { format } from "date-fns";

const ReportRequest = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [allDataToPost, setAllDataToPost] = useState({
    title: "",
    description: "",
    accountName: "",
    file: null,
  });

  useEffect(() => {
    setAllDataToPost((prev) => allDataToPost);
  }, [allDataToPost]);

  const [isError, setIsError] = useState();

  const onChangeValue = (e, type) => {
    setIsError((prev) => null);
    // const { name, value } = e.target;
    if (type === "title") {
      const { name, value } = e.target;
      setAllDataToPost((prev) => {
        return {
          ...prev,
          title: value,
        };
      });
    } else if (type === "description") {
      const { name, value } = e.target;
      setAllDataToPost((prev) => {
        return {
          ...prev,
          description: value,
        };
      });
    } else if (type === "file") {
      const tempfile = e.target.files[0];
      setAllDataToPost((prev) => {
        return {
          ...prev,
          file: tempfile,
        };
      });
    }
  };

  // To post the report bug
  const handleSubmitRR = async () => {
    if (!allDataToPost.title) {
      setIsError((prev) => "Please fill title and description");
      return;
    }
    if (!allDataToPost.description) {
      setIsError((prev) => "Please fill title and description");
      return;
    }

    const formBodyData = new FormData();
    await formBodyData.append("title", allDataToPost?.title);
    await formBodyData.append("description", allDataToPost?.description);
    const accountName = await sessionStorage.getItem("accountName");
    await formBodyData.append("accountName", accountName);

    await formBodyData.append("file", allDataToPost?.file);
    var postReportBugUrl = "";

    if (props.propsOption[1] === "Report a Bug") {
      postReportBugUrl = SERVER_URL + ONBOARDING_URL.REPROT_BUG;
    } else if (props.propsOption[1] === "Feature Request") {
      postReportBugUrl = SERVER_URL + ONBOARDING_URL.REQUEST_FEATURE;
    }
    // const token = await sessionStorage.getItem("token");
    // const id = await sessionStorage.getItem("Id");
    const res = await axios
      .post(postReportBugUrl, formBodyData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // const tempData = res.data.data;
        // setAllUserList(res.data.data);
        setIsSuccess((prev) => true);
        setAllDataToPost((prev) => null);
      })
      .catch((e) => {
        setIsError(e);
      });
  };

  const handleSubmitAgain = (value) => {
    setIsSuccess((prev) => value);
    setAllDataToPost((prev) => {
      return {
        ...prev,
        title: "",
        description: "",
        accountName: "",
        file: null,
      };
    });
  };

  return (
    <>
      {isSuccess ? (
        <SuccessfulUI
          propsOption={props.propsOption}
          toCloseRRModel={() => props.toCloseRRModel()}
          handleSubmitAgain={(isAgain) => handleSubmitAgain(isAgain)}
        />
      ) : (
        <div className="reportRequestTopDiv">
          <div>
            <div className="RRClosingDiv">
              {" "}
              <img
                src={CrossIcon}
                alt="cross icon"
                onClick={() => props.toCloseRRModel()}
              />
            </div>
            <div className="RRHeadingDiv">
              {" "}
              <h2> {props.propsOption[1]} </h2>
            </div>
            <div className="RRAllInputTop">
              <TitleInput onChangeValue={(e) => onChangeValue(e, "title")} />
              <Description
                onChangeValue={(e) => onChangeValue(e, "description")}
              />
              <UploadFileInput
                onChangeValue={(e) => onChangeValue(e, "file")}
              />
              <div className="RRInput">
                {isError && (
                  <ErrorMessage
                    errorMessage={isError}
                    extraClass={"errorMessageDivRR"}
                  />
                )}

                <div className="RRSaveButtonDiv">
                  <button
                    className="RRSaveButton"
                    onClick={() => handleSubmitRR()}
                    disabled={
                      !allDataToPost.title ||
                      !allDataToPost.description ||
                      allDataToPost.title.trim().length === 0 ||
                      allDataToPost.description.trim().length === 0
                    }
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportRequest;
