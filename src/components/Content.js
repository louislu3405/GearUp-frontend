import style from "./Content.module.css"
import NavPanel from "./NavPanel";
import CreateGearList from "./GearList";

export default function Content({ handleSetModalState }) {
  return (
    <div className={style.container}>
      <NavPanel />
      <div className={style["main-content"]}>
        <CreateGearList handleSetModalState={handleSetModalState} />
      </div>
    </div>
  );
}
