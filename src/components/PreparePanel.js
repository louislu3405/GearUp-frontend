import { useState } from "react";
import CONSTANTS from "../constants";
import Button, {
  BUTTON_TYPES,
  ICON_POSITION,
  ICON_TYPES,
} from "./atomic/button/Button";
import Checkbox from "./atomic/Checkbox";
import Tooltip from "./atomic/Tooltip";
import style from "./PreparePanel.module.css";

export default function PreparePanel({
  preparingList, // Current preparing list
  handleSetPreparePanelList, // Set current preparing list
  userGearLists, // Gear Lists on the table view
  setUserGearLists, // Update the table view lists
}) {
  const [tootipId, setToolTipId] = useState(null);

  const updateUserGearLists = (updatedPreparingList) => {
    // Update Gear Lists table after check/uncheck
    const updatedLists = userGearLists.map((gearList) =>
      gearList.id === preparingList.id ? updatedPreparingList : gearList,
    );
    setUserGearLists(updatedLists);
  };

  async function unprepareItem(itemId) {
    await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Prepared: false,
      }),
    });

    // update state
    const updatedItems = preparingList.items.map((item) =>
      item.id === itemId ? { ...item, prepared: false } : item,
    );

    const updatedPreparingList = { ...preparingList, items: updatedItems };
    handleSetPreparePanelList(updatedPreparingList);

    // Update Gear Lists table
    updateUserGearLists(updatedPreparingList);
  }

  async function prepareItem(itemId) {
    await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Prepared: true,
      }),
    });

    // update state
    const updatedItems = preparingList.items.map((item) =>
      item.id === itemId ? { ...item, prepared: true } : item,
    );

    const updatedPreparingList = { ...preparingList, items: updatedItems };
    handleSetPreparePanelList(updatedPreparingList);

    // Update Gear Lists table
    updateUserGearLists(updatedPreparingList);
  }

  return (
    <div className={style["full-screen-cover"]}>
      <div className={style["panel"]}>
        <div className={style["header"]}>
          <div className={style["title"]}>
            <div className={style["title-text"]}>{preparingList.listName}</div>
            <Button
              iconPosition={ICON_POSITION.ICON_ONLY}
              iconType={ICON_TYPES.CROSS}
              buttonType={BUTTON_TYPES.TERTIARY}
              callBack={() => handleSetPreparePanelList(null)}
            />
          </div>
          <div className={style["subtitle"]}>
            Total: <b>{preparingList.items.length}</b> items
          </div>
        </div>
        <table className={style["table"]}>
          <thead>
            <tr className={style["tr-head"]}>
              <th className={style["th-empty"]} />
              <th className={style["th-text"]}>
                <div className={style["divider"]} />
                Item
              </th>
              <th className={style["th-text"]}>
                <div className={style["divider"]} />
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {preparingList.items.map((item) => (
              <tr key={item.id} className={style["tr"]}>
                <td className={style["td-checkbox"]}>
                  <Checkbox
                    checked={item.prepared}
                    handleCheck={() => prepareItem(item.id)}
                    handleUnCheck={() => unprepareItem(item.id)}
                  />
                </td>
                <td className={style["td-regular"]}>{item.name}</td>
                <td
                  className={style["td-regular"]}
                  onMouseEnter={() => setToolTipId(item.id)}
                  onMouseLeave={() => setToolTipId(null)}
                >
                  <div className={style["td-text"]}>
                    {item.note ? item.note : "--"}
                  </div>
                  {tootipId === item.id && (
                    <Tooltip promptText={item.note ? item.note : "--"} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
