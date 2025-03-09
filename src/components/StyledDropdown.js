import style from "./StyledDropdown.module.css"

export default function StyledDropdown({texts, callBacks, args, reference}) {

  const combinedItems = texts.map((text, index) => ({
    text: text,
    callBack: callBacks[index],
    arg: args[index]
  }));

  // item: {text, callBackFunction}
  return (
    <div className={style['styledDropdown-wrapper']}>
      <ul className={style['styledDropdown-ul']} ref={reference}>
        {combinedItems.map((item) => 
          <li
            key={item.text}
            onClick={() => item.callBack(...item.arg)}
            className={style['styledDropdown-li']}>
            {item.text}
          </li>
        )}
      </ul>
    </div>
  );
};