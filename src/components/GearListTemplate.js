import { useEffect, useState } from "react";
import style from "./GearListTemplate.module.css"
import CONSTANTS from "../constants"

export default function GearListTemplate ({setNewGearList, setNewGearStage}) {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    async function fetchTemplates() {
      let res = await fetch("http://localhost:5066/gear-lists");
      let res_json = await res.json();
      setTemplates(res_json.gearLists.filter(gearList => gearList.isTemplate));
    }
    fetchTemplates();
  }, []);

  const handleClickBackToGearList = () => {
    setNewGearStage(CONSTANTS.gearListState.LIST);
  }

  function selectTemplate(template) {
    template = {...template}; // shallow copy, only the top-level properties are copied
    template.isTemplate = false;
    template.listName = "";
    delete template.id;
    let id = 0;
    template.items = template.items.map((gearItem) => {
      gearItem.id = id;
      id++;
      return gearItem;
    })
    setNewGearList(template);
    setNewGearStage(CONSTANTS.gearListState.DETAILS);
  };

  return (
    <div className={style.TemplateContent}>
    <p onClick={() => handleClickBackToGearList()}>Back to My gear list</p>
    <h1>Create a gear list </h1>
    <form>
      <input placeholder="Search a gear..."></input>
      <input type="submit" value="Search"></input>
    </form>
      <div className={style.TemplateBox}>
        {
          templates.map
          (
            template => 
            <div className={style.TemplateCard} key={template.listName}>
              <h3> {template.listName} </h3>
              <button onClick={() => selectTemplate(template)}>Select</button>
            </div> 
          )
        }
      </div>
    </div>
  );
};