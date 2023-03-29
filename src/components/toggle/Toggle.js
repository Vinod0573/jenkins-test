import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL, ONBOARDING_URL } from "../../utilities/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toggle.css";

const Toggle = ({ label  , active , id ,hit}) => {
    const[tochange , setTochange] = useState(false)
    const[btnPress , setBtnPress] = useState('')

   const btnChange = () => {
    setTochange(prev => !prev)
    setBtnPress("pressed")
   }
   const token =  sessionStorage.getItem("token");
   const ids =  sessionStorage.getItem("Id");
   //to change inistial state
   useEffect(
       () => {
        setTochange(prev => active)
       }
       , [active]
   )
   const updateUserUrl = SERVER_URL + ONBOARDING_URL.UPDATE_USER_DATA;
  //to update api
  const updateStatus = async() => {
   let data = {
    isActive: tochange ,
    id: id,

  };
  await axios
  .post(updateUserUrl, data, {
    headers: {
      "x-access-token": token,
      userId: ids,
    },
  })
  .then((res) => {

    if (res.request.statusText === "OK") {
       hit(prev => !prev)
      toast.success("User Status Updated!");

    }
  })
  .catch((e) => {

    toast.error(e);

  })
}
//to get to know it is pressed
  useEffect(
      () => {
          if(btnPress?.length){
          return updateStatus()

          }
      }
      , [btnPress]
  )
  // to reset btn
  useEffect(
      () => {

           setBtnPress(prev =>'')

      },[tochange]
  )

  return (
      <div className="toggleWrapper">
    <div className="container">

      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={label} id={label} checked = {tochange} />
        <label className="label" htmlFor={label} onClick = {() => btnChange()}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
    </div>
  );
};

export default Toggle;