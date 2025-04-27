import style from "./Icon.module.css";

export const ICON_TYPES = {
  CROSS: "cross",
  KABAB: "kabab",
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
      {/* For KABAB (three dots) */}
      {iconType === ICON_TYPES.KABAB && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <path
            d="M8.09375 3.125C8.09375 3.72906 7.60406 4.21875 7 4.21875C6.39594 4.21875 5.90625 3.72906 5.90625 3.125C5.90625 2.52094 6.39594 2.03125 7 2.03125C7.60406 2.03125 8.09375 2.52094 8.09375 3.125Z"
            fill={iconColor}
          />
          <path
            d="M8.09375 7.5C8.09375 8.10406 7.60406 8.59375 7 8.59375C6.39594 8.59375 5.90625 8.10406 5.90625 7.5C5.90625 6.89594 6.39594 6.40625 7 6.40625C7.60406 6.40625 8.09375 6.89594 8.09375 7.5Z"
            fill={iconColor}
          />
          <path
            d="M8.09375 11.875C8.09375 12.4791 7.60406 12.9688 7 12.9688C6.39594 12.9688 5.90625 12.4791 5.90625 11.875C5.90625 11.2709 6.39594 10.7812 7 10.7812C7.60406 10.7812 8.09375 11.2709 8.09375 11.875Z"
            fill={iconColor}
          />
        </svg>
      )}
    </div>
  );
}
