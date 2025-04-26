import { useEffect, useState } from "react";
import style from "./GearListTemplate.module.css";
import CONSTANTS from "../constants";

import GearListTemplateCard from "./GearListTemplateCard";
import ContentTitle from "./ContentTitle";
import BackLink from "./BackLink";

export default function GearListTemplate({ setNewGearList, setNewGearStage }) {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    async function fetchTemplates() {
      let res = await fetch(`${CONSTANTS.BACKEND_ROOT_URL}/gear-lists`);
      let res_json = await res.json();
      setTemplates(
        res_json.gearLists.filter((gearList) => gearList.image !== null),
      );
    }
    fetchTemplates();
  }, []);

  function selectTemplate(template) {
    template = { ...template }; // shallow copy, only the top-level properties are copied
    template.listName = "";
    delete template.id;
    let id = 0;
    template.items = template.items.map((gearItem) => {
      gearItem.id = id;
      id++;
      return gearItem;
    });
    setNewGearList(template);
    setNewGearStage(CONSTANTS.gearListState.DETAILS);
  }

  return (
    <div className={style.TemplateContent}>
      <div>
        <BackLink
          linkText={"Back to gear list"}
          setNewGearStage={setNewGearStage}
        />
        <ContentTitle
          title={"Create a gear list"}
          text={"Select an activity to start"}
        />
      </div>
      <div className={style.TemplateBox}>
        {templates.map((template) => (
          <GearListTemplateCard
            key={template.listName}
            title={template.listName}
            image_path={template.image}
            selectCard={selectTemplate}
            selectCardArg={template}
          />
        ))}
      </div>
    </div>
  );
}
