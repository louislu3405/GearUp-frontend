// Progress bar UI
// First used on Gear List table "Progress" column
import style from "./ProgressBar.module.css";

export default function ProgressBar({ percentage }) {
  return (
    <div className={style["background"]}>
      <div className={style["progress"]} style={{ width: `${percentage}%` }} />
    </div>
  );
}
