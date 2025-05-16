import { useState } from "react";
import GearListView from "./GearListView"
import GearListTemplate from "./GearListTemplate";
import CreateGearListDetails from "./CreateGearListDetails";
import CONSTANTS from "../constants"

export default function GearList({
  userGearLists, // Existing gear lists
  setUserGearLists, // Set existing gear lists
  handleSetModalState, // For Delete List
  handleSetPreparePanelList, // For Prepare side panel
}) {
	const [newGearList, setNewGearList] = useState([]);
	const [newGearStage, setNewGearStage] = useState(CONSTANTS.gearListState.LIST);

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
					handleSetPreparePanelList={handleSetPreparePanelList}
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