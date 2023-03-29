import React, { useState, useEffect } from "react";

import InputBox from "../inputboximg/InputBoxImg";
import Button from "../Button/button";
import DropdownSaarthi from "../dropdownsaarthi2/DropdownSaarthi";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../../utilities/Validation";

import "./UserCredentialForm.css";

import NameIcon from "../../../assets/adduserformIcon/NameIcon.svg";
import EmailIcon from "../../../assets/adduserformIcon/EmailIcon.svg";
import PasswordIcon from "../../../assets/adduserformIcon/PasswordIcon.svg";
import RoleIcon from "../../../assets/adduserformIcon/RoleIcon.svg";
// import DropdownIcon from "../../../assets/clientadmin/DropdownIcon.svg";
import visiblity from "../../../assets/adduserformIcon/visibility.png";
import hidden from "../../../assets/adduserformIcon/hidden.png";
import MultiSelectDropdown from "../multiselectdropdown/MultiSelectDropdown";
import DropdownIcon from "../../../assets/clientadmin/DropdownIcon.svg";
import { useHistory } from "react-router-dom";
const UserCredentialForm = (props) => {
  const [userCredential, setUserCredential] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }
  // let role = sessionStorage.getItem("role");
  const langauge = sessionStorage.getItem("language");
  useEffect(() => {
    if (props.userToUpdateData) {
      setUserCredential((previousState) => {
        return {
          ...props.userToUpdateData,
        };
      });
    }
  }, [props.userToUpdateData]);

  const [allRole, setAllRole] = useState([]);

  useEffect(() => {
    const rolerrrTemp = role.toString().toLowerCase();

    if (rolerrrTemp) {
      if (rolerrrTemp === "owner") {
        setAllRole((prev) => [
          "CRO",
          "Collection Manager",
          "Campaign Manager",
          "Campaign Analyst",
          "Guest",
        ]);
      } else if (rolerrrTemp === "guest") {
        setAllRole((prev) => [
          "CRO",
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

  const propsForDropdown = {
    optionList: [...allRole],
    placeHolderText: userCredential?.role,
    imgSrcLeft: RoleIcon,
    imgSrcRight: DropdownIcon,
  };
  const propsForDropdown2 = {
    optionList: [],
    placeHolderText: userCredential?.language,
    imgSrcLeft: RoleIcon,
    imgSrcRight: "",
  };
  useEffect(() => {
    props.updatededData(userCredential);
  }, [userCredential]);

  // To change the value of credential
  const onChangeCredentials = (e, credential, i) => {
    if (credential === "name") {
      const { name, value } = e.target;
      setUserCredential((previousState) => {
        return {
          ...previousState,
          name: value,
        };
      });
    } else if (credential === "email") {
      const { name, value } = e.target;
      setUserCredential((previousState) => {
        return {
          ...previousState,
          email: value,
        };
      });
    } else if (credential === "password") {
      const { name, value } = e.target;
      setUserCredential((previousState) => {
        return {
          ...previousState,
          password: value,
        };
      });
    } else if (credential === "role") {
      setUserCredential((previousState) => {
        return {
          ...previousState,
          role: e,
        };
      });
    } else if (credential === "language") {
      setUserCredential((previousState) => {
        return {
          ...previousState,
          language: e,
        };
      });
    }
  };

  const options = {
    imgSrcRight: "",
    imgSrcleft: RoleIcon,
    placeHolderText: userCredential?.language?.length
      ? userCredential?.language[0] +
        "+" +
        (userCredential?.language?.length - 1)
      : "Select Language",
  };
  const onChangeLanguge = (item) => {
    setSelectedLanguage((prev) => item);
  };

  return (
    <div className="userCredentialWrapper">
      <div>
        <div className="userCredentialsOneForm">
          <div className="formGroupUCF">
            <InputBox
              className="userCredentials"
              id="userNameID"
              type="text"
              onChangeValue={(event) => onChangeCredentials(event, "name")}
              value={userCredential?.name}
              imgSrcLeft={NameIcon}
              //  imageClickLeft={()=>imageClickLeft()}
              imageExtraStyle={{ width: "40px" }}
              placeholder="Name"
              name="name"
              //id={"name "+i}
              parentClass={
                nameValidation(userCredential?.name).isValid
                  ? "parentClassValidated"
                  : "parentClassNotValidated"
              }
            />
          </div>
          <div className={`formGroupUCF emailBoxLargerUCF`}>
            <InputBox
              className="userCredentials"
              id="userEmailID"
              type="email"
              onChangeValue={(event) => onChangeCredentials(event, "email")}
              value={userCredential?.email}
              imgSrcLeft={EmailIcon}
              disabled={props.disable ? props.disable : false}
              //  imageClickLeft={()=>imageClickLeft()}
              imageExtraStyle={{ width: "40px" }}
              placeholder="Email"
              name="email"
              //id={"email"+i}
              parentClass={
                emailValidation(userCredential?.email).isValid
                  ? "parentClassValidated"
                  : "parentClassNotValidated"
              }
            />
          </div>
          <div className="formGroupUCF">
            <InputBox
              className="userCredentials"
              id="userPasswordID"
              onChangeValue={(event) => onChangeCredentials(event, "password")}
              value={userCredential?.password}
              type={showPassword ? "text" : "password"}
              imgSrc={showPassword ? hidden : visiblity}
              imageClick={() => {
                setShowPassword(!showPassword);
              }}
              imgSrcLeft={PasswordIcon}
              //  imageClickLeft={()=>imageClickLeft()}
              imageExtraStyle={{ width: "40px" }}
              placeholder="Password"
              name="password"
              //id={"password"+i}
              maxLength="20"
              parentClass={
                passwordValidation(userCredential?.password).isValid
                  ? "parentClassValidated"
                  : "parentClassNotValidated"
              }
            />
          </div>
          <div style={{ width: "15%" }}>
            <DropdownSaarthi
              droplist={propsForDropdown}
              selectedItem={(item) => onChangeCredentials(item, "role")}
              //  extraClassSelectedArea={'extraStyleClassUCF'}
              extraClassSelectedArea={"extraStyleSelectedAreaForm"}
              extraClassToBeSelectedArea={"extraStyleBeForm"}
              extraClassDropdownSearchArea={"extraSearchArea"}
            />
          </div>
          {/* <div style={{width:"15%"}} >
                        <DropdownSaarthi
                        droplist={propsForDropdown2}
                         selectedItem={(item)=>onChangeCredentials(item,'language')}
                        //  extraClassSelectedArea={'extraStyleClassUCF'}
                        extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
                        extraClassToBeSelectedArea={"extraStyleBeAbhi"}
                        extraClassDropdownSearchArea={"extraSearchArea"}
                        />
                    </div> */}
          <div style={{ width: "15%" }}>
            <MultiSelectDropdown
              options={options}
              toBeFilterData={[...langauge.split(",")]}
              extraSelectedClass="languageDropdown"
              getFilteredData={(value) => {
                return (
                  onChangeLanguge(value), onChangeCredentials(value, "language")
                );
              }}
              key="dispositionMultiSelectOne"
              selectedDataOutside={userCredential?.language}
              isDisable={
                props.disableFilterList?.includes("Disposition") ? true : false
              }
              extraPlaceHolderStyle="placeholderMultiStyleAgent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCredentialForm;

//export default UserCredentialForm;
