import style from "./Icon.module.css";

export const ICON_TYPES = {
  CROSS: "cross",
};

export default function Icon({ iconType, iconColor }) {
  return (
    <div className={style["icon-wrapper"]}>
      {/* For CROSS */}
      {iconType === ICON_TYPES.CROSS && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M14.7141 6.46447L11.1786 10L14.7141 13.5355L13.5356 14.714L10.0001 11.1785L6.46453 14.714L5.28602 13.5355L8.82156 10L5.28602 6.46447L6.46453 5.28596L10.0001 8.82149L13.5356 5.28595L14.7141 6.46447Z"
            fill={iconColor} // Define icon color here
          />
        </svg>
      )}
    </div>
  );
}
