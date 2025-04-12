import CONSTANTS from "../constants";
import style from "./GearListTemplateCard.module.css";

export default function GearListTemplateCard({
  title, // Template gear list name
  image_path, // Template image path
  selectCard, // Callback function for the select button
  selectCardArg, // Arguments for button callback function
}) {
  return (
    <div
      className={style["gear-list-template-card-wrapper"]}
      onClick={() => selectCard(selectCardArg)}
    >
      <div className={style["gear-list-template-card-header"]}>
        <div className={style["gear-list-template-card-title"]}>{title}</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
          >
            <path
              d="M17.5837 8.49935C17.5837 3.89935 13.8503 0.166016 9.25033 0.166016C4.65033 0.166016 0.916992 3.89935 0.916992 8.49935C0.916992 13.0993 4.65033 16.8327 9.25033 16.8327C13.8503 16.8327 17.5837 13.0993 17.5837 8.49935ZM2.58366 8.49935C2.58366 4.81602 5.56699 1.83268 9.25033 1.83268C12.9337 1.83268 15.917 4.81602 15.917 8.49935C15.917 12.1827 12.9337 15.166 9.25033 15.166C5.56699 15.166 2.58366 12.1827 2.58366 8.49935ZM12.5837 8.49935L9.25033 11.8327L8.07533 10.6577L9.39199 9.33268H5.91699V7.66602H9.39199L8.06699 6.34102L9.25033 5.16602L12.5837 8.49935Z"
              fill="#116A8D"
            />
          </svg>
        </div>
      </div>
      <div className={style["gear-list-template-card-image-wrapper"]}>
        <img
          src={`${CONSTANTS.BACKEND_ROOT_URL}/images/${image_path}`}
          style={{ height: "9.375rem", width: "9.375rem" }}
        ></img>
      </div>
    </div>
  );
}
