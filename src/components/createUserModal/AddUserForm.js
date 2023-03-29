import react, { useState, useEffect } from "react";
import useDidMountEffect from "../useDidMount/UseDidMountEffect";
// import Styles from "../../styles/LoginStyles.module.css";
import DeleteUserDark from "../../assets/createUserTable/DeleteUserDark.svg";
import InputBox from "../ui-kits/inputboximg/InputBoxImg";
import Button from "../ui-kits/Button/button";
import DropdownSaarthi from "../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import Icon from "../ui-kits/Icon/icon";

import "./AddUserForm.css";

import NameIcon from "../../assets/adduserformIcon/NameIcon.svg";
import EmailIcon from "../../assets/adduserformIcon/EmailIcon.svg";
import PasswordIcon from "../../assets/adduserformIcon/PasswordIcon.svg";
import RoleIcon from "../../assets/adduserformIcon/RoleIcon.svg";
import LanguageIcon from "../../assets/adduserformIcon/LanguageIcon.svg";
// import DropdownIcon from "../../assets/clientadmin/DropdownIcon.svg";

import visiblity from "../../assets/adduserformIcon/visibility.png";
import hidden from "../../assets/adduserformIcon/hidden.png";
import { USERLIST_CREATE_URL } from "../../utilities/ApiRoutes";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../utilities/Validation";
import ErrorMessage from "../error/ErrorMessage";
import MultiSelectDropdown from "../ui-kits/multiselectdropdown/MultiSelectDropdown";
import DropdownIcon from "../../assets/clientadmin/DropdownIcon.svg";

