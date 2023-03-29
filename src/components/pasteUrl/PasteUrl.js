import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PasteUrl.css";

export default function PasteUrl(props) {
  const handleChange = (e) => {
    props.uploadedURL(e.target.value,"url")
  };

  const {agentDetails}=props

  return (
    <div className="paste-url-cont">
      <p className="pasteurltext">Paste URI</p>
      <div className="paste-url-inner">
        <input
          className="paste-url-input"
          onChange={(e) => handleChange(e)}
          type="url"
          name="url"
          value={agentDetails?.url?.length ? agentDetails?.url : ""}
        />
      </div>
    </div>
  );
}