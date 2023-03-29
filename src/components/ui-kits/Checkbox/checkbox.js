import React from "react";
import propTypes from "prop-types";
import "./checkbox.css";

function Checkbox(props) {
  return (
    <label
      className={
        "checkbox-container " +
        (props.extraClass ? props.extraClass : "") +
        (props.disabled ? " disabled-checkbox" : "")
      }
      style={props.style ? props.style : {}}
    >
      <span
        className={
          (props.disabled ? "opacity " : "") +
          (props.labelClass ? props.labelClass : "")
        }
      >
        {" "}
        {props.text}
      </span>
      <input
        type="checkbox"
        disabled={props.disabled}
        checked={props.checked ? "checked" : ""}
        defaultChecked={props.defaultChecked}
        tabIndex={props.tabIndex ? props.tabIndex : 0}
        onChange={(e) => {
          e.stopPropagation();
          props.multiple
            ? props.onChange(e.target.checked, props.text, props.id)
            : // props.onChange(e.target.checked, e.target.checked === true ? props.text : "", props.id);
              props.onChange(e.target.checked, props.data, props.tabIndex);
        }}
      />
      <span
        className={
          "custom-checkbox " + (props.extraSpan ? props.extraSpan : "")
        }
      ></span>
    </label>
  );
}

Checkbox.propTypes = {
  extraClass: propTypes.string,
  disabled: propTypes.bool,
  checked: propTypes.bool,
  defaultChecked: propTypes.bool,
  tabIndex: propTypes.number,
  extraSpan: propTypes.string,
  onChange: propTypes.func.isRequired,
  text: propTypes.string,
  labelClass: propTypes.string,
  style: propTypes.object,
  multiple: propTypes.bool,
};

export default Checkbox;
