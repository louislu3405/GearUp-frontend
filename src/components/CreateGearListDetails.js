import { useState, useRef, useEffect } from "react";

import style from "./CreateGearListDetails.module.css";
import CONSTANTS from "../constants";
import BackLink from "./BackLink";
import ContentTitle from "./ContentTitle";

import Button, { BUTTON_TYPES, ICON_POSITION } from "./Button";
import CreateGearListForm from "./CreateGearListForm";

export default function CreateGearListDetails({
  newGearList,
  setNewGearList,
  setNewGearStage,
}) {
  // Following two lines are defined for edit item name DOM change
  const [editingNameItemId, setEditingNameItemId] = useState(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editingNameItemId != null) {
      document.addEventListener("mousedown", handleClickOutsideName);
      // allow immediate editing
      nameInputRef.current.focus();
      nameInputRef.current.select();
    } else {
      document.removeEventListener("mousedown", handleClickOutsideName);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideName);
    };
  }, [editingNameItemId]);

  const handleClickCancel = () => {
    setNewGearList([]);
    setNewGearStage(
      newGearList.id === undefined
        ? CONSTANTS.gearListState.TEMPLATE
        : CONSTANTS.gearListState.LIST,
    );
  };

  const handleClickSave = async () => {
    // eslint-disable-next-line no-unused-vars
    const modified_items = newGearList.items.map(({ id, ...rest }) => rest);

    // POST: Create a new list
    async function postNewList() {
      await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newGearList,
          items: modified_items,
        }),
      });
    }

    // PUT: Edit existing list
    async function putExistedList() {
      // TODO: Merge two calls to one
      await fetch(
        `${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${newGearList.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName: newGearList.listName,
            activity: newGearList.activity,
            description: newGearList.description,
          }),
        },
      );
      await fetch(
        `${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${newGearList.id}/items`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gearItems: [...newGearList.items],
          }),
        },
      );
    }

    if (newGearList.id === undefined) {
      await postNewList();
    } else {
      await putExistedList();
    }

    setNewGearStage(CONSTANTS.gearListState.LIST);
  };

  const handleClickOutsideName = (event) => {
    // Handles ref when mouse clicks outside of the item name td.
    // Used to switch item name <input> back to <p>
    if (!nameInputRef.current.contains(event.target)) {
      setEditingNameItemId(null);
    }
  };

  return (
    <div className={style["gear-list-details-wrapper"]}>
      <div className={style["gear-list-details-title-wrapper"]}>
        <BackLink
          linkText={"Back to My gear list"}
          setNewGearStage={setNewGearStage}
        />
        <ContentTitle
          title={
            newGearList.id === undefined
              ? `Create a ${newGearList.activity} gear list`
              : `Edit ${newGearList.listName}`
          }
          text={null}
        />
      </div>
      <CreateGearListForm
        newGearList={newGearList}
        setNewGearList={setNewGearList}
      ></CreateGearListForm>
      <div className={style["footer-button-wrapper"]}>
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.SECONDARY}
          label={"Cancel"}
          callBack={() => handleClickCancel()}
        />
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.PRIMARY}
          label={"Save"}
          callBack={() => handleClickSave()}
        />
      </div>
    </div>
  );
}
