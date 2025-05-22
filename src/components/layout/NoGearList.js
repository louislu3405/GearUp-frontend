// No Gear List Data component.
//
// Rendered on GearListView when no gear list is available.
import style from "./NoGearList.module.css";
import Button, { BUTTON_TYPES, ICON_POSITION } from "../atomic/Button";

export default function NoGearList({
  // function for handling clicking Create a gear list button.
  // Pass callback from parent because Create a gear list button
  // is also used when there are existing gear lists.
  handleClickCreate,
}) {
  return (
    <div className={style["wrapper"]}>
      <div className={style["text-wrapper"]}>
        <div className={style["title"]}>No data yet.</div>
        <div className={style["text"]}>
          Click below to create your first gear list!
        </div>
      </div>
      <Button
        iconPosition={ICON_POSITION.NONE}
        buttonType={BUTTON_TYPES.PRIMARY}
        label={"Create a gear list"}
        callBack={handleClickCreate}
      />
    </div>
  );
}
