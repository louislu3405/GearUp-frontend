import CONSTANTS from "../constants";

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
		<div>
			<h1>{newGearList.id === undefined ? "Create a gear list" : `Edit a gear list`}</h1>
			<input
				type="text"
				placeholder="Name your list"
				value={newGearList.listName}
				onChange={(e) => handleChangeGearListName(e.target.value)}
			/>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						newGearList.items.map
						(
							gearItem =>
								<tr key={gearItem.id}>
									<td>
										<input
										type="text"
										value={gearItem.name}
										onChange={(e) => handleChangeGearItemName(gearItem.id, e.target.value)}
										/>
									</td>
									<td>
										<input 
											type="Checkbox"
											checked={gearItem.prepared}
											onChange={() => handlePreparedCheckboxChange(gearItem.id)}
										/>
										{gearItem.prepared ? "Prepared" : "Unprepared"}
									</td>
									<td onClick={() => handleRemoveGearItem(gearItem.id)}>Remove</td>
								</tr>
						)
					}
				</tbody>
			</table>
			<p onClick={() => handleAddANewRow()}>Add new row</p>
			<button onClick={() => handleClickCancel()}>Cancel</button>
			<button onClick={() => handleClickSave()}>Save</button>
		</div>
	);
};