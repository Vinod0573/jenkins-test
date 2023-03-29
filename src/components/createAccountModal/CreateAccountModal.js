import React, { useEffect, useState } from "react";
import DomainComponent from "../accountPageComponents/domainComponent/DomainComponent";
import Button from "../button/button";
import DropdownSaarthi from "../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import Inputbox from "../ui-kits/InputBox/inputbox";
import "./CreateAccountModal.css";
import HealthCare from "../../assets/accountPageIcons/HealthCare.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAccountNameData } from "../../actions/AccountNameActions";
import { getButtonData } from "../../actions/AccountApiAction";
import BFSIIcon from "../../assets/SelectDomain/BFSI.svg";
import BFSIIconwhite from "../../assets/createAccount/bfsi.svg";
import ActiveBFSIIcon from "../../assets/createAccount/bfsiWhite.svg";
import TelecomIcon from "../../assets/SelectDomain/Telecom.svg";
import TelecomWhiteIcon from "../../assets/createAccount/telecome.svg";
import ActiveTelecomIcon from "../../assets/createAccount/telecomeWhite.svg";
import ECommerceIcon from "../../assets/SelectDomain/E-Commerce.svg";
import ECommerceWhiteIcon from "../../assets/createAccount/e-commerce.svg";
import ActiveECommerceIcon from "../../assets/createAccount/e-commerceWhite.svg";
import HealthCareIcon from "../../assets/SelectDomain/HealthCare.svg";
import HealthCareWhite from "../../assets/createAccount/healthcare.svg";
import ActiveHealthCareIcon from "../../assets/createAccount/healthcareWhite.svg";
import DropdownIcon from "../../assets/AsrspecificViewIcons/dropdownIcon.svg";
import { getAllAccountbyDomain } from "../../actions/GetAllAccountbyDomianApiAction";
import { getDomainNameData } from "../../actions/SelectDomainNameAction";
import { getAllDomain } from "../../actions/SelectDomainApiAction";
import ErrorMessage from "../error/ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAccountModal(props) {
  const [name, setName] = useState();
  const [tittleName, setTittleName] = useState();
  const [icon, setIcon] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState();
  const [changeIcon, setChangeIcon] = useState(BFSIIcon);
  const [domainName, setDomainName] = useState("BFSI");
  const [isShown, setIsShown] = useState(false);

  const acccountNameByStore = useSelector(
    (store) => store.accountNameState?.accountName
  );
  const allLogInData = useSelector((store) => store.loginState?.logInData);
  const icons = {
    "E-Commerce": ECommerceIcon,
    "Health Care": HealthCareIcon,
    BFSI: BFSIIcon,
    Telecom: TelecomIcon,
  };
  let DomainArr = allLogInData?.showDomains?.map((e) => {
    return {
      Icon: icons[e.name],
      Name: e.name,
    };
  });
  // console.log(DomainArr, "nithin domain");
  // let DomainArr = [
  //   {
  //     Icon: ECommerceIcon,
  //     Name: "E-Commerce",
  //   },
  //   {
  //     Icon: HealthCareIcon,
  //     Name: "Health Care",
  //   },
  //   {
  //     Icon: BFSIIcon,
  //     Name: "BFSI",
  //   },

  //   {
  //     Icon: TelecomIcon,
  //     Name: "Telecom",
  //   },
  // ];
  useEffect(() => {
    DomainArr.map((e) => {
      if (e.Name === props.Name) {
        setIcon((prev) => e.Icon);
      }
    });
    // console.log("nithin", props.Name);
  }, [props.Name]);

  useEffect(() => {
    getAllDomain(dispatch);
  }, []);

  const arr = {
    imgSrcLeft: "",
    imgSrcRight: "",
    placeHolderText: "dropdown",
  };

  const onClickCancel = () => {
    props.onCancel(false);
  };
  const dispatch = useDispatch();
  const sendNametoRedux = () => {
    dispatch(getAccountNameData(name));
    dispatch(getDomainNameData(domainName));
  };
  const postCreateAccount = () => {
    if (name?.length) {
      let data = {
        name: name,
        // "description": null,
        domain: domainName,
        type: "External",
      };
      getButtonData(data).then((res) => {
        if (res.data) {
          getAllAccountbyDomain(dispatch, domainName);
        }
      });
      props.apihited((prev) => !prev);
      props.onCancel(false);
    }
    setErrorMsg((prev) => true);
  };
  const iconsDropdown = {
    "E-Commerce": isShown ? ActiveECommerceIcon : ECommerceWhiteIcon,
    "Health Care": isShown ? ActiveHealthCareIcon : HealthCareWhite,
    BFSI: isShown ? ActiveBFSIIcon : BFSIIconwhite,
    Telecom: isShown ? ActiveTelecomIcon : TelecomWhiteIcon,
  };
  let dropdownArr = allLogInData?.showDomains?.map((e) => {
    return {
      icon: iconsDropdown[e.name],
      name: e.name,
    };
  });
  // let dropdownArr = [
  //   {
  //     name: "E-Commerce",
  //     icon: isShown ? ActiveECommerceIcon : ECommerceWhiteIcon,
  //   },
  //   {
  //     name: "Health Care",
  //     icon: isShown ? ActiveHealthCareIcon : HealthCareWhite,
  //   },
  //   {
  //     name: "BFSI",
  //     icon: isShown ? ActiveBFSIIcon : BFSIIconwhite,
  //   },

  //   {
  //     name: "Telecom",
  //     icon: isShown ? ActiveTelecomIcon : TelecomWhiteIcon,
  //   },
  // ];

  const dropdownList = {
    optionList: dropdownArr,
    imgSrcLeft: "",
    imgSrcRight: DropdownIcon,
    placeHolderText: "BFSI",
  };

  const OnChangeDropdown = (item) => {
    if (item) {
      setSelectedDropdown((prev) => item);
      setDomainName((prev) => item);
    } else {
      setSelectedDropdown((prev) => "BFSI");
      setDomainName((prev) => "BFSI");
      // dispatch(getDomainNameData("BFSI"))
    }
    if (item === "BFSI") {
      setChangeIcon(BFSIIcon);
    } else if (item === "Health Care") {
      setChangeIcon(HealthCareIcon);
    } else if (item === "Telecom") {
      setChangeIcon(TelecomIcon);
    } else if (item === "E-Commerce") {
      setChangeIcon(ECommerceIcon);
    }
  };

  return (
    <div className="AccountModalWrapper">
      <div className="CreateAccountmodal-div">
        <div className="dropdownDiv">
          <img className="dropdownIcondiv" src={changeIcon} />
          <DropdownSaarthi
            droplist={dropdownList}
            icons={true}
            selectedItem={(item) => OnChangeDropdown(item)}
            defaultSelected={props.Name}
            extraClassSelectedArea="dropdownExtraStyle"
            extraClassToBeSelectedArea="dropdownExtraClassToBeSelected"
            // onMouseEnter={() => setIsShown(true)}
            // onMouseLeave={() => setIsShown(false)}
            // extraClassDropdownSearchArea={"dropdownExtraStyle"}
          />
          {/* <DomainComponent
               extraStyleOuter = "DomainOuterDiv"
               extraStyleIcon = "IconDiv"
               extraStyleIconImg = "IconImg"
               Icon = {icon}
                Name = {props.Name} /> */}
        </div>
        <div className="heading-div">Create Account</div>
        <div className="input-container-div">
          <input
            type="text"
            className="input-div"
            placeholder="Enter Account Name"
            onChange={(e) => {
              return setName(e.target.value), setErrorMsg(false);
            }}
          />
        </div>
        {errorMsg ? (
          <div className="errorMessageLP">
            <ErrorMessage errorMessage="Please Enter Account Name" />
          </div>
        ) : (
          ""
        )}
        <div className="button-container-div">
          {/* <Button
               text="Create Account"
               extraClass="CreateAccount-btn"
            //    onClick={() => handleClickRunDownloadData()}
            /> */}
          <button
            className="CreateAccount-btn"
            onClick={() => {
              return sendNametoRedux(), postCreateAccount();
            }}
          >
            {" "}
            Create Account
          </button>
          {/* <Button
               text="cancel"
               extraClass=""/> */}
          <button className="Cancel-btn" onClick={() => onClickCancel()}>
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={true}
      />
    </div>
  );
}

export default CreateAccountModal;
