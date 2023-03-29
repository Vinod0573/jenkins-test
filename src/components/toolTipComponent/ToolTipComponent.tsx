import React from "react";
import styles from "./ToolTipComponent.module.scss";
import InfoIconLight from "../../assets/projectPageIcon/InfoIconLight.svg";

interface ToolTipProps {
  name?: string;
  about?: string;
  extraClass?: any;
  extraTextStylingClass?: any;
  extraAboutStylingClass?: any;
  extraTextDivStylingClass?: any;
}

const ToolTip = ({
  name,
  about,
  extraClass,
  extraTextStylingClass,
  extraAboutStylingClass,
  extraTextDivStylingClass,
}: ToolTipProps) => {
  return (
    <div className={extraClass ? extraClass : styles.toolTip}>
      <img src={InfoIconLight} alt="questIcon" className={styles.IconStyling} />
      <span
        className={`${
          extraTextDivStylingClass ? extraTextDivStylingClass : null
        } ${styles.toolTipText}`}
      >
        <div
          className={`${extraTextStylingClass ? extraTextStylingClass : null} ${
            styles.toolTipTextDiv
          }`}
        >
          <p className={styles.toolTipTextHead}>{name} </p>
          <p
            className={
              extraAboutStylingClass
                ? extraAboutStylingClass
                : styles.toolTipTextAbout
            }
            data-testid="tool-tip"
          >
            {about}
          </p>
        </div>
      </span>
    </div>
  );
};

export default ToolTip;