const FormAddUser = (props) => {
  const [showPassword, setShowPassword] = useState([]);

  const langauge = sessionStorage.getItem("language");
  const accountName = sessionStorage.getItem("accountName");
  const accountname = props.accountName ? props.accountName : accountName;
  let isActive = sessionStorage.getItem("isActive");
  const [inputList, setInputList] = useState([
    {
      language: "",
      accountName: props.accountName ? props.accountName : accountName,
      name: "",
      password: "",
      role: "",
      email: "",
      isActive: isActive,
    },
  ]);

  const [isError, setIsError] = useState();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();

  // To change the value of credential
  const onChangeCredentials = (e, credential, i) => {
    const list = [...inputList];
    if (credential === "name") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "email") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "password") {
      const { name, value } = e.target;
      list[i][name] = value;
      setInputList(list);
    } else if (credential === "role") {
      if (e) {
        list[i]["role"] = e;
        setInputList((prev) => list);
      }
    } else if (credential === "language") {
      if (e) {
        list[i]["language"] = [...e];
        setInputList((prev) => list);
      }
    }
  };
  const imageClickLeft = () => {};

  // To function for validation
  const toCheckAllValidation = (each, i) => {
    const isCheckName = nameValidation(each.name);
    if (!isCheckName.isValid) {
      const temp = `${isCheckName.errors.message}`;
      return temp;
    }
    const isCheckEmail = emailValidation(each.email);
    if (!isCheckEmail.isValid) {
      const temp = `${isCheckEmail.errors.message}`;
      return temp;
    }
    const isCheckPassword = passwordValidation(each.password);
    if (!isCheckPassword.isValid) {
      const temp = `${isCheckPassword.errors.message}`;
      return temp;
    }
    if (!each.role) {
      const temp = `Please select the role`;
      return temp;
    }
    return null;
  };

  const toBack = () => {
    props.handleClickCancelAddUserModel();
  };

  // To create user
  const addUserList = async () => {
    const dataValidation = inputList;
    const addUserUrl = USERLIST_CREATE_URL.CREATE_USER;
    const accountName = await sessionStorage.getItem("accountName");
    const langauge = await sessionStorage.getItem("langauge");
    let checkIsError = null;
    if (dataValidation?.length) {
      const tempErrojjjr = dataValidation.map((ipfield, i) => {
        const checkError = toCheckAllValidation(ipfield, i);

        setIsError((previousState) => checkError);
        checkIsError = checkError;
        // if(checkError){
        // console.log(checkError);

        props.toGetErrorMessage(checkError);
        //return;
        // }
      });
    }
    if (checkIsError) {
      return;
    }

    let data = inputList;
    // console.log(data);
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    await axios
      .post(addUserUrl, data, {
        headers: {
          "x-access-token": token,
          userId: id,
        },
      })
      .then((res) => {
        // props.handleClickCreateUser(true);
        // props.handleClickCreateUser(false);
        // props.handleClickCancelAddUserModel()
        toBack();

        toast.success("User added successfully!");
      })
      .catch((e) => {
        toast.error("Adding user is unsuccessfull!");
        console.log(e);
      });
  };

  const handleClickAddMoreUserForm = () => {
    let tempram = [...inputList];
    tempram.push({
      language: "",
      accountName: accountname,
      name: "",
      password: "",
      role: "",
      email: "",
      isActive: isActive,
    });
    setInputList(tempram);
  };

  const handleClickRemoveUserForm = (i) => {
    let temp = [...inputList];

    // const index = temp.indexOf(i);
    if (i > -1) {
      temp.splice(i, 1);
    }

    setInputList(temp);
  };

  useEffect(() => {
    setInputList((prev) => inputList);
  }, [inputList]);

  const handleClickEyeIcon = (i) => {
    let tempArr = showPassword;
    if (!tempArr.includes(i)) {
      tempArr.push(i);
    } else {
      const index = tempArr.indexOf(i);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
    }
    setShowPassword((previousState) => {
      return [...previousState, [tempArr]];
    });
  };

  useDidMountEffect(() => {
    handleClickAddMoreUserForm();
  }, [props.isAddUser]);

  useDidMountEffect(() => {
    addUserList();
  }, [props.isCreateNewUser]);

  let role = sessionStorage.getItem("role");

  const [propsForDropdown, setPropsForDropdown] = useState({
    optionList: "",
    placeHolderText: "Role",
    imgSrcLeft: RoleIcon,
    imgSrcRight: "",
  });

  let language = sessionStorage.getItem("language");

  const propsForDropdownLang = {
    optionList: [...language.split(",")],
    placeHolderText: "Language",
    imgSrcLeft: RoleIcon,
    imgSrcRight: "",
  };

  useEffect(() => {
    setPropsForDropdown((prev) => {
      return {
        ...prev,
        optionList: [...props.allRole],
      };
    });
  }, [props.allRole]);

  const onChangeLanguge = (item) => {
    setSelectedLanguage((prev) => item);
  };
  const options = {
    imgSrcRight: "",
    imgSrcleft: RoleIcon,
    placeHolderText: inputList[0]?.language,
  };

  return (
    <div className="formAddWrapper">
      {inputList?.length &&
        inputList?.map((ipfield, i) => {
          return (
            <div className="userCredentialsTopOneForm">
              <div className="userCredentialsOneForm">
                <div className="formGroupAU">{i + 1}.</div>
                <div className="formGroupAU">
                  <InputBox
                    className="userCredentials"
                    //id="userNameID"
                    type="text"
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "name", i)
                    }
                    value={inputList[i]["name"]}
                    imgSrcLeft={NameIcon}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    placeholder="Name"
                    name="name"
                    id={"name" + i}
                    // key={"name" + i}
                    parentClass={
                      nameValidation(inputList[i]["name"]).isValid
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly={isReadOnly}
                    onFocus={() => {
                      setIsReadOnly((prev) => false);
                    }}
                  />
                </div>
                <div className={`formGroupAU emailBoxLargerAF`}>
                  <InputBox
                    className="userCredentials"
                    //id="userEmailID"
                    type="email"
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "email", i)
                    }
                    value={inputList[i]["email"]}
                    imgSrcLeft={EmailIcon}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    placeholder="Email"
                    name="email"
                    id={"email" + i}
                    // key={"email" + i}
                    parentClass={
                      emailValidation(inputList[i]["email"]).isValid
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly={isReadOnly}
                    onFocus={() => {
                      setIsReadOnly((prev) => false);
                    }}
                  />
                </div>
                <div className="formGroupAU">
                  <InputBox
                    className="userCredentials"
                    //id="userPasswordID"
                    type={showPassword.includes(i) ? "text" : "password"}
                    onChangeValue={(event) =>
                      onChangeCredentials(event, "password", i)
                    }
                    value={inputList[i]["password"]}
                    imgSrcLeft={PasswordIcon}
                    imgSrc={showPassword.includes(i) ? hidden : visiblity}
                    imageClick={() => handleClickEyeIcon(i)}
                    imageClickLeft={() => imageClickLeft()}
                    imageExtraStyle={{ width: "40px" }}
                    imageSrcExtraStyle={{ width: "15px" }}
                    placeholder="Password"
                    name="password"
                    id={"password" + i}
                    // key={"password" + i}
                    maxLength="20"
                    parentClass={
                      passwordValidation(inputList[i]["password"]).isValid
                        ? "parentClassValidated"
                        : "parentClassNotValidated"
                    }
                    readOnly={isReadOnly}
                    onFocus={() => {
                      setIsReadOnly((prev) => false);
                    }}
                  />
                </div>

                <div style={{ width: "20%" }} className="formGroupAU">
                  <DropdownSaarthi
                    droplist={{
                      optionList: propsForDropdown?.optionList,
                      placeHolderText: inputList?.[i]?.role?.length
                        ? inputList?.[i]?.role
                        : "Role",
                      imgSrcLeft: RoleIcon,
                      imgSrcRight: DropdownIcon,
                    }}
                    selectedItem={(item) =>
                      onChangeCredentials(item, "role", i)
                    }
                    // extraClassSelectedArea={'extraStyleClassAUF'}
                    extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
                    extraClassToBeSelectedArea={"extraStyleBeAbhi"}
                    extraClassDropdownSearchArea={"extraSearchArea"}
                    // key={"role" + i}
                  />
                </div>
                <div style={{ width: "20%" }} className="formGroupAU">
                  {/* <DropdownSaarthi
                    droplist={propsForDropdownLang}
                    selectedItem={(item) =>
                      onChangeCredentials(item, "language", i)
                    }
                    // extraClassSelectedArea={'extraStyleClassAUF'}
                    extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
                    extraClassToBeSelectedArea={"extraStyleBeAbhi"}
                    extraClassDropdownSearchArea={"extraSearchArea"}
                    // key={"role" + i}
                  /> */}

                  <MultiSelectDropdown
                    options={{
                      imgSrcLeft: LanguageIcon,
                      imgSrcRight: DropdownIcon,
                      placeHolderText: inputList?.[i]?.language?.length
                        ? inputList?.[i]?.language?.[0] +
                          (inputList?.[i]?.language?.length > 1
                            ? "+" + inputList?.[i]?.language?.length
                            : "")
                        : "Language",
                    }}
                    toBeFilterData={[...language.split(",")]}
                    extraSelectedClass={
                      inputList?.[i]?.language?.length
                        ? "languageDropdown"
                        : "languageDropdownNotValid"
                    }
                    getFilteredData={(value) => {
                      return (
                        onChangeLanguge(value),
                        onChangeCredentials(value, "language", i)
                      );
                    }}
                    key="dispositionMultiSelectOne"
                    isDisable={
                      props.disableFilterList?.includes("Disposition")
                        ? true
                        : false
                    }
                    extraPlaceHolderStyle="placeholderMultiStyleAgent"
                  />
                </div>
                <div className="addRemoveUserIcon removeButtonStyle">
                  {inputList?.length > 1 && (
                    /*<Button
                      text=" — "
                      imgSrc={DeleteUserDark}
                      extraClass="removeButtonStyle"

                    />*/

                    <Icon
                      onClick={() => handleClickRemoveUserForm(i)}
                      img_src={DeleteUserDark}
                      extraClass={"DeleteUserIconDark"}
                      alt="DeleteUserIconDark"
                    />
                  )}
                </div>
              </div>
              {/*  <div style={{ height: "14px" }} className="addRemoveUserIcon">
             {inputList.length > 1 && (
                  <span style={{paddingTop:"0px",marginTop:"0px" }} onClick={()=>handleClickRemoveUserForm(i)}>  </span>
                )}
              </div>*/}
              <ToastContainer
                position="top-center"
                type="success"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={false}
                draggable={false}
                rtl={false}
              />
            </div>
          );
        })}
    </div>
  );
};

