import React, { useEffect, useState } from "react";
import BFSIIcon from "../../../assets/accountPageIcons/BFSIIcon.svg";
import BFSIIconwhite from "../../../assets/accountPageIcons/BFSIIconwhite.svg";
import HealthCareIcon from "../../../assets/accountPageIcons/HealthCare.svg";
import HealthCareWhite from "../../../assets/accountPageIcons/HealthCareWhite.svg";
import TelecomIcon from "../../../assets/accountPageIcons/Telecom.svg";
import TelecomIconcolor from "../../../assets/accountPageIcons/TelecomColor.svg";
import ECommerceIcon from "../../../assets/accountPageIcons/ECommerce.svg";
import EcommerceColor from "../../../assets/accountPageIcons/EcommerceColor.svg";
import DomainComponent from "../domainComponent/DomainComponent";
import ProjectCard from "../projectCard/ProjectCard";
import "./AccountDetails.css";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllAccountbyDomain,
  getAllProjectsbyAccount,
} from "../../../actions/GetAllAccountbyDomianApiAction";
import { getAllAccountbyAccountName } from "../../../actions/GetAllAccountByAccountNameApiAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderSaarthi from "../../loader/Loader";
import { getDomainNameData } from "../../../actions/SelectDomainNameAction";

function AccountDetails(props) {
  const [domainSelected, setDomainSelected] = useState("");
  const [loader, setLoader] = useState(props.loader);

  const AllAccountByDomain = useSelector(
    (store) => store.getAllAccountByDomainState.getAllAccountBydomain
  );
  const domainNameSelectedPrev = useSelector(
    (store) => store.domainNameState.domainNamed
  );
  const domainName = useSelector((store) => store.domainNameState.domainName);
  useEffect(() => {
    if (domainName) {
      setDomainSelected((prev) => domainName);
    }
  }, [domainName]);

  const allLogInData = useSelector((store) => store.loginState?.logInData);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    let defaultDomainName = allLogInData?.showDomains[0]?.name?.toString();
    setDomainSelected(defaultDomainName);
  }, []);

  // let ArrayDomain = [
  //     {
  //       Icon: domainSelected === "BFSI" ? BFSIIcon : BFSIIconwhite,
  //       Name: "BFSI",
  //     },
  //     {
  //       Icon: domainSelected === "Health Care" ? HealthCareIcon : HealthCareWhite,
  //       Name: "Health Care",
  //     },
  //     {
  //       Icon: domainSelected === "Telecom" ? TelecomIconcolor : TelecomIcon,
  //       Name: "Telecom",
  //     },
  //     {
  //       Icon: domainSelected === "E-Commerce" ? EcommerceColor : ECommerceIcon,
  //       Name: "E-Commerce",
  //     },
  //   ];

  const onClickSelectDomain = (data) => {
    setDomainSelected((prev) => data);
    // getAllAccountbyDomain(dispatch , data);
    dispatch(getDomainNameData(data));
    getAllAccountbyDomain(dispatch, data);
  };

  const selectedProject = (data) => {
    getAllProjectsbyAccount(dispatch, data, history);
  };

  useEffect(() => {
    if (domainNameSelectedPrev == "") {
      let defaultDomainName = allLogInData?.showDomains[0]?.name?.toString();
      setDomainSelected(defaultDomainName);
      dispatch(getDomainNameData(defaultDomainName));
    }
  }, [domainNameSelectedPrev]);

  return (
    <div className="AccountDetailsTopDiv">
      <div>
        <div className="DomainSelectDiv">
          {allLogInData?.showDomains?.map((e, index) => {
            return (
              <div
                onClick={() => {
                  if (props.showDisabled == false) {
                    onClickSelectDomain(e.name);
                  }
                }}
                key={index}
              >
                <DomainComponent
                  Icon={
                    domainSelected === e.name
                      ?`${e.whiteImageUrl}?${process.env.REACT_APP_ACCESS_TOKEN_CAMPAIGNUPLOAD}`
                      : `${e.blackImageUrl}?${process.env.REACT_APP_ACCESS_TOKEN_CAMPAIGNUPLOAD}`
                  }
                  Name={e.name}
                  disabled={props.showDisabled}
                  HighLight={domainSelected === e.name ? `HighLight` : null}
                  extraStyleOuter={`domainExtraStyleL`}
                />
              </div>
            );
          })}
        </div>
        <div className="cardContainerOuterDiv">
          <div className="cardContainerDiv">
            {props.loader ? (
              <div className="loderAcc">
                <LoaderSaarthi />{" "}
              </div>
            ) : props.getAllAccount?.length ? (
              props.getAllAccount.map((e, index) => {
                return (
                  <div className="cardInnerOnly" key={index}>
                    <ProjectCard
                      projects={e.projects}
                      Name={e.name}
                      projectData={e}
                      getSelectedProject={(data) => {
                        selectedProject(data);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <p className="paraData"> Data not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
