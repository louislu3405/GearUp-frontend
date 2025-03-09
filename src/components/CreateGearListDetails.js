import style from "./CreateGearListDetails.module.css"
import CONSTANTS from "../constants";
import BackLink from "./BackLink";
import ContentTitle from "./ContentTitle";
import StyledButton from "./StyledButton";

export default function CreateGearListDetails({newGearList, setNewGearList, setNewGearStage}) {
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
					name: "",
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
					{id: newGearList.items[newGearList.items.length - 1].id + 1, name: "", prepared: false}
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
			await fetch("http://localhost:5066/gear-lists", {
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
			await fetch(`http://localhost:5066/gear-lists/${newGearList.id}`, {
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
			await fetch(`http://localhost:5066/gear-lists/${newGearList.id}/items`, {
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
					<p className={style['gear-list-name-text']}>Name</p>
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
										<td className={style['gear-list-deatils-table-td']}>
											<input
											type="text"
											value={gearItem.name}
											onChange={(e) => handleChangeGearItemName(gearItem.id, e.target.value)}
											/>
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