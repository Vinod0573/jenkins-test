import React, { useEffect, useState } from "react";
import BFSIIcon from "../../assets/accountPageIcons/BFSIIcon.svg";
import BFSIIconwhite from "../../assets/accountPageIcons/BFSIIconwhite.svg";
import HealthCareIcon from "../../assets/accountPageIcons/HealthCare.svg";
import HealthCareWhite from "../../assets/accountPageIcons/HealthCareWhite.svg";
import TelecomIcon from "../../assets/accountPageIcons/Telecom.svg";
import TelecomIconcolor from "../../assets/accountPageIcons/TelecomColor.svg";
import ECommerceIcon from "../../assets/accountPageIcons/ECommerce.svg";
import EcommerceColor from "../../assets/accountPageIcons/EcommerceColor.svg";
import DomainComponent from "../../components/accountPageComponents/domainComponent/DomainComponent";
import ProjectCard from "../../components/accountPageComponents/projectCard/ProjectCard";
//import Inputbox from "../../components/ui-kits/InputBox/inputbox";
import SearchBox from "../../components/ui-kits/searchBox/SearchBox";
import SearchIcon from "../../assets/searchIcon/searchIcon.svg";
import "./Account.css";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import Create from "../../components/create/Create";
import AccountIcon from "../../assets/accountPageIcons/AccountLogo.svg";
import UserList from "../userListPage/UserList";
import {
  getAllAccountbyDomain,
  getAllProjectsbyAccount,
} from "../../actions/GetAllAccountbyDomianApiAction";
import { getAllAccountbyAccountName } from "../../actions/GetAllAccountByAccountNameApiAction";

