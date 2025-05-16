import CONSTANTS from "../constants";
import Button, {
  BUTTON_TYPES,
  ICON_POSITION,
  ICON_TYPES,
} from "./atomic/button/Button";
import Checkbox from "./atomic/Checkbox";
import style from "./PreparePanel.module.css";

export default function PreparePanel({ editingList, handleSetEditPanelList }) {
  async function unprepareItem(itemId) {
    await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Prepared: false,
      }),
    });

    // update state
    const updatedItems = editingList.items.map((item) =>
      item.id === itemId ? { ...item, prepared: false } : item,
    );
    handleSetEditPanelList({ ...editingList, items: updatedItems });
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
    const updatedItems = editingList.items.map((item) =>
      item.id === itemId ? { ...item, prepared: true } : item,
    );
    handleSetEditPanelList({ ...editingList, items: updatedItems });
  }

  return (
    <div className={style["full-screen-cover"]}>
      <div className={style["panel"]}>
        <div className={style["header"]}>
          <div className={style["title"]}>
            <div className={style["title-text"]}>{editingList.listName}</div>
            <Button
              iconPosition={ICON_POSITION.ICON_ONLY}
              iconType={ICON_TYPES.CROSS}
              buttonType={BUTTON_TYPES.TERTIARY}
              callBack={() => handleSetEditPanelList(null)}
            />
          </div>
          <div className={style["subtitle"]}>
            Total: <b>{editingList.items.length}</b> items
          </div>
        </div>
        <table className={style["table"]}>
          <thead className={style["thead"]}>
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
          <tbody className={style["tbody"]}>
            {editingList.items.map((item) => (
              <tr key={item.id} className={style["tr"]}>
                <td className={style["td-checkbox"]}>
                  <Checkbox
                    checked={item.prepared}
                    handleCheck={() => prepareItem(item.id)}
                    handleUnCheck={() => unprepareItem(item.id)}
                  />
                </td>
                <td className={style["td-text"]}>{item.name}</td>
                <td className={style["td-text"]}>
                  {item.note ? item.note : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
