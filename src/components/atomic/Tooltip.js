import style from "./Tooltip.module.css";

export default function Tooltip({ promptText }) {
  return (
    <div className={style["wrapper"]}>
      <div className={style["diamond"]} />
      <div className={style["text"]}>{promptText}</div>
    </div>
  );
}
