import React, { ReactNode, useEffect, useState } from "react";
import styles from "./PageToggler.module.scss";
interface props {
  current: string;
  innerComponents: { name: string; element: ReactNode }[];
  switchTab: CallableFunction;
}
export default function PageToggler(props: props) {
  const [currentTab, setCurrentTab] = useState<ReactNode>(<></>);
  useEffect(() => {
    setCurrentTab(() => {
      const tab = props.innerComponents.filter((e) => {
        return e.name === props.current;
      });
      // console.log({ tab }, "nithin");
      return tab.length > 0 ? tab[0].element : <></>;
    });
    //  console.log(props.current, "nithin");
  }, [props.current, props.innerComponents]);
  //   useEffect(()=>{

  //   },[])
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {props.innerComponents.map((each, index) => {
          return (
            <span
              key={index}
              data-selected={props.current === each.name}
              onClick={() => {
                props.switchTab(each.name);
              }}
            >
              {each.name}
            </span>
          );
        })}
      </div>
      <div className={styles.tab}>{currentTab}</div>
    </div>
  );
}
