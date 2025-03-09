import style from "./StyledDropdown.module.css"

export default function StyledDropdown({texts, callBacks, args, reference}) {

  const combinedItems = texts.map((text, index) => ({
    text: text,
    callBack: callBacks[index],
    arg: args[index]
  }));

  // item: {text, callBackFunction}
  return (
    <ul className={style.styledDropdown} ref={reference}>
      {combinedItems.map((item) => 
        <li
          key={item.text}
          onClick={() => item.callBack(...item.arg)}>
          {item.text}
        </li>
      )}
    </ul>
  );
};