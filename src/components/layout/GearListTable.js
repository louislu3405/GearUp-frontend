// Table layout for displaying existing Gear Lists
import { useState, useEffect, useRef } from "react";

import ProgressBar from "../atomic/ProgressBar";
import SearchBox from "../atomic/SearchBox";
import Icon, { ICON_TYPES } from "../icons/Icon";
import style from "./GearListTable.module.css";
import DropdownMenu from "../atomic/DropdownMenu";

const formatDatetime = (dateString) => {
  const date = new Date(dateString);
  let options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hours12: true,
  };

  // format string with commas
  // eslint-disable-next-line no-undef
  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  // Remove the first comma, and replace the second comma with •
  formattedDate = formattedDate.replace(",", "").replace(",", " •");

  return formattedDate;
};

const calculateProgressPercentage = (items) => {
  let prepared_count = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].prepared) {
      prepared_count++;
    }
  }
  return Math.round((prepared_count / items.length) * 100);
};

export default function GearListTable({
  gearLists,
  handleClickListName, // For Prepare side panel
  handleClickEdit, // Edit button in dropdown
  handleClickDupldate, // Duplicate button in dropdown
  handleClickDelete, // Delete button in dropdown
}) {
  const [searchText, setSearchText] = useState("");
  // For filter gear lists with search text
  const [filteredGearLists, setFilteredGearLists] = useState(gearLists);
  // For dropdown display
  const [visibleDropdownId, setVisibleDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Refresh list after response received
  useEffect(() => {
    setFilteredGearLists(gearLists);
  }, [gearLists]);

  // Capture ref
  useEffect(() => {
    if (visibleDropdownId) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [visibleDropdownId]);

  const handleChangeSearchText = (value) => {
    setSearchText(value);
  };

  const handleClickSearch = () => {
    // Filter by search text
    setFilteredGearLists(
      gearLists.filter((list) =>
        list.listName.toLowerCase().startsWith(searchText.toLowerCase()),
      ),
    );
  };

  const handleClickOutsideDropdown = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setVisibleDropdownId(null);
    }
  };

  return (
    <div className={style["wrapper"]}>
      <div className={style["toolbar"]}>
        <div className={style["title"]}>My gear list</div>
        <div className={style["search-tool"]}>
          <SearchBox
            searchText={searchText}
            handleChangeSearchText={handleChangeSearchText}
            handleClickSearch={handleClickSearch}
          />
        </div>
      </div>
      <div className={style["table-wrapper"]}>
        <table className={style["table"]}>
          <thead>
            <tr className={style["table-head-row"]}>
              <th className={style["th-small"]}></th>
              <th className={style["th-regular"]}>
                <div className={style["divider"]} />
                Name
              </th>
              <th className={style["th-regular"]}>
                <div className={style["divider"]} />
                Activity
              </th>
              <th className={style["th-regular"]}>
                <div className={style["divider"]} />
                Progress
              </th>
              <th className={style["th-regular"]}>
                <div className={style["divider"]} />
                Description
              </th>
              <th className={style["th-regular"]}>
                <div className={style["divider"]} />
                Last modified
              </th>
              <th className={style["th-small"]}>
                <div className={style["divider"]} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredGearLists.map(
              (gearList) =>
                gearList.image === null && (
                  <tr key={gearList.id} className={style["table-body-row"]}>
                    <td className={style["td-small"]}></td>
                    <td
                      className={`${style["td-regular"]} ${style["td-name"]}`}
                      onClick={() => handleClickListName(gearList)}
                    >
                      {gearList.listName}
                    </td>
                    <td className={style["td-regular"]}>{gearList.activity}</td>
                    <td
                      className={`${style["td-regular"]} ${style["td-progress"]}`}
                    >
                      <div className={style["progress-wrapper"]}>
                        <ProgressBar
                          percentage={calculateProgressPercentage(
                            gearList.items,
                          )}
                        />
                      </div>
                      <div className={style["percentage-wrapper"]}>
                        {calculateProgressPercentage(gearList.items)}%
                      </div>
                    </td>
                    <td className={style["td-regular"]}>
                      {gearList.description === null
                        ? "--"
                        : gearList.description}
                    </td>
                    <td className={style["td-regular"]}>
                      {formatDatetime(gearList.lastEdited)}
                    </td>
                    <td className={`${style["td-small"]} ${style["td-icon"]}`}>
                      <div onClick={() => setVisibleDropdownId(gearList.id)}>
                        <Icon
                          iconType={ICON_TYPES.KABAB}
                          iconColor={"#3B3B3B"}
                        />
                      </div>
                      {visibleDropdownId === gearList.id && (
                        <div
                          className={style["float-dropdown"]}
                          ref={dropdownRef}
                        >
                          <DropdownMenu
                            items={[
                              {
                                text: "Edit",
                                callBack: () => {
                                  setVisibleDropdownId(null);
                                  handleClickEdit(gearList);
                                },
                              },
                              {
                                text: "Duplicate",
                                callBack: () => {
                                  setVisibleDropdownId(null);
                                  handleClickDupldate(gearList);
                                },
                              },
                              {
                                text: "Delete",
                                callBack: () => {
                                  setVisibleDropdownId(null);
                                  handleClickDelete(gearList.id);
                                },
                              },
                            ]}
                          ></DropdownMenu>
                        </div>
                      )}
                    </td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
