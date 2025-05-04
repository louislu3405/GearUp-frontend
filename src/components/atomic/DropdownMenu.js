// Design System
import style from "./DropdownMenu.module.css";

export default function DropdownMenu({
  items, // A list of {text, callBack}
}) {
  return (
    <div className={style["wrapper"]}>
      {items.map((item) => (
        <button
          className={style["menu-item"]}
          onClick={item.callBack}
          key={item.text}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}
