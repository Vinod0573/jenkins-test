import { useState, useRef, useEffect } from "react";
import DeleteUser from "../../assets/createUserTable/DeleteUser.svg";
//import DeleteUserDark from "../../assets/createUserTable/DeleteUserDark.svg";
import DropDownHeader from "../../assets/createUserTable/DropDownHeader.svg";
import DropDownBody from "../../assets/createUserTable/DropDownBody.svg";
import InputBox from "../ui-kits/inputboximg/InputBoxImg";
import HiddenIcon from "../../assets/createUserTable/HiddenIcon.png";
import VisibilityIcon from "../../assets/createUserTable/VisibilityIcon.png";
import Icon from "../ui-kits/Icon/icon";
import DropdownSaarthi from "../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import MultiSelectDropdown from "../ui-kits/multiselectdropdown/MultiSelectDropdown";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  roleValidation,
} from "../../utilities/Validation";
import ErrorMessage from "../error/ErrorMessage";
// import MultiSelectSimple from "../multiselectsimple/MultiSelectSimple";
// import SingleSelectDD from "../singleselectdd/SingleSelectDD";
import TickBlue from "../../assets/manualEditTable/TickBlue.svg";
import CloseBlue from "../../assets/manualEditTable/CloseBlue.svg";

export function TableConstants(
  handleInputChange,
  handleRemoveSpecificRow,
  handleSelectChangeSSD,
  handleSelectChangeMSSD,
  onChangeLanguage,
  dropDownOptions,
  dropDownOptionsSingle
  // handleDropDownSelectChange,
  // handleDropDownSelectChangeSingle,
  // handleDropDownSelectChangeOptions,
  // dropDownSelectedOptions,
  // dropDownSelectedOptionsSingle
) {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState([]);
  // const [isLangClicked, setLangClicked] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [InputShow, setInputShow] = useState(false);
  const [DropDownShow, setDropDownShow] = useState(true);
  // const [isLangVisible, setIsLangVisible] = useState(false);
  // const langRef = useRef(null);
  // const [isRoleVisible, setIsRoleVisible] = useState(false);
  // const roleRef = useRef(null);
  // const [isProjVisible, setIsProjVisible] = useState(false);
  // const projRef = useRef(null);

  const handleInputChanges = (e, id) => {
    handleInputChange(e, id);
  };

  const handleRemove = (id) => {
    handleRemoveSpecificRow(id);
  };

  const handleChangeSSD = (e, id) => {
    handleSelectChangeSSD(e, id);
  };

  const handleChangeMSSD = (e, credential, id) => {
    handleSelectChangeMSSD(e, credential, id);
  };

  const onChangeLang = (item) => {
    onChangeLanguage(item);
  };

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

  // const handleClickOutsideLang = (event) => {
  //   if (langRef.current && !langRef.current.contains(event.target)) {
  //     setIsLangVisible(false);
  //   }
  // };

  // const handleClickOutsideRole = (event) => {
  //   if (roleRef.current && roleRef.current.contains(event.target)) {
  //     setIsRoleVisible(false);
  //   } else {
  //     setIsRoleVisible(false);
  //   }
  // };

  // const handleClickOutsideProj = (event) => {
  //   if (projRef.current && !projRef.current.contains(event.target)) {
  //     setIsProjVisible(false);
  //     console.log("proj clciked", event.target);
  //   }
  // };

  // const handleHideDropdown = (event) => {
  //   if (event.key === "Escape") {
  //     setIsLangVisible(false);
  //     setIsRoleVisible(false);
  //     setIsProjVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("keydown", handleHideDropdown, true);
  //   document.addEventListener("click", handleClickOutsideRole, true);
  //   return () => {
  //     document.removeEventListener("keydown", handleHideDropdown, true);
  //     document.removeEventListener("click", handleClickOutsideRole, true);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleHideDropdown, true);
  //   document.addEventListener("click", handleClickOutsideLang, true);

  //   return () => {
  //     document.removeEventListener("keydown", handleHideDropdown, true);
  //     document.removeEventListener("click", handleClickOutsideLang, true);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleHideDropdown, true);
  //   document.addEventListener("click", handleClickOutsideProj, true);

  //   return () => {
  //     document.removeEventListener("keydown", handleHideDropdown, true);
  //     document.removeEventListener("click", handleClickOutsideProj, true);
  //   };
  // }, []);

  return [
    /* {
      title: <p>ID</p>,
      render: (rowData, id) => {
        return (
          <>
            <p>{rowData?.id}</p>
            {console.log(rowData?.id)}
          </>
        );
      },
    },
    */
    {
      title: (
        <div className="TableHeading" data-column="name">
          <p>Name</p>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <>
            <span>
              <InputBox
                className="UserInputText"
                type="text"
                value={rowData?.name}
                placeholder="Name"
                name="name"
                onChangeValue={(e) => {
                  handleInputChanges(e, id);
                  nameValidation(rowData?.name);
                }}
                readOnly={isReadOnly}
                onFocus={() => {
                  setIsNameFocused(id);
                  setIsReadOnly(false);
                }}
                onBlur={() => {
                  setIsNameFocused("");
                  setIsReadOnly(true);
                }}
              />
              {isNameFocused === id &&
              !nameValidation(rowData?.name).isValid ? (
                <ErrorMessage
                  errorMessage={nameValidation(rowData?.name).errors.message}
                />
              ) : null}
              {/* {console.log(rowData?.name)} */}
            </span>
          </>
        );
      },
    },

    {
      title: (
        <div className="TableHeading" data-column="email">
          <p>Email</p>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <span autocomplete="off">
            <InputBox
              className="UserInputText"
              type="email"
              onChangeValue={(e) => {
                handleInputChanges(e, id);
                emailValidation(rowData?.email);
              }}
              value={rowData?.email}
              placeholder="Email"
              name="email"
              readOnly={isReadOnly}
              onFocus={() => {
                setIsEmailFocused(id);
                setIsReadOnly(false);
              }}
              onBlur={() => {
                setIsEmailFocused("");
                setIsReadOnly(true);
              }}

              // autocomplete="false"
              // style="display:none;"
            />
            {isEmailFocused === id &&
            !emailValidation(rowData?.email).isValid ? (
              <ErrorMessage
                errorMessage={emailValidation(rowData?.email).errors.message}
              />
            ) : null}

            {/* {console.log(rowData?.email)} */}
          </span>
        );
      },
    },
    {
      title: (
        <div className="TableHeading" data-column="password">
          <p>Password</p>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <span>
            <InputBox
              className="UserInputText"
              type={showPassword.includes(id) ? "text" : "password"}
              onChangeValue={(e) => {
                handleInputChanges(e, id);
                passwordValidation(rowData?.password);
              }}
              value={rowData?.password}
              imgSrc={showPassword.includes(id) ? HiddenIcon : VisibilityIcon}
              imageClick={() => handleClickEyeIcon(id)}
              placeholder="Password"
              name="password"
              imageSrcExtraStyle={{ width: "18px", marginLeft: "5px" }}
              //maxLength="20"
              readOnly={isReadOnly}
              onFocus={() => {
                setIsPasswordFocused(id);
                setIsReadOnly(false);
              }}
              onBlur={() => {
                setIsPasswordFocused("");
                setIsReadOnly(true);
              }}
              // autocomplete="new-password"
            />
            {isPasswordFocused === id &&
            !passwordValidation(rowData?.password).isValid ? (
              <ErrorMessage
                errorMessage={
                  passwordValidation(rowData?.password).errors.message
                }
              />
            ) : null}
          </span>
        );
      },
    },

    {
      title: (
        // <div ref={langRef}>
        <div>
          <div
            className="TableHeading"
            data-column="language"
            //onClick={() => setIsLangVisible(!isLangVisible)}
          >
            <p
              style={{ paddingRight: "10px", whiteSpace: "nowrap" }}
              className="titlePara"
            >
              Language
            </p>
            {/* <img
              src={DropDownHeader}
              className="clickAbleCursorPointerU"
              alt="DropDownIcon"
              // style={{ cursor: "pointer" }}
            /> */}
          </div>

          {/* {isLangVisible && (
            <div className="multiSelectDropDownContainer LangOptionsDiv">
              <MultiSelectSimple
                options={dropDownOptions.language}
                setDataOut={(selectedData) =>
                  handleDropDownSelectChange(selectedData, "language")
                }
                defaultSelected={dropDownSelectedOptions.language}
                extraClassWrapper="extraClassMultiSelectWrapperCreate"
              />
              <div
                className="footer-icons"
                style={{ backgroundColor: "white" }}
              >
                <img
                  className="closeblue"
                  src={CloseBlue}
                  onClick={(e) => {
                    setIsLangVisible((prev) => false);
                  }}
                  alt=""
                  style={{ width: "12px", cursor: "pointer" }}
                />
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#0174ff",
                    fontSize: "1.5em",
                  }}
                >
                  |
                </p>
                <img
                  className="closetick"
                  onClick={(e) => setIsLangVisible((prev) => false)}
                  src={TickBlue}
                  alt=""
                  style={{ width: "17px", cursor: "pointer" }}
                />
              </div>
            </div>
                )}*/}
        </div>
      ),

      render: (rowData, id) => {
        return (
          <span>
            <div>
              {DropDownShow && (
                <MultiSelectDropdown
                  options={{
                    imgSrcRight: DropDownBody,
                    placeHolderText: rowData?.language?.length ? (
                      rowData?.language?.[0] +
                      (rowData?.language?.length > 1
                        ? "+" + (rowData?.language?.length - 1)
                        : "")
                    ) : (
                      <span style={{ color: "#757575" }}>{"Language"}</span>
                    ),
                    iconTick: TickBlue,
                    iconCancel: CloseBlue,
                  }}
                  // onChangeValue={(e) => {
                  //   handleInputChanges(e, id);
                  // }}
                  getFilteredData={(value) => {
                    onChangeLang(value);
                    handleChangeMSSD(value, "language", id);
                    // setLangClicked(true);
                  }}
                  // clearDropDown={() => {
                  //   handleChangeMSSD([], "language", id);
                  //   // setLangClicked(false);
                  // }}
                  toBeFilterData={dropDownOptions.language}
                  selectedDataOutside={rowData?.language}
                  // extraPlaceHolderStyle={
                  //   isLangClicked ? "selected-data" : "extraPlaceHolderStyle"
                  // }
                  extraClassImage={"extraClassImage"}
                  // isHideAllCheckbox
                />
              )}
              {InputShow && (
                <InputBox
                  className="UserInputText"
                  type="text"
                  onChangeValue={(e) => {
                    handleInputChanges(e, id);
                  }}
                  value={rowData?.language}
                  placeholder={
                    rowData?.language?.length
                      ? rowData?.language?.[0] +
                        (rowData?.language?.length > 1
                          ? "+" + (rowData?.language?.length - 1)
                          : "")
                      : "Language"
                  }
                  name="language"
                />
              )}
            </div>
          </span>
        );
      },
    },
    {
      title: (
        // <div ref={roleRef}>
        <div>
          <div
            className="TableHeading"
            data-column="role"
            //onClick={() => setIsRoleVisible(!isRoleVisible)}
          >
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Role</p>
            {/* <img
              src={DropDownHeader}
              className="clickAbleCursorPointerU"
              alt="DropDownIcon"
              // style={{ cursor: "pointer" }}
            /> */}
          </div>

          {/* {isRoleVisible && (
            <div className="multiSelectDropDownContainer SingleOptionsDiv">
              <SingleSelectDD
                options={dropDownOptionsSingle.role}
                dataOutSide={setSelectedRole}
                defaultSelected={selectedRole}
                onClick={() => {
                  setIsRoleVisible(!isRoleVisible);
                }}
                extraClassWrapper="extraClassMultiSelectWrapper"
              />

            </div>
          )} */}
        </div>
      ),
      render: (rowData, id) => {
        return (
          <span>
            <div>
              {DropDownShow && (
                <>
                  <DropdownSaarthi
                    droplist={{
                      optionList: dropDownOptionsSingle.role,
                      placeHolderText: rowData?.role?.length ? (
                        rowData?.role
                      ) : (
                        <span style={{ color: "#757575" }}>{"Role"}</span>
                      ),
                      imgSrcLeft: "",
                      imgSrcRight: DropDownBody,
                    }}
                    selectedItem={(item) => {
                      handleChangeSSD(item, id);
                      //roleValidation(rowData?.role);
                    }}
                    extraClassSelectedArea={"extraStyleSelectedAreaAbhi"}
                    extraClassToBeSelectedArea={"extraStyleBeAbhi"}
                    extraClassDropdownSearchArea={"extraSearchArea"}
                    selectedColor={"greybg"}
                  />
                  {/* {isRoleFocused && !roleValidation(rowData?.role).isValid ? (
                    <ErrorMessage
                      errorMessage={
                        roleValidation(rowData?.role).errors.message
                      }
                    />
                  ) : (
                    ""
                  )} */}
                </>
              )}

              {InputShow && (
                <InputBox
                  className="UserInputText"
                  type="text"
                  onChangeValue={(e) => {
                    handleInputChanges(e, id);
                  }}
                  value={rowData?.role}
                  placeholder={rowData?.role?.length ? rowData?.role : "Role"}
                  name="role"
                />
              )}
            </div>
          </span>
        );
      },
    },
    // {
    //   title: (
    //     <div ref={projRef}>
    //       <div
    //         className="TableHeading"
    //         data-column="project"
    //         onClick={() => setIsProjVisible(!isProjVisible)}
    //       >
    //         <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
    //           Project
    //         </p>
    //         <img
    //           src={DropDownHeader}
    //           className="clickAbleCursorPointerU dropDownIcon"
    //           alt="DropDownIcon"
    //           style={{ cursor: "pointer" }}
    //           onClick={(e) => handleDropDownClick(e)}
    //         />
    //       </div>
    //       {
    //         //dropDownVisible === "project" && (
    //         isProjVisible && (
    //           <div
    //             className="multiSelectDropDownContainer ProjOptionsDiv"
    //             //ref={dropdownRef}
    //           >
    //             {/*<MultiSelectSimple
    //               options={ProjectOptions}
    //               setDataOut={setProjOptionsSelected}
    //               onClick={() => {
    //                 setProjMSDDShow((...prev) => true);
    //               }}
    //               extraClassWrapper="extraClassMultiSelectWrapper"
    //             />
    //             {console.log("proj selected", projOptionsSelected)}*/}
    //             <MultiSelectSimple
    //               options={dropDownOptions.project}
    //               setDataOut={(selectedData) =>
    //                 handleDropDownSelectChange(selectedData, "project")
    //               }
    //               defaultSelected={dropDownSelectedOptions.project}
    //               extraClassWrapper="extraClassMultiSelectWrapperCreate"
    //             />
    //           </div>
    //         )
    //       }
    //     </div>
    //   ),
    //   render: (rowData, id) => {
    //     return (
    //       <span>
    //         <div>
    //           {DropDownShow && (
    //             /* <div className="Drop">*/
    //             <MultiSelectDropdown
    //               options={{
    //                 imgSrcRight: DropDownBody,
    //                 placeHolderText: rowData?.project?.length
    //                   ? rowData?.project?.[0] +
    //                     (rowData?.project?.length > 1
    //                       ? "+" + (rowData?.project?.length - 1)
    //                       : "")
    //                   : "Project",
    //               }}
    //               getFilteredData={(value) =>
    //                 handleChangeMSSD(value, "project", id)
    //               }
    //               toBeFilterData={ProjectOptions}
    //               extraClassImage={"extraClassImage"}
    //               extraPlaceHolderStyle={"extraPlaceHolderStyle"}
    //               extraSelectedClass={"extraSelectedClass"}
    //             />
    //             /*<img
    //                 src={DropDownHeader}
    //                 className="clickAbleCursorPointerU dropDownIcon"
    //                 alt="DropDownIcon"
    //               />
    //             </div>*/
    //           )}
    //           {InputShow && (
    //             <InputBox
    //               className="UserInputText"
    //               type="text"
    //               onChangeValue={(e) => {
    //                 handleInputChanges(e, id);
    //               }}
    //               value={rowData?.project}
    //               placeholder={
    //                 rowData?.project?.length
    //                   ? rowData?.project?.[0] +
    //                     (rowData?.project?.length > 1
    //                       ? "+" + (rowData?.project?.length - 1)
    //                       : "")
    //                   : "Project"
    //               }
    //               name="project"
    //             />
    //           )}
    //         </div>
    //       </span>
    //     );
    //   },
    // },
    {
      title: (
        <div className="TableHeading" data-column="delete">
          <p>Delete</p>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <>
            {rowData ? (
              <Icon
                img_src={DeleteUser}
                onClick={() => handleRemove(id)}
                extraClass={"DeleteUserIcon"}
                alt="DeleteUserIcon"
                disabled={!rowData}
              />
            ) : null}
          </>
        );
      },
    },
  ];
}

//export default TableConstants;
