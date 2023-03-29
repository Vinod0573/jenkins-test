import React, { useEffect, useState } from "react";
import { findAllInRenderedTree } from "react-dom/test-utils";
import "./MultiSelectSimple.css";
export default function MultiSelectSimple(props) {
  const [selectedData, setSelectedData] = useState([]);
  const [greyId, setGreyId] = useState(null);
  const [showFull, setShowFull] = useState(false);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    //setting default options

    if (props?.defaultSelected && props?.defaultSelected?.length > 0) {
      let temp = [];
      for (var i = 0; i < props?.defaultSelected.length; i++) {
        const idx = props.options.indexOf(props?.defaultSelected[i]);
        temp = [...temp, props.options[idx]];
      }

      setSelectedData([...temp]);
      if (props.setDataOut) props.setDataOut([...temp]);
    }
  }, []);
  const handleClick = (e, index) => {
    if(props?.freeze)return ;
    if (e.target.checked) {
      let temp;
      if (props?.actLikeSingleSelect) {
        temp = [props.options[index]];
      } else {
        temp = [...selectedData, props.options[index]];
      }
      // console.log(temp);
      setSelectedData([...temp]);

      if (props.setDataOut) props.setDataOut([...temp]);
    } else {
      let temp = selectedData?.filter((e, i) => {
        return e != props.options[index];
      });
      setSelectedData([...temp]);
      if (props.setDataOut) props.setDataOut([...temp]);
      // console.log(temp);
    }
  };

  // const handleClose = () => {
  //   setSelectedData((prev) => (props.setDataOut ? props.setDataOut : []));
  //   setShow((prev) => false);
  // };

  return (
    <>
      {props?.extended && props?.title && (
        <div
          className="title_weiw2"
          onClick={(e) => {
            setShowFull((prev) => !prev);
          }}
        >
          {props?.showSelectedItemsOnTitle ? (
            <p className="tte0292-4232">
              {selectedData.length == 1
                ? selectedData[0]
                : selectedData.length > 1
                ? `${selectedData[0]} + ${selectedData.length - 1}`
                : props?.title}
            </p>
          ) : (
            <p className="tte0292-4232">{props?.title}</p>
          )}
          {
            <img
              className={`carat02_293 ${showFull ? " rote-sd20" : ""}`}
              src={props?.titleRightIcon}
              alt=""
            />
          }
        </div>
      )}
      <div
        className={`multi-select-options-wrapper ${
          props.extraClassWrapper ? props.extraClassWrapper : ""
        }   ${
          !props.title && props?.extended
            ? " "
            : props?.extended && (showFull ? "" : "   dnonde")
        }`}
      >
        <div className={`multiselect-inner`}>
          {props.options &&
            props.options.length > 0 &&
            props.options?.map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <div
                    className={`optionsofcheck ${
                      greyId === i ? "optionsbggreyshd" : ""
                    } `}
                  >
                    <input
                      onChange={(e) => handleClick(e, i)}
                      className="optioncheck"
                      type="checkbox"
                      name=""
                      checked={
                        selectedData.includes(props?.options[i]) ? true : false
                      }
                    />
                    <p className="options-para">{e}</p>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
        {props?.extended && (
          <div className="down-section-mll3874">
            <img
              className="closemlmk-25"
              src={props?.crossIcon}
              onClick={(e) => {
                // setShow((prev) => false);
                // setSelectedLanguage((orev) => []);
                props?.onClickCross && props?.onClickCross();
                setShowFull((prev) => false);
                setSelectedData((prev) => []);
              }}
              alt=""
            />
            <span>|</span>
            <img
              className="okemlmk-74"
              onClick={(e) => {
                props?.onClickOk && props?.onClickOk();
                setShowFull((prev) => false);
              }}
              src={props?.okIcon}
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}

//example
//<MultiSelectSimple options={optionsForMultiSelect} setDataOut={setOptionsSelected} ,defaultSelected={["SHREE RAM"]}/>

/* <MultiSelectSimple 
 options={["OK","NICE","HUND","LINK","YOU","KIK"]} 
 setDataOut={()=>{}} 
 defaultSelected={["YOU"]} ?
 extended={true}     ?
 title={"Language"} ?
 titleRightIcon={close}  ?
 crossIcon={close}?
 okIcon={close} ?
 onClickCross={()=>{ console.log("GOT CROSS")}} ?
 onClickOk={()=>{console.log("GOT ok")}}   ? 
 showSelectedItemsOnTitle={true}  ?
 actLikeSingleSelect={true} ?
 freeze={true|false}
 /> */
