import React from "react";
import Icon from "../Icon/icon";
import "./button.css";

export default React.forwardRef(function Button(props, ref) {
  return (
    <button
      className={
        "basic button-" +
        (props.button_type ? props.button_type : "") +
        " " +
        (props.extraClass ? props.extraClass : "") +
        " " +
        (props.disabled ? "disabled" : "") +
        " " +
        (props.roundedBtn ? "btn-radius" : "")
      }
      data-toggle={props.dataToggle ? props.dataToggle : ""}
      ref={ref}
      type={props.type ? props.type : "BUTTON"}
      style={props.extraStyle ? props.extraStyle : { width: "130px" }}
      disabled={props.disabled}
      onClick={e => {
        if (props.onClick && !props.disabled) {
          props.onClick(e);
        }
      }}
    >
      <span
        className={
          "btn-text" + (props.buttonTextClass ? props.buttonTextClass : "")
        }
      >
        {props.text ? props.text : ""}
      </span>
      {props.image_src && (
        <Icon
          img_src={props.image_src}
          extraClass={props.imgClass ? props.imgClass : ""}
          extraStyle={{
            cursor: props.disabled ? "not-allowed" : "pointer"
          }}
          disabled={props.disabled}
        />
      )}
      {props.shortLoader ? <span className={"short-loader ml-2"}></span> : ""}
    </button>
  );
});
