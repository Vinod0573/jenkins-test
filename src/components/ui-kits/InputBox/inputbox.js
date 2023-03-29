import React from "react";
import "./inputbox.css";

function inputbox(props) {
  function onChangeValue(e) {
    //console.log(props.restrictPrecision, "restrict precision"); //
    console.log(props.autoComplete);
    let value = e.target.value;
    let isTrue = true;
    if (
      typeof props.restrictPrecision === "string" ||
      typeof props.restrictPrecision === "number"
    ) {
      let index = value.indexOf(".");
      let precisionLength = index > -1 ? value.slice(index + 1)?.length : 0;
      isTrue =
        isTrue && precisionLength <= props.restrictPrecision ? true : false;
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
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.extraClass ? props.extraClass : "input-box"}`}
        onChange={props.onChange}
        value={props.value ? props.value : ""}
      />
    </div>
  );
}

export default inputbox;
