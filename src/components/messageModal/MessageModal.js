import React from 'react'
import "./MessageModal.css"

function MessageModal(props) {
    const handleCancel =() => {
        props.handleCancel()
    }
  return (
    <div className='messageModalWrapper'>
        <div  className='messageModal'>
            <div className='cancelBtn' 
             onClick={() => handleCancel()}
            >
              X
            </div>
           <div className='messageDiv'>
             <p> {props.message}</p>
           </div>
        </div>
    </div>
  )
}

export default MessageModal