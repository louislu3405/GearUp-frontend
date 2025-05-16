import style from "./Content.module.css";
import NavPanel from "./NavPanel";
import CreateGearList from "./GearList";

export default function Content({
  handleSetModalState, // For Delete List modal
  handleSetEditPanelList, // For Prepare side panel
}) {
  return (
    <div className={style.container}>
      <NavPanel />
      <div className={style["main-content"]}>
        <CreateGearList
          handleSetModalState={handleSetModalState}
          handleSetEditPanelList={handleSetEditPanelList}
        />
      </div>
    </div>
  );
}
