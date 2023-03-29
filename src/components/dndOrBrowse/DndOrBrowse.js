import React, { useRef, useState } from "react";
import "./DndOrBrowse.css";
import dndcloud from "../../assets/projectPageIcon/dndcloud.svg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFileData } from "../../redux/annotation/dndPopUp/action";
import { toast } from "react-toastify";

export default function DndOrBrowse(props) {
  const dispatch = useDispatch();
  const browse = useRef(null);
  const inp = useRef(null);
  let file;
  let inputbtn = inp.current;
  //drag
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const [percent, setPercent] = useState(0);
  //drop
  const handleDrop = (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    //prevet unsupported files
    if (
      file.type.includes("zip") ||
      file.type.includes("rar") ||
      file.type.includes("tar") ||
      file.type.includes("7z")
    ) {
      props.fileName(file.name);
      let filereader = new FileReader();
      filereader.onprogress = (ev) => {
        if (ev.loaded && ev.total) {
          const percent = (ev.loaded / ev.total) * 100;
          props.percentValue(percent);
        }
      };
      filereader.onloadend = (e) => {
        dispatch({ type: "SET_FILE_DATA", payload: filereader.result });
        props.file(file, "uploadedFiles");
        props.isEditClicked &&
          toast.success("Please validate meta info  before uploading");
      };

      filereader.readAsDataURL(file);
    } else {
      toast.error("Unsupported Format");
    }
  };
  //browse
  const handleBrowse = (event) => {
    document.getElementById("dsdhdi23").click();
  };
  //input
  const handleInput = (e) => {
    e?.preventDefault();
    file = e.target.files[0];
    dispatch({ type: "SET_FILE_NAME", payload: file.name });
    props.fileName(file.name);
    props.file(file, "uploadedFiles");
    let filereader = new FileReader();
    filereader.onprogress = (ev) => {
      if (ev.loaded && ev.total) {
        const percent = (ev.loaded / ev.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
        setPercent((prev) => percent);
        props.percentValue(percent);
      }
    };
    filereader.onloadend = () => {
      props.isEditClicked &&
        toast.success("Please validate meta info  before uploading");
    };
    filereader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   dispatch({ type: "SET_FILE_DATA", payload: fileDetails });
  // }, [fileDetails]);

  return (
    <>
      <div className="dndcontainer">
        <p className="uploadtitle">Upload</p>
        <div
          className="dnd-border-dot"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          id="drag-area-epx"
        >
          <img src={dndcloud} alt="upload" />
          <p className="dragorbrows">
            Drag & drop files or{" "}
            <span
              ref={browse}
              style={{
                color: "#0174FF",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleBrowse}
            >
              Browse
            </span>
            <input
              id="dsdhdi23"
              onChange={handleInput}
              type="file"
              accept=".zip , .rar, .tar , .7z"
              hidden
            />
          </p>
          <p className="mulish">Supported formats: Zip & Compress File</p>
        </div>
      </div>
    </>
  );
}
