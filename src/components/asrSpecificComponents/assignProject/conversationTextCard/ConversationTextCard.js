import React, { useEffect, useState } from "react";
import "./ConversationTextCard.css";
import editIcon from "../../../../assets/AsrspecificViewIcons/EditIcon.svg";
import saveIcon from "../../../../assets/AsrspecificViewIcons/SaveIcon.svg";
import dropdownIcon from "../../../../assets/dropdownIcon.svg";
import languageIcon from "../../../../assets/AsrspecificViewIcons/translateActive.svg";

import { useDispatch, useSelector } from "react-redux";
import DropdownCheck from "../../../../pages/dropdownCheck";
import DropdownSaarthi from "../../../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import { setSelectedMessageDetails } from "../../../../actions/GetAllConversationApiAction";
import MultiSelectDropdown from "../../../ui-kits/multiselectdropdown/MultiSelectDropdown";
import { useHistory } from "react-router-dom";
function ConversationTextCard(props) {
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [selectedDropdown, setSelectedDropdown] = useState();
  const [languageList, setLanguageList] = useState([]);
  const [id, setId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [inputList, setInputList] = useState([
    {
      language: "",
      accountName: "",
      name: "",
      password: "",
      role: "",
      email: "",

      isActive: true,
    },
  ]);

  const allLanguageList = useSelector(
    (store) => store.assignProjectDataState.allLangaugeList
  );
  const [dropdownList, setDropdownList] = useState({
    optionList: languageList,
    imgSrcRight: dropdownIcon,
    placeHolderText: "language",
  });

  const selectedMessage = useSelector(
    (store) => store.getAllConversationApiState.getSelectedData
  );

  // console.log("allLang", allLanguageList);
  useEffect(() => {
    if (props.responsedata?.id) {
      setId(props.responsedata.id);
    }
  }, [props.responsedata]);

  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  useEffect(() => {
    if (allLanguageList?.length > 0) {
      const tempLanList = allLanguageList.map((item, i) => {
        return item.name;
      });
      setDropdownList((prev) => {
        return {
          ...prev,
          optionList: tempLanList,
        };
      });
    }
  }, [allLanguageList]);

  const OnChangeDropdown = (item) => {
    setSelectedDropdown((prev) => item);
  };

  const ChangeToInput = (data) => {
    let temp = isEdit;
    setIsEdit((prev) => !temp);
    if (temp) {
      props.updateMessage(message, props.responsedata.id);
    } else {
      props.checkEditClick();
    }
    if (data) {
      props.isInprogress(true);
    } else {
      props.disableNextPrevButton();
    }
  };

  const handleChange = (e, id) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    let temp =
      props.responsedata.updatedText &&
      props.responsedata.updatedText?.length > 0
        ? props.responsedata.updatedText
        : props.responsedata.text;
    setMessage(temp);
  }, [props.responsedata.text]);

  const onChangeLanguge = (item) => {
    setSelectedLanguage((prev) => item);
  };

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
  const language = sessionStorage.getItem("language");
  return (
    <div
      className="ConversationTextCardWrapper"
      onClick={() => {
        props.setAudio(props.responsedata.audioUrl, props.responsedata);
      }}
    >
      <div
        className={`ConversationTextcardDiv ${
          id && id?.length > 0 && id == selectedMessage?.id
            ? "ActiveMessage"
            : ""
        } ${
          props.extraStyleConversationCard?.props.extraStyleConversationCard
        }`}
      >
        <div className="landropdownjp">
          {id &&
            id?.length > 0 &&
            id == selectedMessage?.id &&
            props.showLanguage && (
              <div className=" dropdownareajplan">
                <img
                  className="lang-image"
                  src={languageIcon}
                  alt="language icon"
                />
                {/* <DropdownSaarthi
              droplist={dropdownList}
              placeHolderText={
                selectedDropdown ? selectedDropdown : " -select-"
              }
              loading={() => false}
              selectedItem={(item) => OnChangeDropdown(item)}
              extraClassSelectedArea={"extraStyleSfObject"}
              extraClassToBeSelectedArea={"dropdownStyling"}
              extraClassDropdownSearchArea={"searchIconStyle"}
            /> */}
                <MultiSelectDropdown
                  options={{
                    imgSrcRight: "",
                    imgSrcleft: "",
                    placeHolderText: inputList?.[0]?.language?.length
                      ? inputList?.[0]?.language?.[0] +
                        (inputList?.[0]?.language?.length > 1
                          ? "+" + inputList?.[0]?.language?.length
                          : "")
                      : "Select",
                  }}
                  toBeFilterData={[...language.split(",")]}
                  extraSelectedClass={
                    inputList?.[0]?.language?.length
                      ? "languageDropdown"
                      : "languageDropdownNotValid"
                  }
                  getFilteredData={(value) => {
                    return (
                      onChangeLanguge(value),
                      onChangeCredentials(value, "language", 0)
                    );
                  }}
                  key="dispositionMultiSelectOne"
                  isDisable={false}
                  extraPlaceHolderStyle="placeholderMultiStyleAgent"
                />
              </div>
            )}
          <div>
            {isEdit ? (
              <div
                className="msg-btn"
                onClick={() => {
                  ChangeToInput("save");
                }}
              >
                {/* <div> <DropdownCheck /></div> */}
                <div>
                  <img src={saveIcon}></img>
                </div>
              </div>
            ) : (
              <div
                className="msg-btn"
                onClick={() => {
                  ChangeToInput();
                }}
              >
                {/* <div> <DropdownCheck /> </div> */}
                <div>
                  <img src={editIcon}></img>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="IconContainerDiv"></div> */}
        {props.textChanges ? (
          <div className="TextContainerDiv">
            <div>
              <p className="Textpara m-text"> {props.responsedata.text}</p>
              <p className="Textpara up-m-text">
                {props.responsedata.updatedText}
              </p>
            </div>
          </div>
        ) : (
          <div className="TextContainerDiv">
            {isEdit ? (
              <div className="input-div">
                <textarea
                  className="input-data"
                  value={message}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            ) : (
              <div>
                <p className="Textpara">{message}</p>
                <p className="Textpara"> </p>
              </div>
            )}
            {/* <div> <DropdownCheck /></div> */}
            {/* {isEdit ? (
              <div
                className="msg-btn"
                onClick={() => {
                  ChangeToInput();
                }}
              >

                <div>
                  <img src={saveIcon}></img>
                </div>
              </div>
            ) : (
              <div
                className="msg-btn"
                onClick={() => {
                  ChangeToInput();
                }}
              >
                <div>
                  <img src={editIcon}></img>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversationTextCard;