const AddUserForm = (props) => {
  const [isAddUserjai, setIsAddUserjai] = useState(false);
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [isError, setIsError] = useState();
  console.log(isAddUserjai, isCreateNewUser, isError, "gggg");
  const [allRole, setAllRole] = useState([]);

  let role = sessionStorage.getItem("role");

  useEffect(() => {
    const rolerrrTemp = role.toString().toLowerCase();
    // console.log(rolerrrTemp)
    if (rolerrrTemp) {
      if (rolerrrTemp === "owner") {
        setAllRole((prev) => [
          "Chief Risk Officer",
          "Collection Manager",
          "Campaign Manager",
          "Campaign Analyst",
          "Guest",
        ]);
      } else if (rolerrrTemp === "guest") {
        setAllRole((prev) => [
          "Chief Risk Officer",
          "Collection Manager",
          "Campaign Manager",
          "Campaign Analyst",
        ]);
      } else if (rolerrrTemp === "chief risk officer") {
        setAllRole((prev) => [
          "Collection Manager",
          "Campaign Manager",
          "Campaign Analyst",
        ]);
      } else if (rolerrrTemp === "collection manager") {
        setAllRole((prev) => ["Campaign Manager", "Campaign Analyst"]);
      } else if (rolerrrTemp === "campaign manager") {
        setAllRole((prev) => ["Campaign Analyst"]);
      }
    }
  }, [role]);

  const AddUserData = (props) => {
    setIsAddUserjai((prev) => !prev);
  };
  useEffect(() => {
    setIsAddUserjai(isAddUserjai);
  }, [isAddUserjai]);

  // To summit all user
  const handleSummitAddUserList = () => {
    setIsCreateNewUser((previousState) => !previousState);
    props.toApiUpdate((prev) => !prev);
  };

  // To cancel add user form
  const handleClickCancelAddUser = () => {
    props.handleClickCancelAddUserModel();
  };

  // const handleClickCreateUser = (value) =>{
  //   // props.handleClickCreateUser(value);
  //   props.handleClickCancelAddUserModel();
  // }

  const toGetErrorMessage = (err) => {
    setIsError((prev) => err);
  };

  return (
    <div className="addUserCreateWrapper">
      <div className="addUserFormTopDiv">
        <div className="addUserButton">
          <Button
            text="+ Add User"
            extraStyle={{
              /*padding: "5px 15px",
              fontWeight: "bold",
              background: "#DDECFF",*/
              padding: "1em",
              fontWeight: "700",
              background: "white",
              color: "#0174ff",
            }}
            onClick={() => AddUserData()}
          />
        </div>
        <div className="addUserFormArea">
          <FormAddUser
            isAddUser={isAddUserjai}
            isCreateNewUser={isCreateNewUser}
            handleClickCancelAddUserModel={() => handleClickCancelAddUser()}
            // handleClickCreateUser={value =>handleClickCreateUser(value)}
            toGetErrorMessage={(value) => toGetErrorMessage(value)}
            allRole={allRole}
            accountName={props.accountName}
          />
        </div>
        <div className="errorMessage">
          {isError && (
            <ErrorMessage
              errorMessage={isError}
              extraClass={"extraErrorMessageClassName"}
            />
          )}
        </div>
        <div className="createAndCancelButtonDiv">
          <div className="createUserButton">
            <Button
              text=" Submit "
              extraClass="createUserButtonStyle"
              onClick={() => handleSummitAddUserList()}
              // disabled={isError?true:false}
            />
          </div>
          <div className="createUserButton">
            <Button
              text=" Cancel "
              extraClass="createUserButtonStyle"
              //extraClass="cancelButtonStyle"
              onClick={() => handleClickCancelAddUser()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
