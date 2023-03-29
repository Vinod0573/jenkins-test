import React, { useEffect, useState } from "react";
import "./SingleSelectDD.css";
export default function SingleSelectDD(props) {
  const [greyBackgroundId, setGreyBackgroundId] = useState(null);
  const [showFull,setShowFull]=useState(false);
  const [indexSelected,setIndexSelected]=useState(null);
  const options = props?.options;
  useEffect(() => {
    if (props?.defaultSelected) {
      setGreyBackgroundId((prev) => options.indexOf(props?.defaultSelected));
      setIndexSelected(prev=>(prev) => options.indexOf(props?.defaultSelected));
    }
  }, []);

  const handleClick = (e, index) => {
    //selcted (e.target.id).slice(3);
    // if() props?.selectedData(options[(e.target.id).slice(3)])
    if(props?.freeze) return ;

    if(index!=indexSelected){
    if (!props?.extraData) {
      setGreyBackgroundId((prev) => index);
      props.dataOutSide(options[index]);
      setIndexSelected(prev=>index)
      
    } else {
      setGreyBackgroundId((prev) => index);
      setIndexSelected(prev=>index);
      
      props.dataOutSide((prev) => {
        return { value: options[index], type: props?.extraData };
      });
    }}else{
      if (!props?.extraData) {
        setGreyBackgroundId(null);
        props.dataOutSide("");
        setIndexSelected(null);
        
      } else {
        setGreyBackgroundId((prev) => null);
        setIndexSelected(prev=>null);
        
        props.dataOutSide((prev) => {
          return {type: props?.extraData,value:"" };
        });
      }
    }
    
  };

  return (
    <>
    {props?.extended&&props?.title&&
    <div
    className="title_weiw2"
    onClick={(e) =>{setShowFull(prev=>!prev)}}
  >
   
    {props?.showSelectedItemsOnTitle?<p className="tte0292-4232">
    {indexSelected!==null ?options[indexSelected]:props?.title}
  </p>:<p className="tte0292-4232">
    {props?.title}
  </p>}
    <img className={`carat02_293 ${showFull?" rote-sd20":""}`} src={props?.titleRightIcon} alt="" />{" "}
  </div>}
    
    
    <div className={`ssdd-wrapper     ${ (!props.title&&props?.extended)?" ":(props?.extended&&(showFull? "m1xy633-1":"   dnonde"))}`}>
      <div
        className={
          props.parentWrapper ? props?.parentWrapper : "ssdd-wrapper-inner"
        }
      >
        {options &&
          options?.length > 0 &&
          options.map((e, i) => {
            return (
              <div
                className={`paradi ${
                   (!props?.selectedDataBlueBackground )?(greyBackgroundId === i ? "greybgseit" : ""):
                   (greyBackgroundId === i ? "blueieebgseit" : "")
                }`}
                onClick={(e) => handleClick(e, i)}
                key={i}
              >
                <p className={`formatpara   ${props?.selectedDataBlueBackground&&greyBackgroundId === i ?" colorwhite":""}`}>{e}</p>
              </div>
            );
          })}
      </div>
    </div>
    {(props?.title)?(props?.extended &&showFull&&<div className="down-section-mll3874922">
                        <img
                          className="closemlmk-25"
                          src={props?.crossIcon}
                          onClick={(e) => {
                            // setShow((prev) => false);
                            // setSelectedLanguage((orev) => []);
                            props?.onClickCross&&props?.onClickCross();
                            setShowFull(prev=>false)
                            setGreyBackgroundId(prev=>null);
                            setIndexSelected(prev=>null)
                          }}
                          alt=""
                        />
                        <span>|</span>
                        <img
                          className="okemlmk-74"
                          onClick={(e) => {props?.onClickOk&&props?.onClickOk();
                            setShowFull(prev=>false)
                          }
                          
                        }
                          src={props?.okIcon}
                          alt=""
                        />
 </div>):(props?.extended &&<div className="down-section-mll3874922">
                        <img
                          className="closemlmk-25"
                          src={props?.crossIcon}
                          onClick={(e) => {
                            // setShow((prev) => false);
                            // setSelectedLanguage((orev) => []);
                            props?.onClickCross&&props?.onClickCross();
                            setShowFull(prev=>false)
                            setGreyBackgroundId(prev=>null);
                            setIndexSelected(prev=>null)
                          }}
                          alt=""
                        />
                        <span>|</span>
                        <img
                          className="okemlmk-74"
                          onClick={(e) => {props?.onClickOk&&props?.onClickOk();
                            setShowFull(prev=>false)
                          }
                          
                        }
                          src={props?.okIcon}
                          alt=""
                        />
 </div>)}
   
 
    </>
  );
}

// example <SingleSelectDD options={optionsForSingleSelect} extraData={each.name} dataOutSide={setSelectedDataFormat}  defaultSelected={selectedDataFormat}  />
// extended example
/* <SingleSelectDD 
 options={["OK","NICE","HUND","LINK","YOU","KIK"]} 
 dataOutSide={fun}
 defaultSelected={"OK"}
 extended={true}
 title={"Language"}
 titleRightIcon={close}
 crossIcon={close}
 okIcon={close}
 onClickCross={()=>{ console.log("GOT CROSS")}}
 onClickOk={()=>{console.log("GOT ok")}}
 showSelectedItemsOnTitle={true}
 /> */
