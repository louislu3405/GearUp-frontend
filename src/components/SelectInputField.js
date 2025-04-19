// Design System
import style from "./SelectInputField.module.css";

export default function SelectInputField({
  required, // bool, this input is required or not
  title, // string, title text
  placeholderValue, // string, input placeHolder value
  inputValue, // state of input value,
  setInputValue, // setState of input value
  helpText = "", // Help text, displayed below the input
}) {
  return (
    <div
      className={`${style["select-input-field-wrapper"]} ${required && inputValue === "" ? style["select-input-field-wrapper-warning"] : ""}`}
    >
      <div className={style["select-input-field-title-wrapper"]}>
        {required === true && (
          <div className={style["slect-input-field-required"]}>*</div>
        )}
        <div className={style["select-input-field-title"]}>{title}</div>
      </div>

      <div className={style["select-input-field-input-wrapper"]}>
        <input
          className={`${style["select-input-field-input"]} ${required && inputValue === "" ? style["select-input-field-input-warning"] : ""}`}
          type="text"
          placeholder={placeholderValue}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
      </div>
      {required && inputValue === "" && (
        <div className={style["select-input-field-help-text"]}>{helpText}</div>
      )}
    </div>
  );
}
