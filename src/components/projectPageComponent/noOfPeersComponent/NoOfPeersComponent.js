import "./NoOfPeersComponent.css";
import DropdownSaarthi from "../../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import React, { useState, useEffect } from "react";
import NoOfPeersIcon from "../../../assets/projectPageIcon/NoOfPeersIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NoOfPeers = (props) => {
  let Droparr = [0, 3, 5, 7];
  const [selectedDropdown, setSelectedDropdown] = useState(0);
  const displayValue = (
    <div>
      <span>
        No. of peers:&nbsp;
        <span className="SelectedNumber">
          {selectedDropdown ? selectedDropdown : 0}
        </span>
      </span>
    </div>
  );

  const dropdownList = {
    optionList: Droparr,
    imgSrcLeft: NoOfPeersIcon,
    placeHolderText: "No. of peers: 0",
    displayText: displayValue,
  };

  const OnChangeDropdown = (item) => {
    setSelectedDropdown(() => item);
    props?.setPeers(item);
    item && toast.success(`${item} Peers selected for the review`);
  };

  return (
    <div className="NoOfPeersDropDown">
      <DropdownSaarthi
        droplist={dropdownList}
        placeHolderText={dropdownList.placeHolderText}
        displayText={"No. of peers: 0"}
        selectedItem={(item) => OnChangeDropdown(item)}
        extraClassSelectedArea={"extraStyleSelectedOption"}
        extraClassToBeSelectedArea={"extraStyleForSelect"}
        extraClassDropdownSearchArea={"extraSearchStyle"}
        // toast={
        //   selectedDropdown === 3 ||
        //   selectedDropdown === 5 ||
        //   selectedDropdown === 7
        //     ? toast.success(`${selectedDropdown} Peers selected for the review`)
        //     : ""
        // }
      />
    </div>
  );
};
