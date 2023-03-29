import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Navigationbar.css";
import { ROUTES } from "../../Routes";
import SaarthiLogo from "../../assets/SaarthiLogo/saarthiLogo.svg";
import RequestFeatureIcon from "../../assets/summarysection/RequestFeatureIcon.svg";
import ReportBugIcon from "../../assets/summarysection/ReportBugIcon.svg";
import RequestFeatureActiveIcon from "./assets/RequestFeatureActiveIcon.svg";
import ReportBugActiveIcon from "./assets/ReportBugActiveIcon.svg";
import ReportRequest from "../reportrequest/ReportRequest";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import { ta } from 'date-fns/locale';
// import ReportRequest from '../reportrequest/ReportRequest';

const Navigationbar = () => {
  const [propsOption, setPropsOption] = useState(null);
  const [userAccountDetails, setUserAccountDetails] = useState(null);
  const [isError, setIsError] = useState();
  const role = useSelector(
    (state) => state?.loginState?.logInData?.userDetail?.role
  );

  const [isCheckActiveRR, setIsCheckActiveRR] = useState({
    reportBugActiveIcon: false,
    requestFeatureActiveIcon: false,
  });
  const history = useHistory();
  const ref = useRef();

  const requestFeatureOption = {
    1: "Feature Request",
    2: "Feature Requested",
    3: "Thank you for requesting the feature.",
    4: "Request another feature",
  };
  const reportBugOption = {
    1: "Report a Bug",
    2: "Bug Reported",
    3: "Thank you for reporting the bug.",
    4: "Report another bug",
  };

  const toGetUserCredentials = async () => {
    const temp = await sessionStorage.getItem("name");
    setUserAccountDetails(temp);
  };

  useEffect(() => {
    toGetUserCredentials();
  }, []);

  // To close the request feature and report bug pop up on outside click
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isCheckActiveRR.requestFeatureActiveIcon &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsCheckActiveRR((prev) => {
          return {
            ...prev,
            reportBugActiveIcon: false,
            requestFeatureActiveIcon: false,
          };
        });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isCheckActiveRR.requestFeatureActiveIcon]);

  // To close the request feature and report bug pop up on outside click
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isCheckActiveRR.reportBugActiveIcon &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsCheckActiveRR((prev) => {
          return {
            ...prev,
            reportBugActiveIcon: false,
            requestFeatureActiveIcon: false,
          };
        });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isCheckActiveRR.reportBugActiveIcon]);

  // selection between  request feature and report issue
  const handleClickRequestReport = (type) => {
    if (type === "requestFeature") {
      setPropsOption((previouState) => {
        return {
          ...requestFeatureOption,
        };
      });
      setIsCheckActiveRR((prev) => {
        return {
          ...prev,
          reportBugActiveIcon: false,
          requestFeatureActiveIcon: !prev.requestFeatureActiveIcon,
        };
      });
    } else {
      setPropsOption((previouState) => {
        return {
          ...reportBugOption,
        };
      });
      setIsCheckActiveRR((prev) => {
        return {
          ...prev,
          reportBugActiveIcon: !prev.reportBugActiveIcon,
          requestFeatureActiveIcon: false,
        };
      });
    }
  };

  const toCloseRRModel = () => {
    setIsCheckActiveRR((prev) => {
      return {
        ...prev,
        reportBugActiveIcon: false,
        requestFeatureActiveIcon: false,
      };
    });
  };

  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <>
      <div className="navigationbarTopDiv" ref={ref}>
        <div className="navgationLeft">
          <div
            className="navgationLeftChild"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <span className="navgationLeftLogoArea">
              <img style={{ width: "60px" }} src={SaarthiLogo} />
              {/* <p>Saarthi.ai</p> */}
            </span>{" "}
            {/* &nbsp;&nbsp;&nbsp; */}
            <span className="navigationHeading">
              <h4>
                {sessionStorage?.getItem("pageType")
                  ? sessionStorage?.getItem("pageType")
                  : "Annotation Tool"}{" "}
              </h4>
            </span>
          </div>
        </div>
        <div className="navigationRightChild">
          <span className="navigationRightWelcome" id="welcome_saarthi">
            {" "}
            Welcome!{" "}
          </span>
          <span className="navigationRightClientname">
            {userAccountDetails}
          </span>
          {(role === "Data Annotator" || role === "Quality Analyst") &&
          history.location.pathname !== ROUTES.DEMO ? (
            <span
              className="logoutSpan"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(ROUTES.DEMO);
              }}
            >
              Demo
            </span>
          ) : (
            <></>
          )}

          <span className="logoutSpan" onClick={logout}>
            <a className="logoutLink" href="/">
              Logout
            </a>
          </span>
          <span style={{ position: "relative" }}>
            <span
              className="requestFeatureSpan"
              onClick={() => handleClickRequestReport("requestFeature")}
            >
              <span className="requestFeaturePopupIcon">
                <img
                  src={
                    isCheckActiveRR.requestFeatureActiveIcon
                      ? RequestFeatureActiveIcon
                      : RequestFeatureIcon
                  }
                  alt="request feature"
                />
                <span className="requestFeaturePopupDescription">
                  {" "}
                  Request Feature{" "}
                </span>
              </span>
            </span>
            {isCheckActiveRR.requestFeatureActiveIcon && (
              <ReportRequest
                propsOption={propsOption}
                toCloseRRModel={() => toCloseRRModel()}
              />
            )}
          </span>
          <span style={{ position: "relative" }}>
            <span
              className="reportBugSpan"
              onClick={() => handleClickRequestReport("reportbug")}
            >
              <span className="requestFeaturePopupIcon">
                <img
                  src={
                    isCheckActiveRR.reportBugActiveIcon
                      ? ReportBugActiveIcon
                      : ReportBugIcon
                  }
                  alt="report bug"
                />
                <span className="requestFeaturePopupDescription">
                  {" "}
                  Report Bug{" "}
                </span>
              </span>
            </span>
          </span>
          {isCheckActiveRR.reportBugActiveIcon && (
            <ReportRequest
              propsOption={propsOption}
              toCloseRRModel={() => toCloseRRModel()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navigationbar;