import CreateAccountModal from "../../components/createAccountModal/CreateAccountModal";
import CreateAccount from "../createAccount/CreateAccount";
import Launching from "../../assets/accountPageIcons/Launching-2.svg";
import goBackIcon from "../../assets/goBackIcon/goBackIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderSaarthi from "../../components/loader/Loader";
import { getDomainNameData } from "../../actions/SelectDomainNameAction";
import AccountDetails from "../../components/accountPageComponents/accountDetails/AccountDetails";
import useDebounce from "../../components/hooks/useDebounce/UseDebounce";
import LogIn from "../logIn/LogIn";
import { chunkingMsgList } from "../../actions/NavigationComponentApiAction";
import { useHistory } from "react-router-dom";
function Account(props) {
  const [loader, setLoader] = useState(false);

  const [toGouserListPage, setToGoUserListPage] = useState(true);
  const [domainSelected, setDomainSelected] = useState();
  const [getAllAccount, setGetAllAccount] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDisabled, setShowDisabled] = useState(false);
  const [apiupdate, setApiupdate] = useState(false);
  // let staterData=store.select('accountName').subscribe((data) => staterData.accountNameState.accountName );
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  //All data from store
  const acccountName = useSelector(
    (store) => store.accountNameState.accountName
  );
  const domainName = useSelector((store) => store.domainNameState.domainName);
  // const domainName = useSelector(
  //   (store) => store.getAllAccountByDomainState.projectDetail.domain
  // );

  // console.log("domainnn", domainName);

  const AllAccountByDomain = useSelector(
    (store) => store.getAllAccountByDomainState.getAllAccountBydomain
  );
  const AllAccountByAccountNamedata = useSelector(
    (store) =>
      store.getAllAccountbyAccountNameApiState?.getAllAccountByAccountName
  );
  const domainNameSelectedPrev = useSelector(
    (store) => store.domainNameState.domainNamed
  );

  const allLogInData = useSelector((store) => store.loginState?.logInData);

  let defaultDomainName =
    allLogInData?.showDomains && allLogInData?.showDomains[0]?.name?.toString();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoader((prev) => true);
    dispatch(getDomainNameData(domainSelected));
  }, [domainSelected]);

  useEffect(async () => {
    //  console.log("lodder loadinng")
    setLoader(true);
    setShowDisabled(true);
    let res = await getAllAccountbyDomain(dispatch, domainSelected);
    if (res) {
      setLoader(false);
    }
    if (
      res !== undefined &&
      res.data !== undefined &&
      res.data.data !== undefined
    ) {
      setShowDisabled(false);
    }
  }, [domainSelected, apiupdate]);

  useEffect(() => {
    if (searchName?.length) {
      setGetAllAccount((prev) => AllAccountByAccountNamedata);
    } else {
      setGetAllAccount((prev) => AllAccountByDomain);
    }
  }, [AllAccountByDomain, AllAccountByAccountNamedata, searchName]);

  useEffect(async () => {
    if (searchName?.length) {
      setLoader(true);
      let res = await getAllAccountbyAccountName(
        dispatch,
        searchName,
        domainName
      );
      if (res) {
        setLoader(false);
      }
    }
  }, [searchName, domainName]);

  useEffect(() => {
    if (domainNameSelectedPrev == "") {
      setDomainSelected(defaultDomainName);
      dispatch(getDomainNameData(defaultDomainName));
    }
  }, [domainNameSelectedPrev, defaultDomainName]);

  const toComeOnAccountPage = () => {
    setToGoUserListPage((prev) => true);
  };
  // let history = useHistory();

  const onProjectPageLink = () => {
    history.push("/ProjectPage");
  };

  // console.log("lodder", loader, domainSelected, domainName);
  // let ArrayDomain = [
  //   {
  //     Icon: domainSelected === "BFSI" ? BFSIIcon : BFSIIconwhite,
  //     Name: "BFSI",
  //   },
  //   {
  //     Icon: domainSelected === "Health Care" ? HealthCareIcon : HealthCareWhite,
  //     Name: "Health Care",
  //   },
  //   {
  //     Icon: domainSelected === "Telecom" ? TelecomIconcolor : TelecomIcon,
  //     Name: "Telecom",
  //   },
  //   {
  //     Icon: domainSelected === "E-Commerce" ? EcommerceColor : ECommerceIcon,
  //     Name: "E-Commerce",
  //   },
  // ];
  // let card = [
  //   {
  //     Project: "2",
  //     Name: "Cred",
  //   },
  //   {
  //     Project: "3",
  //     Name: "Avail",
  //   },
  //   {
  //     Project: "1",
  //     Name: "Navi",
  //   },

  //   {
  //     Project: "2",
  //     Name: "Cred",
  //   },
  //   {
  //     project: "3",
  //     Name: acccountName,
  //   },
  // ];

  // const onClickSelectDomain = (data) => {
  //   setDomainSelected((prev) => data);
  // };
  useEffect(() => {
    if (domainName) {
      setDomainSelected((prev) => domainName);
    } else {
      setDomainSelected(defaultDomainName);
    }
  }, [domainName, defaultDomainName]);

  const selectedProject = (data) => {
    getAllProjectsbyAccount(dispatch, data, history);
  };
  const toBackAcc = () => {
    if (typeof props.toPrevPage === "function") {
      props.toPrevPage();
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    let defaultDomainName =
      allLogInData?.showDomains &&
      allLogInData?.showDomains[0]?.name?.toString();
    setDomainSelected(defaultDomainName);
  }, [allLogInData]);

  const handleSearchValue = (e) => {
    setSearchName(e.target.value);
  };
  const debounce = useDebounce(handleSearchValue, 1000);

  console.log(searchName);

  return (
    <div>
      {toGouserListPage ? (
        <div className="AccountWrapper">
          {/* <div className="gobackDiv">
            <img
              src={goBackIcon}
              className="goBackIcon"
              onClick={() => toBackAcc()}
            ></img>
          </div> */}
          <div className="headdingDiv">
            <p>Accounts</p>
          </div>
          <div className="">
            <SearchBox
              className="reportTableSearchInput"
              parentClass="InputeSearchBoxDiv"
              type="search"
              placeholder="Search Account"
              imgSrcLeft={SearchIcon}
              imageClickLeft={() => {}}
              onChangeValue={(e) => {
                debounce(e);
              }}

              // onKeyUp={() => handleOnKeyUp()}
              // imageClickLeft={() => imageClickLeft()}
            />
          </div>
          <div className="accountCreatTopDiv">
            <div
              className="accountIconDiv"
              onClick={() => setToGoUserListPage(false)}
            >
              <img src={AccountIcon} className="imgAccountIcon"></img>
            </div>
            <div
              className="createAccountDiv"
              onClick={() => setShowAccountModal(true)}
            >
              <Create
                createName="Account"
                styleCreateDiv="styleCreateDiv"
                stylePlusSign="stylePlusSign"
                styleCreateName="styleCreateName"
              />
            </div>
          </div>
          {showAccountModal ? (
            <div className="showModalBlur">
              <CreateAccountModal
                Icon={props.Icon}
                Name={domainSelected}
                onCancel={setShowAccountModal}
                apihited={(data) => setApiupdate(data)}
              />
            </div>
          ) : null}
          {
            // loader ? <LoaderSaarthi /> :
            allLogInData?.showDomains?.length > 0 ? (
              <AccountDetails
                loader={loader}
                showDisabled={showDisabled}
                domainSelected={domainSelected}
                getAllAccount={getAllAccount}
              />
            ) : (
              <div className="createNewAccountDiv">
                <p className="createNewAccountHeading">
                  Let’s get started, create an Account
                </p>
                <div className="createNewAccountImage">
                  <img src={Launching} alt="Create Account" />
                </div>
              </div>
            )
          }
        </div>
      ) : (
        <UserList toBackScreen={toComeOnAccountPage} />
      )}
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

export default Account;
