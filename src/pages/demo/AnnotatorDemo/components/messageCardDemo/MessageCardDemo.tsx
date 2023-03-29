import styles from "./MessageCardDemo.module.scss";
import agentIon from "../../../../../assets/summarysection/agentIcon.svg";
import botIcon from "../../../../../assets/summarysection/aiIcon.svg";
import { customerSvg, agentSvg } from "../../../../../assets/demo";
export default function MessageCardDemo(props: {
  message: string;
  startTime: number;
  endTime: number;
  type: "left" | "right";
}) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.time}>
            {props.startTime + "s - " + props.endTime + "s"}
          </div>
          <span className={styles.logo}>
            {" "}
            <img
              src={props.type === "left" ? botIcon : agentIon}
              alt="agent or customer"
            />
            <p>{props.type === "left" ? "Ai Agent" : "Customer"}</p>
          </span>
        </div>
        <div className={styles.message}>{props.message}</div>
      </div>
    </>
  );
}
