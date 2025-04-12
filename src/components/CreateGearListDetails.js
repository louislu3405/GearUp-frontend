import { useState, useRef, useEffect } from "react";

import style from "./CreateGearListDetails.module.css"
import CONSTANTS from "../constants";
import BackLink from "./BackLink";
import ContentTitle from "./ContentTitle";
import StyledButton from "./StyledButton";

export default function CreateGearListDetails({newGearList, setNewGearList, setNewGearStage}) {

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
			document.removeEventListener("mousedown", handleClickOutsideName)
		}

		

		return () => {
			document.removeEventListener("mousedown", handleClickOutsideName)
		}
	}, [editingNameItemId]);

	const handleChangeGearListName = (newGearListName) => {
		setNewGearList({
			...newGearList,
			listName: newGearListName
		});
	}

	const handleChangeGearItemName = (id, newGearItemName) => {
		const updatedItems = newGearList.items.map((gearItem) => {
			if (id === gearItem.id) {
				gearItem.name = newGearItemName;
			}
			return gearItem;
		})
		const updatedNewGearList = {
			...newGearList,
			items: updatedItems
		}
		setNewGearList(updatedNewGearList);
	}

	const handlePreparedCheckboxChange = (id) => {
		const updatedItems = newGearList.items.map((gearItem) => {
			if (id === gearItem.id) {
				gearItem.prepared = !gearItem.prepared;
			}
			return gearItem;
		});
		const updatedNewGearList = {
			...newGearList,
			items: updatedItems
		}
		setNewGearList(updatedNewGearList);
	};

	const handleRemoveGearItem = (id) => {
		setNewGearList(
			{
				...newGearList,
				items: newGearList.items.filter(item => item.id !== id)
			}
		)
	}

	const handleAddANewRow = () => {
		let addedNewGearList;
		if (newGearList.items.length === 0)
		{
			addedNewGearList = {
				...newGearList,
				items:[{
					id: 0,
					name: "New Item",
					prepared: false
				}]
			}
		}
		else
		{
			addedNewGearList = {
				...newGearList,
				items:[
					...newGearList.items,
					{id: newGearList.items[newGearList.items.length - 1].id + 1, name: "New Item", prepared: false}
				]
			}
		}
		setNewGearList(addedNewGearList);
	}

	const handleClickCancel = () => {
		setNewGearList([]);
		setNewGearStage(newGearList.id === undefined? CONSTANTS.gearListState.TEMPLATE : CONSTANTS.gearListState.LIST);
	}

	const handleClickSave = async () => {
		const modified_items = newGearList.items.map(({id, ...rest}) => rest);

		// POST: Create a new list
		async function postNewList() {
			await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newGearList,
					items: modified_items
				})
			});
		}

		// PUT: Edit existing list
		async function putExistedList() {
			// TODO: Merge two calls to one
			await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${newGearList.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"listName": newGearList.listName,
					"activity": newGearList.activity,
					"isTemplate": newGearList.isTemplate
				})
			});
			await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists/${newGearList.id}/items`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"gearItems": [...newGearList.items]
			})
			})
		}

		if (newGearList.id === undefined)
		{
			await postNewList();
		}
		else
		{
			await putExistedList();
		}

		setNewGearStage(CONSTANTS.gearListState.LIST);
	}

	const handleClickOutsideName = (event) => {
		// Handles ref when mouse clicks outside of the item name td.
		// Used to switch item name <input> back to <p>
		if (!nameInputRef.current.contains(event.target)) {
			setEditingNameItemId(null);
		}
	};

	return (
		<div className={style['gear-list-details-wrapper']}>
			<div className={style['gear-list-details-title-wrapper']}>
				<BackLink linkText={"Back to My gear list"} setNewGearStage={setNewGearStage}/>
				<ContentTitle
					title={newGearList.id === undefined ? "Create a gear list" : "Edit a gear list"}
					text={null}
				/>
			</div>
			<div className={style['gear-list-details-main-content-wrapper']}>
				<div classname={style['gear-list-details-list-name-wrapper']}>
					<p className={style['gear-list-name-input-title']}>Name</p>
					<input
						type="text"
						placeholder="Name your list"
						value={newGearList.listName}
						onChange={(e) => handleChangeGearListName(e.target.value)}
						className={style['gear-list-name-input']}
					/>
				</div>
				<table className={style['gear-list-details-table']}>
					<thead className={style['gear-list-details-table-thead']}>
						<tr>
							<th className={style['gear-list-details-table-th']}>Name</th>
							<th className={style['gear-list-details-table-th']}>Status</th>
							<th className={style['gear-list-details-table-th-shrink']}></th>
						</tr>
					</thead>
					<tbody>
						{
							newGearList.items.map
							(
								gearItem =>
									<tr key={gearItem.id}>
										<td 
											className={style['gear-list-deatils-table-td']}>
											{editingNameItemId === gearItem.id ? 
												<input
												type="text"
												value={gearItem.name}
												className={style['gear-list-details-table-input']}
												onChange={(e) => handleChangeGearItemName(gearItem.id, e.target.value)}
												ref={nameInputRef}
												/> :
												<p 
													className={style['gear-list-details-table-name-p']} 
													onClick={() => setEditingNameItemId(gearItem.id)}>
													{gearItem.name}
												</p>
											}

										</td>
										<td  className={style['gear-list-deatils-table-td']}>
											<input 
												type="Checkbox"
												checked={gearItem.prepared}
												onChange={() => handlePreparedCheckboxChange(gearItem.id)}
											/>
											{gearItem.prepared ? "Prepared" : "Unprepared"}
										</td>
										<td
											onClick={() => handleRemoveGearItem(gearItem.id)}
											className={style['gear-list-deatils-table-td']}
										>Remove
										</td>
									</tr>
							)
						}
					</tbody>
				</table>
				<div className={style['gear-list-details-table-button-wrapper']}>
					<p onClick={() => handleAddANewRow()}>Add new row</p>
					<p>Reset status</p>
				</div>
			</div>
			<div className={style['footer-button-wrapper']}>
				<StyledButton text={"Cancel"} onClick={() => handleClickCancel()} ></StyledButton>
				<StyledButton text={"Save"} onClick={() => handleClickSave()} ></StyledButton>
			</div>
		</div>
	);
};