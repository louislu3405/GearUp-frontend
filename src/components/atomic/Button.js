// Design System - New Button
import style from "./Button.module.css";
import Icon from "../icons/Icon";
import { useEffect, useRef, useState } from "react";
export { ICON_TYPES } from "../icons/Icon";

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
  const ICON_COLORS = {
    light: "#F5F5F5",
    default: "#116A8D",
    dark: "#0A4156",
  };

  // Assign Icon color from the given button type
  const initialColor =
    buttonType === BUTTON_TYPES.PRIMARY
      ? ICON_COLORS.light
      : ICON_COLORS.default;

  const [iconColor, setIconColor] = useState(initialColor);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseDownRef = useRef(null);

  // Handles Mouse up in all cases, including mouse up
  // happening outside of the button.
  useEffect(() => {
    const handleOnMouseUp = () => {
      setIconColor(initialColor);
      setIsMouseDown(false);
    };

    if (isMouseDown) {
      document.addEventListener("mouseup", handleOnMouseUp);
    } else {
      document.removeEventListener("mouseup", handleOnMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleOnMouseUp);
    };
  }, [isMouseDown, initialColor]);

  const handleOnMouseEnter = () => {
    if (isMouseDown) return;
    if (
      buttonType === BUTTON_TYPES.PRIMARY ||
      buttonType === BUTTON_TYPES.SECONDARY
    )
      setIconColor(ICON_COLORS.dark);
    else if (buttonType === BUTTON_TYPES.TERTIARY)
      setIconColor(ICON_COLORS.default);
  };

  const handleOnMouseLeave = () => {
    if (isMouseDown) return;
    if (buttonType === BUTTON_TYPES.PRIMARY) setIconColor(ICON_COLORS.light);
    else if (buttonType === BUTTON_TYPES.SECONDARY)
      setIconColor(ICON_COLORS.default);
    else if (buttonType === BUTTON_TYPES.TERTIARY)
      setIconColor(ICON_COLORS.default);
  };

  const handleOnMouseDown = () => {
    if (
      buttonType === BUTTON_TYPES.PRIMARY ||
      buttonType === BUTTON_TYPES.SECONDARY
    )
      setIconColor(ICON_COLORS.light);
    else if (buttonType === BUTTON_TYPES.TERTIARY)
      setIconColor(ICON_COLORS.dark);
    setIsMouseDown(true);
  };

  return (
    <div className={style["button-wrapper"]}>
      <button
        onClick={callBack}
        onMouseEnter={() => handleOnMouseEnter()}
        onMouseLeave={() => handleOnMouseLeave()}
        onMouseDown={() => handleOnMouseDown()}
        ref={mouseDownRef}
        className={`${style["button"]} ${style[getButtonClassName(buttonType)]} ${iconPosition === ICON_POSITION.ICON_ONLY ? style["button-iconOnly"] : ""}`}
      >
        {iconPosition === ICON_POSITION.NONE && (
          <div className={style["button-text"]}>{label}</div>
        )}
        {iconPosition === ICON_POSITION.ICON_ONLY && (
          <Icon iconType={iconType} iconColor={iconColor} />
        )}
        {iconPosition === ICON_POSITION.LEFT && (
          <>
            <Icon iconType={iconType} iconColor={iconColor} />
            <div className={style["button-text"]}>{label}</div>
          </>
        )}
        {iconPosition === ICON_POSITION.RIGHT && (
          <>
            <div className={style["button-text"]}>{label}</div>
            <Icon iconType={iconType} iconColor={iconColor} />
          </>
        )}
      </button>
    </div>
  );
}
