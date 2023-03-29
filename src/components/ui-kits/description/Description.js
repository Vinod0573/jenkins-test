
import "./Description.css";
const Discription = (props) =>{
    return(
        <>
        <div className="InputTopdiv">
        <div className="discriptionTextArea">
            <textarea rows="5" placeholder="Description*" onChange={(e)=>props.onChangeValue(e)}/>
        </div>
        </div>
        </>
    )
    
}

export default Discription;