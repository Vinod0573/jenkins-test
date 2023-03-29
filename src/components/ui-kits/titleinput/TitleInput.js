import "./TitleInput.css";

const TitleInput = (props) => {
  return (
    <>
      <div className="titleInputTopdiv">
        <div className="titleInputDiv">
          <input
            type="text"
            placeholder="Title*"
            onChange={(e) => props.onChangeValue(e)}
          />
        </div>
      </div>
    </>
  );
};

export default TitleInput;
