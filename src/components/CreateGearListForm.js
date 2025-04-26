// A component of form for creating a new gear list.
import Button, { BUTTON_TYPES, ICON_POSITION, ICON_TYPES } from "./atomic/button/Button";
import style from "./CreateGearListForm.module.css";
import SelectInputField from "./SelectInputField";

export default function CreateGearListForm({
  newGearList, // state of the new gear list
  setNewGearList, // setState for changing newGearList
}) {
  const handleUpdateGearListName = (newGearListName) => {
    setNewGearList({
      ...newGearList,
      listName: newGearListName,
    });
  };

  const handleUpdateGearListDescription = (newDescription) => {
    setNewGearList({
      ...newGearList,
      description: newDescription,
    });
  };

  // const handleUpdateItemNote = (itemId, newItemNote) => {
  // };

  // For changing an item name
  const handleUpdateItemName = (itemId, newItemName) => {
    const updatedItems = newGearList.items.map((item, index) => {
      if (index === itemId) {
        return { ...item, name: newItemName };
      }
      return item;
    });

    setNewGearList({
      ...newGearList,
      items: updatedItems,
    });
  };

  const handleUpdateItemNote = (itemId, newItemNote) => {
    const updatedItems = newGearList.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, note: newItemNote };
      }
      return item;
    });
    setNewGearList({
      ...newGearList,
      items: updatedItems,
    });
  };

  // Remove an item, triggered by clicking X button
  const handleRemoveItem = (itemId) => {
    const updatedItems = newGearList.items.filter((item) => item.id !== itemId);
    setNewGearList({
      ...newGearList,
      items: updatedItems,
    });
  };

  // Add a new item
  const handleClickAddMore = () => {
    const updatedItems =
      newGearList.items.length === 0
        ? [{ id: 0, name: "", prepared: false }]
        : [
            ...newGearList.items,
            {
              id: newGearList.items[newGearList.items.length - 1].id + 1,
              name: "",
              prepared: false,
            },
          ];
    setNewGearList({
      ...newGearList,
      items: updatedItems,
    });
  };

  return (
    <div className={style["wrapper"]}>
      <div className={style["list-name-wrapper"]}>
        <div className={style["list-name"]}>
          <SelectInputField
            required={true}
            title={"Gear list name"}
            inputValue={newGearList.listName}
            setInputValue={handleUpdateGearListName}
            placeholderValue={"List name"}
            helpText={"Please enter list name."}
          />
        </div>
        <div className={style["input-wrapper"]}>
          <SelectInputField
            required={false}
            title={"Description"}
            inputValue={newGearList.description}
            setInputValue={handleUpdateGearListDescription}
            placeholderValue={"Add some notes for this list"}
          />
        </div>
      </div>
      <div className={style["items-wrapper"]}>
        {newGearList.items.map((gearItem) => (
          <div key={gearItem.Name} className={style["item-wrapper"]}>
            <div className={style["item-name"]}>
              <SelectInputField
                required={true}
                title={"Item"}
                inputValue={gearItem.name}
                setInputValue={(newItemName) =>
                  handleUpdateItemName(gearItem.id, newItemName)
                }
                placeholderValue={"Item name"}
                helpText={"Please enter item name."}
              />
            </div>
            <SelectInputField
              required={false}
              title={"Note"}
              inputValue={gearItem.note}
              setInputValue={(newItemNote) =>
                handleUpdateItemNote(gearItem.id, newItemNote)
              }
              placeholderValue={"Add some notes for this item"}
            />
            <Button
              iconPosition={ICON_POSITION.ICON_ONLY}
              iconType={ICON_TYPES.CROSS}
              buttonType={BUTTON_TYPES.TERTIARY}
              callBack={() => handleRemoveItem(gearItem.id)}
            />
          </div>
        ))}
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.SECONDARY}
          label={"Add more"}
          callBack={handleClickAddMore}
        />
      </div>
    </div>
  );
}
