import Spinner from "../../assets/Lodder/Saarthiloadinggif.gif";
import Threedots from "../../assets/Lodder/3dots.gif";
import './Loader.css';
import React from "react";


const LoaderSaarthi = (props) =>{
    return(
        <>
        <div className="loaderSaarthi">
                <img className="loaderSaarthiGif"
                  src={props.isDot?Threedots:Spinner}
                  alt="spinner"
                />
        </div>
        </>
    )
}

export default LoaderSaarthi;