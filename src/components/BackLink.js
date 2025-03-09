import CONSTANTS from "../constants";
import style from "./BackLink.module.css"

export default function BackLink({linkText, setNewGearStage}) {
  const handleOnClick = () => {
    setNewGearStage(CONSTANTS.gearListState.LIST);
  }

  return (
  <div>
    <p className={style['backlink-text']} onClick={handleOnClick}>{linkText}</p>
  </div>
  );
}