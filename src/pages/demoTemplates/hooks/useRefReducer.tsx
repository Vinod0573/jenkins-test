import React, { useRef, useEffect } from 'react'
// DOM Ref
function FocusInput() {
	const inputRef = useRef(null)
	useEffect(() => {
		// inputRef.current.focus()
	}, [])
	return (
		<div>
			<input ref={inputRef} type="text" />
		</div>
	)
}

export default FocusInput


// Mutable Ref
// import { intervalToDuration } from 'date-fns'
// import React, {useState, useEffect, useRef} from 'react'

// function HookTimer() {
//   const [timer, setTimer] = useState(0)
//   const interValRef = useRef(null)

//   const stopTimer = () =>{
	//   if(interValRef.current){
		// window.clearInterval(interValRef.current)
	//   }
	  
//   }
//   useEffect(() => {
//     interValRef.current = window.setInterval(() => {
//       setTimer(timer => timer + 1)
//     }, 1000)
//     return () => {
//       stopTimer();
//     }
//   }, [])
//   return (
//     <div>
//       HookTimer - {timer} -
//       <button onClick={() => clearInterval(interValRef.current)}>Clear Timer</button>
//     </div>
//   )
// }

// export default HookTimer
