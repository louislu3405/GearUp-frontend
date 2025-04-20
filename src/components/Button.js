// Design System - New Button
import style from "./Button.module.css";

export const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
};

export default function Button({
  // icon,
  type, // One of BUTTON_TYPES
  // state,
  // size,
  // action,
  label,
  callBack,
}) {
  return (
    <div className={style["button-wrapper"]}>
      <div
        onClick={callBack}
        className={`${style["button"]} ${
          type === "primary"
            ? style["button-primary"]
            : type === "secondary"
              ? style["button-secondary"]
              : style["button-tertiary"]
        }
        `}
      >
        {label}
      </div>
    </div>
  );
}
