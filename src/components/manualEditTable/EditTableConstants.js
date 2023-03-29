import { useState, useRef, useEffect } from "react";
import DeleteUser from "../../assets/manualEditTable/DeleteUser.svg";
import DropDownHeader from "../../assets/manualEditTable/DropDownHeader.svg";
import DropDownBody from "../../assets/manualEditTable/DropDownBody.svg";
import InputBox from "../ui-kits/inputboximg/InputBoxImg";
import Icon from "../ui-kits/Icon/icon";
import DropdownSaarthi from "../ui-kits/dropdownsaarthi2/DropdownSaarthi";
import MultiSelectDropdown from "../ui-kits/multiselectdropdown/MultiSelectDropdown";
import { emailValidation, nameValidation } from "../../utilities/Validation";
import ErrorMessage from "../error/ErrorMessage";
import TickBlue from "../../assets/manualEditTable/TickBlue.svg";
import CloseBlue from "../../assets/manualEditTable/CloseBlue.svg";

export function EditTableConstants(
  handleInputChange,
  handleRemoveSpecificRow,
  handleSelectChangeSSD,
  handleSelectChangeMSSD,
  onChangeLanguage,
  dropDownOptions,
  dropDownOptionsSingle
  // handleInputChange,
  // handleRemoveSpecificRow,
  // handleSelectChangeSSD,
  // handleSelectChangeMSSD,
  // onChangeLanguage,
  // dropDownOptions,
  // dropDownOptionsSingle,
  // dropDownSelectedOptions,
  // handleDropDownSelectChange,
  // handleDropdownCloseClick
) {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [DropDownShow, setDropDownShow] = useState(true);

  const handleInputChanges = (e, id) => {
    handleInputChange(e, id);
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

  const handleRemove = (id, rowData, manualEdit) => {
    handleRemoveSpecificRow(id, rowData);
  };

  return [
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
                value={rowData?.name?.length ? rowData?.name : ""}
                placeholder="Name"
                name="name"
                onChangeValue={(e) => {
                  handleInputChanges(e, id);
                }}
                onFocus={() => {
                  setIsNameFocused(id);
                }}
                onBlur={() => {
                  setIsNameFocused("");
                }}
              />

              {isNameFocused === id &&
              !nameValidation(rowData?.name).isValid ? (
                <ErrorMessage
                  errorMessage={nameValidation(rowData?.name).errors.message}
                />
              ) : null}
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
          <span>
            <InputBox
              className="UserInputText"
              type="text"
              onChangeValue={(e) => {
                handleInputChanges(e, id);
              }}
              value={rowData?.email}
              placeholder="Email"
              name="email"
              onFocus={() => {
                setIsEmailFocused(id);
              }}
              onBlur={() => {
                setIsEmailFocused("");
              }}
              disabled={isDisabled}
            />
            {isEmailFocused === id &&
            !emailValidation(rowData?.email).isValid ? (
              <ErrorMessage
                errorMessage={emailValidation(rowData?.email).errors.message}
              />
            ) : null}
          </span>
        );
      },
    },

    {
      title: (
        <div>
          <div className="TableHeading" data-column="language">
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              Language
            </p>
            {/* <img
              src={DropDownHeader}
              className="clickAbleCursorPointerU dropDownIcon"
              alt="DropDownIcon"
            /> */}
          </div>
        </div>
      ),

      render: (rowData, id) => {
        return (
          <span>
            {DropDownShow && (
              // <MultiSelectSimple
              //   options={dropDownOptions.language}
              //   setDataOut={(value) => {
              //     onChangeLang(value);
              //     handleChangeMSSD(value, "language", id);
              //   }}
              //   defaultSelected={["Hindi"]}
              //   extraClassWrapper="extraClassMultiSelectWrapperCreate"
              // />

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
                getFilteredData={(value) => {
                  onChangeLang(value);
                  handleChangeMSSD(value, "language", id);
                }}
                // clearDropDown={() => {
                //   handleChangeMSSD([], "language", id);
                // }}
                toBeFilterData={dropDownOptions?.language}
                selectedDataOutside={
                  rowData?.language ? [...rowData?.language] : rowData?.language
                }
                // isHideAllCheckbox
              />
            )}
          </span>
        );
      },
    },
    {
      title: (
        <div>
          <div className="TableHeading" data-column="role">
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Role</p>
            {/* <img
              src={DropDownHeader}
              className="clickAbleCursorPointerU dropDownIcon"
              alt="DropDownIcon"
            /> */}
          </div>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <span>
            {/*{rowData?.role}*/}
            <div>
              {DropDownShow && (
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
                  }}
                  defaultSelected={rowData?.role}
                  extraClassSelectedArea={"extraStyleSelectedAreaRole"}
                  extraClassToBeSelectedArea={"extraStyleBeRole"}
                  extraClassDropdownSearchArea={"extraSearchRole"}
                  selectedColor={"greybg"}
                />
              )}
            </div>
          </span>
        );
      },
    },
    /* {
      title: (
        <div>
          <div className="TableHeading" data-column="projects">
            <p style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              Project
            </p>
            <img
              src={DropDownHeader}
              className="clickAbleCursorPointerU dropDownIcon"
              alt="DropDownIcon"
            />
          </div>
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
                    placeHolderText: rowData?.projects?.length
                      ? rowData?.projects?.[0] +
                        (rowData?.projects?.length > 1
                          ? "+" + (rowData?.projects?.length - 1)
                          : "")
                      : "Project",
                  }}
                  getFilteredData={(value) =>
                    handleChangeMSSD(value, "projects", id)
                  }
                  toBeFilterData={ProjectOptions}
                  extraClassImage={"extraClassImage"}
                  extraPlaceHolderStyle={"extraPlaceHolderStyle"}
                  extraSelectedClass={"extraSelectedClass"}
                />
              )}
            </div>
          </span>
        );
      },
    },*/

    {
      title: (
        <div className="TableHeading" data-column="delete">
          <p>Delete</p>
        </div>
      ),
      render: (rowData, id) => {
        return (
          <>
            <Icon
              img_src={DeleteUser}
              onClick={() => handleRemove(id, rowData, "manualEdit")}
              extraClass={"DeleteUserIcon"}
              alt="DeleteUserIcon"
            />
          </>
        );
      },
    },
  ];
}
