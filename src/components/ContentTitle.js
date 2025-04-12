import style from "./ContentTitle.module.css";

export default function ContentTitle({ title, text }) {
  return (
    <div className={style["main-content-wrapper"]}>
      <h1 className={style["main-content-title"]}>{title}</h1>
      {text !== null && <p className={style["main-content-text"]}>{text}</p>}
    </div>
  );
}
