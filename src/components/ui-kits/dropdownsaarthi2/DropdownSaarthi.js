import React, { useState, useEffect, useRef } from "react";
import "./DropdownSaarthi.css";

//import MultiSelect from "../../../multiSelect/MultiSelect";

import SearchIcon from "../../../assets/searchIcon/searchIcon.svg";
import InputBox from "../InputBox/inputbox";

const DropdownSaarthi = (props) => {
  const { imgSrcLeft, imgSrcRight, placeHolderText, optionList, displayText } =
    props.droplist;
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    props?.defaultSelected || null
  );
  const [manualNumber, setManualNumber] = useState();
  const [greyBackgroundItem, setGreyBackgroundItem] = useState(false);
  const ref = useRef();

  //To close dropdown on click anywhere
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropdownShow && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownShow]);

  // function for hide and show dropdowm
  const hideAndShowDropdown = () => {
    let temp = isDropdownShow;
    temp = !temp;
    setIsDropdownShow(temp);
  };

  const handleClickSelecteItem = (item) => {
    let temp = item;
    setSelectedItem(temp);
    if (item === "Manual") {
    } else {
      setIsDropdownShow(false);
    }
    if (props.toast) {
      let toast = props.toast;
      return toast;
    }
  };

  const closeDropdown = () => {
    setIsDropdownShow(false);
  };

  // function for mannual ok button
  const sendMannualData = () => {
    props.mannualData(manualNumber);
    setIsDropdownShow(false);
  };

  useEffect(() => {
    props.selectedItem(selectedItem);
    setGreyBackgroundItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (props.editedItem && props.editedItem?.length > 0) {
      setSelectedItem(props.editedItem);
      // setGreyBackgroundItem(props.editedItem);
    }
  }, [props.editedItem]);

  return (
    <>
      <div className="dropdownTopDiv  dropdownJpWrapper" ref={ref}>
        <div
          className={`selecteditem
           ${props.isFilter ? "filter-section-drop" : ""}
            ${selectedItem ? "selectedValidated" : "selectedNotValidated"}
            ${props.extraClassSelectedArea ? props.extraClassSelectedArea : ""}
            `}
          onClick={() => hideAndShowDropdown()}
          // style={props.isCallDuration?{width:"220px"}:{width:"170px"}}
        >
          {imgSrcLeft ? (
            <img
              className="ImgSrcStyling"
              style={{ width: "17px" }}
              src={imgSrcLeft}
              alt="Dropdown left icon"
            />
          ) : (
            <p></p>
          )}
          {displayText ? (
            <p className={` ddSelectedItemPara`}>{displayText}</p>
          ) : (
            <p className={` ddSelectedItemPara`}>
              {selectedItem ? selectedItem : placeHolderText}
            </p>
          )}
          {imgSrcRight ? (
            <img
              className="ImgSrcStyling"
              src={imgSrcRight}
              alt="Dropdown left icon"
            />
          ) : (
            <p></p>
          )}
        </div>
        {isDropdownShow && (
          <div
            className={`dropdownToBeSelected  ${
              props.extraClassToBeSelectedArea
                ? props.extraClassToBeSelectedArea
                : ""
            }`}
          >
            {props.searchUi && (
              <div
                className={`dropdownSearchWrapper
              ${
                props.extraClassDropdownSearchWrapper
                  ? props.extraClassDropdownSearchWrapper
                  : ""
              }
              `}
              >
                <InputBox
                  className={`dropDownSearchInput
                  ${
                    props.extraClassDropdownSearchArea
                      ? props.extraClassDropdownSearchArea
                      : ""
                  }`}
                  type="text"
                  imgSrc={SearchIcon}
                  onChangeValue={(e) => props.handleSearchItem(e)}
                  imageClick={() => {}}
                />
              </div>
            )}
            <ul className={`dropdownUl  ${props.isFilter ? "filter-ul" : ""}`}>
              {optionList?.length > 0
                ? optionList.map((item, indx) => {
                    return (
                      <div key={indx}>
                        <li
                          className={`dropdownLi ${
                            greyBackgroundItem === item && props.selectedColor
                              ? props.selectedColor
                              : ""
                          }`}
                          onMouseEnter={
                            props.onMouseEnter ? props.onMouseEnter : null
                          }
                          onMouseLeave={
                            props.onMouseLeave ? props.onMouseLeave : null
                          }
                          key={item}
                          onClick={() => {
                            props.icons
                              ? handleClickSelecteItem(item.name)
                              : handleClickSelecteItem(item);
                          }}
                        >
                          <div>
                            {props.icons ? (
                              <div className="dropdownTopDiv">
                                <img
                                  className="dropdownImage"
                                  src={item.icon}
                                  alt="dropdown"
                                />
                                <span className="dropdownName">
                                  {" "}
                                  {item.name}{" "}
                                </span>
                              </div>
                            ) : (
                              <span className=""> {item} </span>
                            )}
                          </div>
                          {item == "Manual" && (
                            <>
                              <div style={{ display: "inline-block" }}>
                                <input
                                  style={{ width: "30px" }}
                                  onChange={(e) =>
                                    setManualNumber(e.target.value)
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  display: "inline-block",
                                  marginLeft: "8%",
                                }}
                              >
                                <button
                                  className="okBtnInside"
                                  onClick={() => sendMannualData()}
                                >
                                  ok
                                </button>
                              </div>{" "}
                            </>
                          )}
                        </li>
                      </div>
                    );
                  })
                : ""}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownSaarthi;
