import React, { useState, useEffect } from "react";
import "./UploadedHistoryModal.css";
import audio from "../../assets/AudioIcon.svg";
import text from "../../assets/Text.svg";

function getDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (!date) {
    return ".";
  }
  const dateOFUplaod = new Date(date);
  return (
    dateOFUplaod.getDate() +
    " " +
    months[dateOFUplaod.getMonth()] +
    " " +
    dateOFUplaod.getFullYear()
  );
}
function UploadedHistoryModal(props) {
  const closeModal = () => {
    props.closeModal();
  };

  console.log(props.uploadedFiles);

  return (
    <div className="uploaded-history">
      <div className="showModalBlur">
        <div className="uploaded-details-section">
          <div className="upload-details-header">Upload History</div>
          <div className="upload-details-content">
            {props.uploadedFiles &&
              props.uploadedFiles.map((each, i) => {
                return (
                  <div key={i} className="upload-history-details">
                    <div className="list-details">
                      <div className="name ">
                        {each.name.length > 20
                          ? each.name.substring(0, 19) + " ..."
                          : each.name}
                      </div>
                      <div className="type">
                        <div className="type-section">
                          <div>
                            {each.type == "Audio" ? (
                              <img src={audio} />
                            ) : (
                              <img src={text} />
                            )}
                          </div>

                          <div>{each.type}</div>
                        </div>
                      </div>
                      <div className="date">{getDate(each.date)}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="upload-details-footer">
            <button className="okBtnInside" onClick={() => closeModal()}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadedHistoryModal;
