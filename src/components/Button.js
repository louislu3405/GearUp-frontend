// Design System - New Button
import style from "./Button.module.css";
import Icon from "./icons/Icon";
export { ICON_TYPES } from "./icons/Icon";

export const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
};

export const ICON_POSITION = {
  NONE: "none",
  LEFT: "left",
  RIGHT: "right",
  ICON_ONLY: "icon-only",
};

// Assign Button className from the given button type
const getButtonClassName = (buttonType) => {
  return `button-${buttonType}`;
};

// Assign Icon color from the given button type
const getIconColor = (buttonType) => {
  if (buttonType === BUTTON_TYPES.PRIMARY) {
    return "#FFF";
  }
  return "#116A8D";
};

export default function Button({
  iconPosition, // One of ICON_POSITION, control the position of the icon
  iconType = null, // One of ICON_TYPES. Cross, trash, add icons, etc.
  buttonType, // One of BUTTON_TYPES, control the color and border of the button
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
        className={`${style["button"]} ${style[getButtonClassName(buttonType)]} ${iconPosition === ICON_POSITION.ICON_ONLY ? style["button-iconOnly"] : ""}`}
      >
        {iconPosition === ICON_POSITION.NONE && (
          <div className={style["button-text"]}>{label}</div>
        )}
        {iconPosition === ICON_POSITION.ICON_ONLY && (
          <Icon iconType={iconType} iconColor={getIconColor(buttonType)} />
        )}
        {iconPosition === ICON_POSITION.LEFT && (
          <>
            <Icon iconType={iconType} iconColor={getIconColor(buttonType)} />
            <div className={style["button-text"]}>{label}</div>
          </>
        )}
        {iconPosition === ICON_POSITION.RIGHT && (
          <>
            <div className={style["button-text"]}>{label}</div>
            <Icon iconType={iconType} iconColor={getIconColor(buttonType)} />
          </>
        )}
      </div>
    </div>
  );
}
