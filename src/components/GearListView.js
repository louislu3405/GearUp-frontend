import CONSTANTS from "../constants"
import { useState, useEffect, useRef } from "react";

import Button, { BUTTON_TYPES, ICON_POSITION } from "./Button";
import StyledDropdown from "./StyledDropdown";
import ContentTitle from "./ContentTitle";
import style from "./GearListView.module.css";

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
    };
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
    }
  }, [visibleDropdownId])

  const handleClickCreateGearList = () => {
    setNewGearStage(CONSTANTS.gearListState.TEMPLATE);
  };

  const calculateUnpreparedGearCount = (items) => {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      if (!items[i].prepared) {
        count++;
      }
    }
    return count;
  };

  const formatDatetime = (dateString) => {
    const date = new Date(dateString);
    let options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hours12: true
    };

    // format string with commas
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    
    // Remove the first comma, and replace the second comma with •
    formattedDate = formattedDate.replace(",", "").replace(",", " •");

    return formattedDate;
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
    async function duplicate_list () {

      const new_gear_list = {...userGearList};

      delete new_gear_list.id;
      let response = await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ...new_gear_list
        })
      });

      let response_json = await response.json();
      setUserGearLists(
        [
          ...userGearLists,
          response_json
        ]
      )
    };

    duplicate_list();
    setVisibleDropdownId(null);
  };

  const handleDeleteList = async (listId) => {
    async function delete_list() {
      await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${listId}`, {
        method: "DELETE",
      });
    };
    await delete_list();

    setUserGearLists(userGearLists.filter((userGearList) => userGearList.id !== listId));

    setVisibleDropdownId(null);
  };

  const handleClickDelete = (listId) => {
    handleSetModalState(handleDeleteList, [listId]);
  };

  const dropdownTexts = [
    "Edit",
    "Duplicate",
    "Delete"
  ];

  const dropdownCallBacks = [
    handleEditList,
    handleDuplicatelist,
    handleClickDelete
  ]

  return (
    <>
      <ContentTitle title={"Gear List"} text={"Gear list shows what the gears you need for all your activities."}/>
      <div>
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.PRIMARY}
          label="Create a gear list"
          callBack={() => handleClickCreateGearList()}
        />
      </div>
      <div className={style['gear-list-table-wrapper']}>
        <h2 className={style['gear-list-table-title']}>My gear list</h2>
        <table className={style['gear-list-table']}>
          <thead className={style['gear-list-table-thead']}>
            <tr>
              <th className={style['gear-list-table-th']}>Name</th>
              <th className={style['gear-list-table-th']}>Activity</th>
              <th className={style['gear-list-table-th-shrink']}>Number of gears</th>
              <th className={style['gear-list-table-th-shrink']}>Unprepared</th>
              <th className={style['gear-list-table-th']}>Date Created</th>
              <th className={style['gear-list-table-th-shrink']}></th>
            </tr>
          </thead>
          <tbody>
            {userGearLists.map(
              userGearList =>
                userGearList.image === null && // Temporarily prevent showing template gear lists
                <tr key={userGearList.id} className={style['gear-list-table-tr']}>
                  <td className={style['gear-list-table-td']} style={{fontWeight: "700"}}>{userGearList.listName}</td>
                  <td className={style['gear-list-table-td']}>{userGearList.activity}</td>
                  <td className={style['gear-list-table-td']}>{userGearList.items.length}</td>
                  <td className={style['gear-list-table-td']}>{calculateUnpreparedGearCount(userGearList.items)}</td>
                  <td className={style['gear-list-table-td']}>{formatDatetime(userGearList.lastEdited)}</td>
                  <td className={style['gear-list-table-td']} style={{position: "relative"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" onClick={() => setVisibleDropdownId(userGearList.id)}>
                      <path d="M14.8975 3.43555C14.8975 4.67819 13.8901 5.68555 12.6475 5.68555C11.4048 5.68555 10.3975 4.67819 10.3975 3.43555C10.3975 2.19291 11.4048 1.18555 12.6475 1.18555C13.8901 1.18555 14.8975 2.19291 14.8975 3.43555Z" fill="black" />
                      <path d="M14.8975 12.4355C14.8975 13.6782 13.8901 14.6855 12.6475 14.6855C11.4048 14.6855 10.3975 13.6782 10.3975 12.4355C10.3975 11.1929 11.4048 10.1855 12.6475 10.1855C13.8901 10.1855 14.8975 11.1929 14.8975 12.4355Z" fill="black" />
                      <path d="M14.8975 21.4355C14.8975 22.6782 13.8901 23.6855 12.6475 23.6855C11.4048 23.6855 10.3975 22.6782 10.3975 21.4355C10.3975 20.1929 11.4048 19.1855 12.6475 19.1855C13.8901 19.1855 14.8975 20.1929 14.8975 21.4355Z" fill="black" />
                    </svg>
                    {
                      // ... dropdown
                      visibleDropdownId === userGearList.id &&
                      <StyledDropdown
                        texts={dropdownTexts}
                        callBacks={dropdownCallBacks}
                        args={[
                          [userGearList],
                          [userGearList],
                          [userGearList.id]
                        ]}
                        reference={dropdownRef}
                      />
                    }

                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};