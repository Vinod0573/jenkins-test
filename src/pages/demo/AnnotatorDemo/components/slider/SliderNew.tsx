import styles from "./SliderNew.module.scss";
interface props {
  lable: { left: string; right: string };
  limit: { min: number; max: number; step: number };
  value: number;
  onChange: (x: string) => void;
}
export default function SliderNew(props: props) {
  return (
    <div className={styles.wrapper}>
      <span>{props.lable.left}</span>
      <input
        type="range"
        min={props.limit.min}
        max={props.limit.max}
        step={props.limit.step}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
          // console.log(e.target.value, "slider value");
        }}
        className="slider volume-slider"
      />
      <span>{props.lable.right}</span>
    </div>
  );
}
