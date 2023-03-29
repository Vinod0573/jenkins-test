import React from "react";
import Icon from "../Icon/icon";
import propTypes from "prop-types";
import "./InputBoxImg.css";
import SearchIcon from '../../../assets/searchIcon/searchIcon.svg';

const InputBoxImg = React.forwardRef(function Inputbox(props, ref) {
  function onChangeValue(e) {
    //console.log(props.restrictPrecision, "restrict precision");
    console.log(props.autoComplete);
    let value = e.target.value;
    let isTrue = true;
    if (
      typeof props.restrictPrecision === "string" ||
      typeof props.restrictPrecision === "number"
    ) {
      let index = value.indexOf(".");
      let precisionLength = index > -1 ? value.slice(index + 1)?.length : 0;
      isTrue = isTrue && precisionLength <= props.restrictPrecision ? true : false;
      console.log(isTrue, "isTrue");
      // props.onChangeValue(value, e.target.name);
    }
    if (props.type === "tel") {
      let regexPattern = /^[0-9]*$/;
      // props.onChangeValue(value, e.target.name);
      isTrue = isTrue && regexPattern.test(value);
    }
    if (props.isAlphaNum) {
      let regexPattern = /^[0-9A-Za-z ]*$/;
      // props.onChangeValue(value, e.target.name);
      isTrue = isTrue && regexPattern.test(value);
    }
    if (props.isPositiveNumber) {
      isTrue = isTrue && value >= 0 ? true : false;
    }
    if (isTrue) {
      props.onChangeValue(e, e.target.name, props.index, e.target.title);
    }
  }

  return (
    <div
      className={`input-box
        ${props.parentClass ? props.parentClass : ""}
        ${props.disabled ? " disabled" : ""}
        ${props.error ? " errorField" : ""}
        ${props.success ? " successField" : ""}`
      }
      id={props.parentID ? props.parentID : ""}
    >
      {/* {props.phoneType === "tel" ? <span className="tel-code">
            {"+" + props.phoneCode}
        </span> : null} */}
        {props.imgSrcLeft ? (
        <Icon
          img_src={props.imgSrcLeft}
          onClick={() => {
            props.imageClickLeft(props.name);
          }}
          extraClass={props.imageExtraClass}
          extraStyle={{
            marginRight: "10px",
            // marginLeft:"7px",
            ...props.imageExtraStyle,
          }}
          disabled={props.disabled}
        />
      ) : null}
      <input
        // className={
        //   "input_fields " +
        //   (props.extraClass ? props.extraClass : "") +
        //   (props.disabled ? " disabled-input-field" : "")
        // }
        className={props.className}
        ref={ref}
        placeholder={props.placeholder ? props.placeholder : ""}
        disabled={props.disabled ? props.disabled : false}
        type={props.type ? props.type : "text"}
        id={props.id ? props.id : ""}
        name={props.name ? props.name : ""}
        title={props.title ? props.title : ""}
        onChange={onChangeValue}
        onBlur={props.onBlur}
        onKeyPress={props.onKeyPress}
        onKeyUp={props.onKeyUp}
        onMouseUp={props.onMouseUp}
        onFocus={props.onFocus}
        value={props.value}
        maxLength={props.maxLength ? props.maxLength : ""}
        min={props.minValue}
        max={props.maxValue}
        autoComplete={props.autoComplete}
        defaultValue={props.defaultValue}
        readOnly={props.readOnly ? true : false}
        step={props.step ? props.step : "any"}
        minLength={props.minLength ? props.minLength : ""}
      />
      {props.reset ? (
        <Icon
          // img_src="assets/images/close.svg"
          img_src = {SearchIcon}
          extraStyle={{
            width: "auto",
            marginRight: "15px",
          }}
          onClick={() => {
            props.onReset(props.name);
          }}
          disabled={props.disabled}
        />
      ) : null}
      {props.imgSrc ? (
        <Icon
          img_src={props.imgSrc}
          onClick={() => {
            props.imageClick(props.name);
          }}
          extraClass={props.imageSrcExtraStyle}
          extraStyle={{
            marginRight: "15px",

            ...props.imageSrcExtraStyle,
          }}
          disabled={props.disabled}

        />
      ) : null}

    </div>
  );
});

InputBoxImg.propTypes = {
  parentClass: propTypes.string,
  disabled: propTypes.bool,
  error: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  success: propTypes.bool,
  extraClass: propTypes.string,
  placeholder: propTypes.string,
  type: propTypes.oneOf([
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ]),
  name: propTypes.string,
  value: propTypes.string,
  maxLength: propTypes.number,
  id: propTypes.string,
  onChangeValue: propTypes.func,
  onBlur: propTypes.func,
  onKeyPress: propTypes.func,
  onKeyUp: propTypes.func,
  onFocus: propTypes.func,
  parentId: propTypes.string,
  defaultValue: propTypes.string,
  minValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  maxValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  reset: propTypes.bool,
  onReset: propTypes.func,
  imgSrc: propTypes.string,
  imageClick: propTypes.func,
  imageExtraClass: propTypes.string,
  imageExtraStyle: propTypes.object,
  readOnly: propTypes.bool,
  isAlphaNum: propTypes.bool,
  step: propTypes.oneOfType([propTypes.string, propTypes.number]),
  minLength: propTypes.number,
  isPositiveNumber: propTypes.bool,
  restrictPrecision: propTypes.oneOfType([propTypes.string, propTypes.number])
};

InputBoxImg.displayName = "Inputbox";

export default InputBoxImg;