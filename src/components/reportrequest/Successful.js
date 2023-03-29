import "./ReportRequest.css";
import CrossIcon from "../../assets/summarysection/CrossIcon.svg";
import SuccessfullIcon from "../../assets/summarysection/SuccessfullIcon.svg";



const SuccessfulUI = (props) => {


  const handleSubmitAgain = () =>{
    props.handleSubmitAgain(false);
  }

  const setReportBugAndRequestFeature = () => {};
  return (
    <>
      <div className="reportRequestTopDiv">
        <div>
          <div className="RRClosingDiv">
            {" "}
            <img
              src={CrossIcon}
              alt="cross icon"
              onClick={() => props.toCloseRRModel()}
            />
          </div>
          <div className="RRHeadingDiv">
            {" "}
            <h2> {props.propsOption[2]} </h2>
          </div>
          <div className="RRAllInputTop">
            <div className={`RRInput RRSuccessful`}>
              <div>
                <img src={SuccessfullIcon} alt="successful icon" />
              </div>
              <div className="successfulMessage">
                <h4> {props.propsOption[3]} </h4>
              </div>
              <div className="RRSaveButtonDiv">
                <button
                  className="RRSaveButton"
                  style={{ background: "#7B42FF" }}
                  onClick={() => handleSubmitAgain()}
                >
                  {" "}
                  {props.propsOption[4]}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfulUI;
