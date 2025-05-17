import style from "./Content.module.css";
import NavPanel from "./NavPanel";
import GearList from "./GearList";

export default function Content({
  userGearLists, // Existing gear lists
  setUserGearLists, // Set existing gear lists
  handleSetModalState, // For Delete List modal
  handleSetPreparePanelList, // For Prepare side panel
}) {
  return (
    <div className={style.container}>
      <NavPanel />
      <div className={style["main-content"]}>
        <GearList
          userGearLists={userGearLists}
          setUserGearLists={setUserGearLists}
          handleSetModalState={handleSetModalState}
          handleSetPreparePanelList={handleSetPreparePanelList}
        />
      </div>
    </div>
  );
}
