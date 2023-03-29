import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Route } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import "./LogIn.css";
import ErrorMessage from "../../components/error/ErrorMessage";
import SaarthiLogo from "../../assets/SaarthiLogo/saarthi_logo1.svg";
import WelcomeBackIcon from "../../assets/loginSigninPageIcon/WelcomeBackIcon.svg";
import EmailIdIcon from "../../assets/loginSigninPageIcon/EmailIdIcon.svg";
import PasswordKeyIcon from "../../assets/loginSigninPageIcon/PasswordKeyIcon.svg";
import Visiblity from "../../assets/adduserformIcon/visibility.png";
import Hidden from "../../assets/adduserformIcon/hidden.png";
import { getLoginInfo } from "../../actions/loginActions";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import logPc from "../../assets/SaarthiLogo/logPc.svg";

import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../utilities/Validation";

import {
  SERVER_URL,
  ONBOARDING_URL,
  RESETLINK_URL,
  PROJECT_URL,
  CLIENTNAME_URL,
} from "../../utilities/ApiRoutes";
// import SelectDomainPage from "../selectDomainPage/SelectDomainPage";
import Account from "../account/Account";

function LogIn({ setToken, setUserType }) {
  const [logIn, setLogIn] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  let accountName = window.sessionStorage.getItem("accountName");
  accountName = accountName?.toString().toLowerCase();
  var typeOfUser = "";
  const [userCreditials, setUserCreditials] = useState({
    email: null,
    password: null,
    sendMeLinkEmail: null,
  });
  const [errorHandle, setErrorHandle] = useState({
    emailInvalid: null,
    passwordInvalid: null,
    allError: null,
  });

  const [toHandleLoginPageView, settoHandleLoginPageView] = useState({
    login: 0,
    forgetPassword: 0,
    forgetPasswordOne: 0,
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const refreshPage = () => {
    settoHandleLoginPageView((previousState) => {
      return {
        ...previousState,
        login: 0,
        forgetPassword: 0,
        forgetPasswordOne: 0,
      };
    });

    setErrorHandle((previousState) => {
      return {
        ...previousState,
        emailInvalid: null,
        passwordInvalid: null,
        allError: null,
      };
    });

    setUserCreditials((previousState) => {
      return {
        ...previousState,
        email: null,
        password: null,
        sendMeLinkEmail: null,
      };
    });
  };

  const history = useHistory();
  const ttoken = sessionStorage.getItem("token");

  // if (ttoken) {
  //   <Redirect to="/" />;
  // }

  // Toast Notification
  // const notifySaarthi = (msg) => {
  //   alert('yes')
  //   toast(msg, {
  //   position: "bottom-right",
  //   autoClose: 2000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   });
  // }

  // useEffect(() => {
  //   NotifySaarthi('jai prakash')
  // }, [])
  // function for login

  const handleChangeEmail = (e) => {
    const temp = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        email: temp,
      };
    });
  };

  const handleChangeSendMeLinkEmail = (e) => {
    const emaill = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        sendMeLinkEmail: emaill,
      };
    });
  };

  const handleFocusOnEmail = () => {
    setErrorHandle((previousState) => {
      return {
        ...previousState,
        emailInvalid: null,
        allError: null,
      };
    });
  };

  const handleFocusOnPassword = () => {
    setErrorHandle((previousState) => {
      return {
        ...previousState,
        passwordInvalid: null,
        allError: null,
      };
    });
    const checkingEmailLP = emailValidation(userCreditials.email);
    // console.log(checkingEmailLP);
    if (!checkingEmailLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: checkingEmailLP.errors.message,
        };
      });
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setUserCreditials((previousState) => {
      return {
        ...previousState,
        password: password,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInUrl = SERVER_URL + ONBOARDING_URL.SIGN_IN;
    //const signInUrl = "http://connectors.saarthi.ai/conversation/api/accounts/v1/login"
    const checkingEmailLP = emailValidation(userCreditials.email);
    const checkingPasswordLP = passwordValidation(userCreditials.password);
    if (!checkingEmailLP.isValid || !checkingPasswordLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: checkingEmailLP.errors.message,
          passwordInvalid: checkingPasswordLP.errors.message,
        };
      });
      return;
    }
    let data = {
      userName: userCreditials.email,
      password: userCreditials.password,
    };

    let headers = { "Content-Type": "application/json" };
    setIsLoginLoading(true);
    const res = await axios
      .post(signInUrl, data, headers)
      .then((res) => {
        if (!res.data.data.userDetail.isActive) {
          setErrorHandle((previousState) => {
            return {
              ...previousState,
              allError: "Inactive User",
            };
          });
          return;
        }
        // console.log(res.data.data, "logindata");
        // console.log(res.data.data.userDetail.role, "roledata");
        // console.log(
        //   "ggg",
        //   res.data.data.userDetail,
        //   res.data.data.userSessionDetails
        // );

        getLoginInfo(res.data.data, dispatch);
        setToken(res.data.data.userSessionDetails.accessToken);
        sessionStorage.setItem(
          "token",
          res.data.data.userSessionDetails.accessToken
        );
        sessionStorage.setItem("Id", res.data.data.userSessionDetails.userId);
        sessionStorage.setItem("email", res.data.data.userDetail.email);
        sessionStorage.setItem("name", res.data.data.userDetail.name);
        sessionStorage.setItem("role", res.data.data.userDetail.role);
        sessionStorage.setItem("isActive", res.data.data.userDetail.isActive);
        sessionStorage.setItem(
          "accountName",
          res.data.data.userDetail.accountDetails[0].name
        );
        sessionStorage.setItem(
          "accountId",
          res.data.data.userDetail.accountDetails[0].id
        );
        sessionStorage.setItem("language", res.data.data.userDetail.language);
        // notifySaarthi('Login successful!');
        // historry.push("/");
        axios.get(`${CLIENTNAME_URL}`).then((response) => {
          let fdata = response?.data?.data;
          let type = fdata.filter((each) => {
            if (
              each.name.toLowerCase() ==
              res.data.data.userDetail.accountDetails[0].name.toLowerCase()
            ) {
              return each;
            }
          });
          // console.log("gg", res.data.data.userDetail);
          sessionStorage.setItem("userType", type[0].type);
          typeOfUser = type[0].type;
          // setUserType("SET_USER_TYPE",typeOfUser)
          if (type[0].type?.toLowerCase() == "internal") {
            if (res.data.data.userDetail.role === "Annotator Admin") {
              // window.sessionStorage.setItem("isActive","Campaign Manager")
              // sessionStorage.setItem("pageType", "Campaign Manager");
              window.sessionStorage.setItem("pageType", "Annotation Tool");
            } else {
              // window.sessionStorage.setItem("isActive","Campaign Manager")
              // sessionStorage.setItem("pageType", "Campaign Manager");
              window.sessionStorage.setItem("pageType", "Annotation Tool");
            }
          } else {
            if (res.data.data.userDetail.role === "Annotator Admin") {
              // window.sessionStorage.setItem("isActive","userlist")
              // sessionStorage.setItem("pageType", "Admin");
              sessionStorage.setItem("pageType", "Annotator Admin");
            } else {
              // window.sessionStorage.setItem("isActive","userlist")
              // sessionStorage.setItem("pageType", "Admin");
              sessionStorage.setItem("pageType", "Annotator Admin");
            }
          }
        });

        setNextPage();
      })
      .catch((e) => {
        // console.log(e);
        setIsLoginLoading(false);
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            allError: "Please check your email and password",
          };
        });
      });
  };

  const handleSubmitSendLink = async (e) => {
    e.preventDefault();
    const fetchUserIdUrl = SERVER_URL + RESETLINK_URL.GET_USER_ID;
    const sendLinkUrl = SERVER_URL + RESETLINK_URL.PASSWORD_RESET_LINK;
    // "http://connectors.saarthi.ai/conversation/api/accounts/v1/forgotPasswordLink" ;
    const checkingEmailLP = emailValidation(userCreditials.sendMeLinkEmail);
    if (!checkingEmailLP.isValid) {
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: checkingEmailLP.errors.message,
        };
      });
      return;
    }
    const finalFetchUserIdUrl = `${fetchUserIdUrl}email=${userCreditials.sendMeLinkEmail}`;
    setIsLoginLoading(true);
    let resuser = await axios.get(finalFetchUserIdUrl);

    const resUserId = resuser.data.data.userId;
    // console.log(resUserId);

    let resetPasswordLink = `${PROJECT_URL}/resetpassword?id=${resUserId}`;
    //let resetPasswordLink = `http://localhost:3000/resetpassword?id=${resUserId}`;
    let data = {
      email: userCreditials.sendMeLinkEmail,
      resetLink: resetPasswordLink,
    };
    // console.log(data);
    let headers = { "Content-Type": "application/json" };

    const res = await axios
      .post(sendLinkUrl, data, headers)
      .then((res) => {
        // console.log(res);
        settoHandleLoginPageView((previousState) => {
          return {
            ...previousState,
            forgetPassword: 1,
          };
        });
      })
      .catch((e) => {
        // console.log(e);
        setIsLoginLoading(false);
        setErrorHandle((previousState) => {
          return {
            ...previousState,
            allError: "Email doesn't exit",
          };
        });
      });
  };

  const HandleLoginPageView = (type) => {
    if (type === "forgetPassword") {
      settoHandleLoginPageView((previousState) => {
        return {
          ...previousState,
          login: 1,
        };
      });
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: null,
          passwordInvalid: null,
          confirmPasswordInvalid: null,
          allError: null,
        };
      });
    } else if (type === "moveToLogin") {
      settoHandleLoginPageView((previousState) => {
        return {
          ...previousState,
          login: 0,
        };
      });
      setErrorHandle((previousState) => {
        return {
          ...previousState,
          emailInvalid: null,
          passwordInvalid: null,
          confirmPasswordInvalid: null,
          allError: null,
        };
      });
      setChecked(false);
    }
  };

  const setNextPage = () => {
    let role = window.sessionStorage.getItem("role");
    // console.log(role, "role");
    if (role === "Data Annotator" || role === "Quality Analyst") {
      history.push("/assignedproject");
    } else {
      setLogIn((prev) => false);
    }
  };
  const handleCheckBox = (e) => {
    console.log(e.target.checked, "VALUE");
    if (e.target.checked) {
      setChecked(true);
    } 
    else {
      setChecked(false);
    }
  };

  return (
    <>
      {logIn ? (
        <div className="loginTopDiv">
          <div className="loginHeader">
            <div className="loginHeadLogo">
              <img src={SaarthiLogo} alt="SaarthiLog" />
            </div>
            <div className="loginHeading"> </div>
            <div style={{ width: "15%" }}></div>
          </div>
          <div className="formloginPageCard">
            <img className="imdkd9" src={logPc} alt="" />

            {toHandleLoginPageView.login === 0 && (
              <>
                <div className="felxcol0293">
                  <div className="formAreaLP">
                    <div>
                      <p className="annotaottext240">Annotation Tool</p>
                      <p className="tinytext0348h">
                        Annotation tool helps you to access and edit your{" "}
                        <br></br>customer conversation
                      </p>
                    </div>

                    <form>
                      <div className="formLabelLP">
                        <div className="inputBorderForm">
                          <input
                            className="formInputArea"
                            type="email"
                            placeholder="Enter your Username"
                            required
                            onChange={handleChangeEmail}
                            onFocus={handleFocusOnEmail}
                          />
                        </div>
                        {errorHandle.emailInvalid && (
                          <div className="errorMessageLP">
                            <ErrorMessage
                              errorMessage={errorHandle.emailInvalid}
                            />
                          </div>
                        )}
                      </div>
                      <div className="formLabelLP">
                        <div className="inputBorderForm">
                          <input
                            className="formInputArea"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            onChange={handleChangePassword}
                            onFocus={handleFocusOnPassword}
                            maxLength="20"
                          />
                          <img
                            className="passwordVisibilityIconLP"
                            src={showPassword ? Hidden : Visiblity}
                            alt="Email Id Icon"
                            onClick={() => {
                              setShowPassword((prev) => !prev);
                            }}
                          />
                        </div>
                        {errorHandle.passwordInvalid && (
                          <div className="errorMessageLP">
                            <ErrorMessage
                              errorMessage={errorHandle.passwordInvalid}
                            />
                          </div>
                        )}
                        <p
                          className="forgetPasswordLink"
                          onClick={() => HandleLoginPageView("forgetPassword")}
                        >
                          Forgot password?
                        </p>
                      </div>
                      <div className="formLabelLP">
                        {errorHandle.allError && (
                          <div className="">
                            <ErrorMessage
                              errorMessage={errorHandle.allError}
                              extraClass={"extraErrorMessageClassNameLPSL"}
                            />
                          </div>
                        )}
                      </div>

                      <div className="formLabelLP">
                        <div className="summitTopDivLP">
                          <input
                            className={
                              isLoginLoading
                                ? "formInputSubmitLPInactive"
                                : "formInputSubmitLP"
                            }
                            type="button"
                            value={isLoginLoading ? "Logging in..." : "LOG IN"}
                            disabled={ !checked}
                            onClick={(e) => {
                              console.log("CLEKCED");
                              return handleSubmit(e);
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="belowsection">
                    <input
                      type="checkbox"
                      name="checkpolicy"
                      onChange={handleCheckBox}
                    />
                    <p>
                      By continuing, you agree to Saarthi.AI's Terms of Use.
                      Read our{" "}
                      <a
                        rel="noreferrer noopener"
                        href="https://saarthi.ai/privacy-policy"
                        target="_blank"
                      >
                        Privacy Policy.
                      </a>
                    </p>
                  </div>
                </div>
              </>
            )}
            {toHandleLoginPageView.login === 1 && (
              <div className="felxcol0293">
                <div className={"formAreaLP"}>
                  {toHandleLoginPageView.forgetPassword === 0 && (
                    <div>
                      <div className="forgetPasswordHeadingTopDiv">
                        <div className="FPHeading">
                          <img src={WelcomeBackIcon} alt="Welcome back icon" />
                          <h2> Welcome back! </h2>
                        </div>
                      </div>
                      <form>
                        <div className="formLabelLP">
                          <div className="inputBorderForm">
                            <img src={EmailIdIcon} alt="Email Id Icon" />
                            <input
                              className="formInputArea"
                              type="email"
                              placeholder="Enter your Username"
                              required
                              onChange={handleChangeSendMeLinkEmail}
                              onFocus={handleFocusOnEmail}
                            />
                          </div>
                          {errorHandle.emailInvalid && (
                            <div className="errorMessageLP">
                              <ErrorMessage
                                errorMessage={errorHandle.emailInvalid}
                              />
                            </div>
                          )}
                        </div>

                        <div className="formLabelLP">
                          <p className="dontWorryMessage">
                            Dont worry, happens to the best of us.
                          </p>
                        </div>
                        {errorHandle.allError && (
                          <div className="errorMessageLP">
                            <ErrorMessage
                              errorMessage={errorHandle.allError}
                              extraClass={"extraErrorMessageClassNameLPSL"}
                            />
                          </div>
                        )}
                        <div className="formLabelLP">
                          <div className="summitTopDivLP">
                            <input
                              className="formInputSubmitLP"
                              type="button"
                              value=" Send me the link "
                              onClick={(e) => handleSubmitSendLink(e)}
                            />
                          </div>
                        </div>
                        <div className="formLabelLP">
                          <p
                            className="forgetPasswordLink"
                            onClick={() => {
                              HandleLoginPageView("moveToLogin");
                              refreshPage();
                            }}
                          >
                            or Login
                          </p>
                        </div>
                      </form>
                    </div>
                  )}

                  {toHandleLoginPageView.forgetPassword === 1 && (
                    <div className="forgetPasswordHeadingTopDiv">
                      <div className="successfulMessageSentLink">
                        <h3> RESET PASSWORD LINK SENT </h3>
                        <p>
                          {" "}
                          Please check your email for a link to reset your
                          password{" "}
                        </p>
                      </div>
                      <div className="mailSentLogin">
                        <Link to="/" onClick={() => refreshPage()}>
                          Click here to login{" "}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        //  <SelectDomainPage/>
        <Account />
      )}
    </>
  );
}

export default LogIn;
