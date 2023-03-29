import React, { Children } from 'react'
import "./TransparentModal.css"

function TransparentModal(props) {
  return (
    <div className='transparentModalWrapper'>
            <div className='center'>{props.children}</div>
    </div>
  )
}

export default TransparentModal