import style from "./Checkbox.module.css";

export default function Checkbox({
  checked, // variable for defining if the checkbox is checked
  handleCheck, // handle check a checkbox (uncheck -> check)
  handleUnCheck, // handle uncheck a checkbox (check -> uncheck)
}) {
  return (
    <>
      {checked && (
        <div className={style["check"]} onClick={() => handleUnCheck()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5.25009 9.43339L2.81759 7.00089L1.98926 7.82339L5.25009 11.0842L12.2501 4.08422L11.4276 3.26172L5.25009 9.43339Z"
              fill="white"
            />
          </svg>
        </div>
      )}
      {!checked && (
        <div className={style["uncheck"]} onClick={() => handleCheck()} />
      )}
    </>
  );
}
