import React, { useReducer } from 'react'

type CounterType ={
    count: number
}
type CounterAction = {
    type: string,
    payload: number
}

// type UpdateAction = {
//     type: 'increment' | 'decrement',
//     payload: number
// }

// type ResetAction = {
//     type: 'reset'
// }
// type CounterAction = UpdateAction | ResetAction
const initialState = {count:0}
const reducer = (state:CounterType, action:CounterAction) => {
	switch (action.type) {
		case 'increment':
			return {count: state.count + action.payload}
		case 'decrement':
			return {count: state.count - action.payload}
		// case 'reset':
		// 	return initialState
		default:
			return state
	}
}

function Counter() {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
    <div>
      <div>Count = {state.count}</div>
      <button onClick={() => dispatch({type:'increment', payload: 1})}>Increment</button>
			<button onClick={() => dispatch({type:'decrement', payload: 1})}>Decrement</button>
			{/* <button onClick={() => dispatch({type:'reset'})}>Reset</button> */}
		</div>
	)
}

export default Counter