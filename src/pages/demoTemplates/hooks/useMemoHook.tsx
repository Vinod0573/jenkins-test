
import { useMemo, useCallback } from "react"
import React from 'react'

const useMemoHook = () => {
    const value = 10;
// inferred as number
const result = useMemo(() => value * 2, [value]);
  return (
    <div></div>
  )
}

export default useMemoHook

// const useCallBackHook = () => {
//     const multiplier = 2;
//     // inferred as (value: number) => number
//     const multiply = useCallback((value: number) => value * multiplier, [multiplier]);
//   return (
//     <div></div>
//   )
// }

// export default useCallBackHook

// specify the types of the parameters of the callback for useCallback, 
// otherwise they will be set to any