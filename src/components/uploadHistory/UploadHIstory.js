import React from "react";
import "./UploadHistory.css";

export default function UploadHistory(props) {
  return (
    <div className="upload-history-container">
      <p className="Uploadhistxt">Upload History</p>
      <div className="upload-history-containe-inner">
        {
          <div className="allfiles">
            {props?.UploadHistoryData?.length > 0 &&
              props.UploadHistoryData.map((e) => {
                return (
                  <div className="eachfile">
                    {" "}
                    <span className="filename">{e.fileName}</span>
                    <span className="fdate">{e.date}</span>
                  </div>
                );
              })}
          </div>
        }
      </div>
    </div>
  );
}
