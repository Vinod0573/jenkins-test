import React from "react";
import AddUserIcon from "../../../assets/projectPageIcon/AddUserIcon.svg";
import CreateUserIcon from "../../../assets/projectPageIcon/CreateUserIcon.svg";
import "./AddCard.css";
function AddCard(props) {
  return (
    <div className="adduserCardWrapper">
      <div className={`${props.extraClass ? props.extraClass : "addUserCard"}`}>
        <div className="iconDiv">
          <img src={props.icon ? props.icon : AddUserIcon}></img>
        </div>
        <div className="nameDiv">
          <p className={props.extraStyleName ? props.extraStyleName : ""}>
            {props.name ? props.name : "Add User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
