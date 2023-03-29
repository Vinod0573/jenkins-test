//
import { useState } from "react";
// function useThrotle(cb, wait = 1000){
//   let shouldwait = false;
//   let cacheArgs;
//   return (...args) => {
//     cacheArgs = args;
//     if (shouldwait) {
//       return;
//     }
//     cb(cacheArgs);
//     shouldwait = true;
//     setTimeout(() => {
//       shouldwait = false;
//     }, wait);
//   };
// };
/**
 * `Throttling is used to call a function after every millisecond or a particular interval of time.`
 * -  only the first click is executed immediately.
 * -  after first execution if the click is happened within certain time interval , it will not run
 * -  only after specified time interval the function will run if clicked again after the time interval
 *  @example
 * function toastFn() {
 * toast.toastify("hello")
 * }
 * const throtledToastFn=useThrotle(toast,3000) // wait for three second
 * @author Nithin  <nithin.n@saarthi.ai>
 * @param {CallableFunction} cb
 * @param {Number} wait : time in ms default `1000`
 * @returns {function }
 */
function useThrotle(cb, wait = 1000) {
  const [shouldWait, setShouldWait] = useState(false);
  const [cacheArgs, setCacheArgs] = useState(null);
  return (...args) => {
    setCacheArgs(args);
    if (shouldWait) {
      return;
    }
    cb(cacheArgs); //cb.apply(this,cacheArgs)
    setShouldWait(true);
    setTimeout(() => {
      setShouldWait(false);
    }, wait);
  };
}

export default useThrotle;
