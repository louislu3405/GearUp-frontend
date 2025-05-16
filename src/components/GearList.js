import { useState } from "react";
import GearListView from "./GearListView"
import GearListTemplate from "./GearListTemplate";
import CreateGearListDetails from "./CreateGearListDetails";
import CONSTANTS from "../constants"

export default function CreateGearList({
  handleSetModalState, // For Delete List
  handleSetEditPanelList, // For Prepare side panel
}) {
	const [newGearList, setNewGearList] = useState([]);
	const [newGearStage, setNewGearStage] = useState(CONSTANTS.gearListState.LIST);
	const [userGearLists, setUserGearLists] = useState([]);

	return (
		<>
			{
				newGearStage === CONSTANTS.gearListState.LIST && 
				<GearListView
					setNewGearStage={setNewGearStage}
					userGearLists={userGearLists}
					setUserGearLists={setUserGearLists}
					setNewGearList={setNewGearList}
					handleSetModalState={handleSetModalState}
					handleSetEditPanelList={handleSetEditPanelList}
				/>
			}
			{
				newGearStage === CONSTANTS.gearListState.TEMPLATE && 
				<GearListTemplate 
					setNewGearList={setNewGearList}
					setNewGearStage={setNewGearStage}
				/>
			}
			{
				newGearStage === CONSTANTS.gearListState.DETAILS && 
				<CreateGearListDetails
					newGearList={newGearList}
					setNewGearList={setNewGearList}
					setNewGearStage={setNewGearStage}
				/>
			}
		</>
	)
};