import style from "./StyledButton.module.css"

export default function StyledButton({text, onClick}) {
  return (
    <button className={style.styledButton} onClick={onClick}>
      {text}
    </button>
  );
}