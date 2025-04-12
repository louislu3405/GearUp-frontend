import CONSTANTS from "../constants";
import style from "./BackLink.module.css";

export default function BackLink({ linkText, setNewGearStage }) {
  const handleOnClick = () => {
    setNewGearStage(CONSTANTS.gearListState.LIST);
  };

  return (
    <div className={style["backlink-wrapper"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <g clipPath="url(#clip0_1233_1128)">
          <path
            d="M12.842 14.325L9.02533 10.5L12.842 6.675L11.667 5.5L6.66699 10.5L11.667 15.5L12.842 14.325Z"
            fill="#116A8D"
          />
        </g>
        <defs>
          <clipPath id="clip0_1233_1128">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <p className={style["backlink-text"]} onClick={handleOnClick}>
        {linkText}
      </p>
    </div>
  );
}
