import style from "./Content.module.css"
import NavPanel from "./NavPanel";
import CreateGearList from "./GearList";

export default function Content({modalState, setModalState}) {
  return (
    <div className={style.container}>
      <NavPanel/>
      <div className={style['main-content']}>
        <CreateGearList
          modalState={modalState}
          setModalState={setModalState}
        />
      </div>
    </div>
  )
}