import React, { useRef } from "react";
import styles from "./Bar.module.scss";
export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;
  const bar = useRef();
  function calcClickedTime(e) {
    //  console.log(bar);
    if (bar.current) {
      const clickPositionInPage = e.pageX;

      const bar1 = bar.current;
      const barStart = bar1.getBoundingClientRect().left + window.scrollX;
      const barWidth = bar1.getBoundingClientRect().width;
      const clickPositionInBar = clickPositionInPage - barStart;
      const timePerPixel = duration / barWidth;
      const time = timePerPixel * clickPositionInBar;
      console.log("bar", {
        barStart,
        barWidth,
        clickPositionInBar,

        clickPositionInPage,
        timePerPixel,
        time,
      });
      return timePerPixel * clickPositionInBar;
    }
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className={styles.bar}>
      <div
        ref={bar}
        className={styles.bar__progress}
        style={{
          background: `linear-gradient(to right, #A6CEFF ${curPercentage}%, white 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className={styles.bar__progress__knob}
          style={{ left: `${curPercentage - 2}%` }}
        >
          <span className={styles.knobCircle} />
        </span>
      </div>
    </div>
  );
}
