import "./UploadFileInput.css";
const UploadFileInput = (props) => {
  return (
    <>
      <div className="uploadInputTopdiv">
        <span className="uploadFileLabel"> Optional </span>
        <div className="uploadFileVisible">
          <span>
            {/* <label for="upload-file" className="inputUFLable">
              <span className="UPInputPlaceholder"> Upload Photo </span>
            </label> */}
            <input
              id="upload-file"
              className="uploadFileInput"
              type="file"
              placeholder="Upload a text file"
              onChange={(e) => props.onChangeValue(e)}
              accept="image/*"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default UploadFileInput;
