import CONSTANTS from "../constants";
import { useState, useEffect, useRef } from "react";

import style from "./GearListView.module.css";
import Button, { BUTTON_TYPES, ICON_POSITION } from "./atomic/button/Button";
import ContentTitle from "./ContentTitle";
import NoGearList from "./layout/NoGearList";
import GearListTable from "./layout/GearListTable";

export default function GearListView({
  setNewGearStage,
  userGearLists,
  setUserGearLists,
  setNewGearList,
  handleSetModalState, // for popup modal control
}) {
  const [visibleDropdownId, setVisibleDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // TODO: fetch the gear-lists by user id
  useEffect(() => {
    async function getUserGearList() {
      let response = await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`);
      let response_json = await response.json();

      setUserGearLists(response_json.gearLists);
    }
    getUserGearList();
  }, [setUserGearLists]);

  useEffect(() => {
    if (visibleDropdownId != null) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [visibleDropdownId]);

  const handleClickCreateGearList = () => {
    setNewGearStage(CONSTANTS.gearListState.TEMPLATE);
  };

  const handleClickOutsideDropdown = (event) => {
    // ref.current is the referred element
    if (!dropdownRef.current.contains(event.target)) {
      setVisibleDropdownId(null);
    }
  };

  const handleEditList = (userGearList) => {
    setNewGearList(userGearList);
    setNewGearStage(CONSTANTS.gearListState.DETAILS);
  };

  const handleDuplicatelist = async (userGearList) => {
    async function duplicate_list() {
      const new_gear_list = { ...userGearList };

      delete new_gear_list.id;
      let response = await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...new_gear_list,
        }),
      });

      let response_json = await response.json();
      setUserGearLists([...userGearLists, response_json]);
    }

    duplicate_list();
    setVisibleDropdownId(null);
  };

  const handleDeleteList = async (listId) => {
    async function delete_list() {
      await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${listId}`, {
        method: "DELETE",
      });
    }
    await delete_list();

    setUserGearLists(
      userGearLists.filter((userGearList) => userGearList.id !== listId),
    );

    setVisibleDropdownId(null);
  };

  const handleClickDelete = (listId) => {
    handleSetModalState(handleDeleteList, [listId]);
  };

  return (
    <>
      <div className={style["header-wrapper"]}>
        <ContentTitle
          title={"Gear List"}
          text={
            "Gear list shows what the gears you need for all your activities."
          }
        />
        <div>
          <Button
            iconPosition={ICON_POSITION.NONE}
            buttonType={BUTTON_TYPES.PRIMARY}
            label="Create a gear list"
            callBack={() => handleClickCreateGearList()}
          />
        </div>
      </div>

      {userGearLists.filter((gearList) => !gearList.image).length !== 0 ? (
        <>

          <GearListTable
            gearLists={userGearLists}
            handleClickEdit={handleEditList}
            handleClickDupldate={handleDuplicatelist}
            handleClickDelete={handleClickDelete}
          ></GearListTable>
        </>
      ) : (
        <NoGearList handleClickCreate={handleClickCreateGearList} />
      )}
    </>
  );
}
