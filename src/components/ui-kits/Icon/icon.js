import React from "react";
import "./icon.css";


export default function Icon(props) {
    return (
        <img
            src={props.img_src}
            style={props.extraStyle ? props.extraStyle : {}}
            onClick={e => {
                if (props.onClick && !props.disabled) {
                    props.onClick(e);
                }
            }}
            className={"icon " + (props.disabled ? "disabled " : "") + " " + (props.extraClass ? props.extraClass : "")}
            alt=""
        />
    )
}
