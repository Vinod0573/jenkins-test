import React from 'react'
import "./SaveModal.css"
import saveIcon from "../../assets/saveButtonIcon/saveButton.svg"
function SaveModal(props) {

    const handleSave =() => {
        props.handleSave()
        // props.handleCancel()
    }
    const handleCancel =() => {
        props.handleCancel()
    }
  return (
    <div className='saveModalWrapper'>
      <div className='saveModalOuterDiv'>
            <div className='crossBtn'> <div
            className='xbtn'
             onClick={() => handleCancel()}
            >X</div></div>
            <div className='msgAndImg'>
          <p> Press to assign </p>
          {/* <img src ={saveIcon}alt='Img'></img> */}
           <button 
           className='saveBtnmodal' 
           onClick = {() => handleSave()}
           > Save</button>
          </div>
      </div>
    </div>
  )
}

export default SaveModal