// Search box: An input box and a search button
import style from "./SearchBox.module.css";

export default function SearchBox({
  searchText, // state for tracking input value (search text)
  handleChangeSearchText, // handle changing search text
  handleClickSearch, // handle clicking the search icon
}) {
  return (
    <div className={style["wrapper"]}>
      <div className={style["input-wrapper"]}>
        <input
          className={style["searchbox-input"]}
          type="text"
          placeholder="Input search text"
          value={searchText}
          onChange={(e) => handleChangeSearchText(e.target.value)}
        />
      </div>
      <div className={style["icon-wrapper"]} onClick={handleClickSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <mask
            id="mask0_1916_882"
            // style={"mask-type:alpha"}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="14"
            height="15"
          >
            <rect y="0.525391" width="14" height="14" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_1916_882)">
            <path
              d="M11.4333 12.8672L7.75833 9.19219C7.46667 9.42552 7.13125 9.61024 6.75208 9.74635C6.37292 9.88247 5.96944 9.95052 5.54167 9.95052C4.48194 9.95052 3.58507 9.58351 2.85104 8.84948C2.11701 8.11545 1.75 7.21858 1.75 6.15885C1.75 5.09913 2.11701 4.20226 2.85104 3.46823C3.58507 2.7342 4.48194 2.36719 5.54167 2.36719C6.60139 2.36719 7.49826 2.7342 8.23229 3.46823C8.96632 4.20226 9.33333 5.09913 9.33333 6.15885C9.33333 6.58663 9.26528 6.9901 9.12917 7.36927C8.99306 7.74844 8.80833 8.08385 8.575 8.37552L12.25 12.0505L11.4333 12.8672ZM5.54167 8.78385C6.27083 8.78385 6.89062 8.52865 7.40104 8.01823C7.91146 7.50781 8.16667 6.88802 8.16667 6.15885C8.16667 5.42969 7.91146 4.8099 7.40104 4.29948C6.89062 3.78906 6.27083 3.53385 5.54167 3.53385C4.8125 3.53385 4.19271 3.78906 3.68229 4.29948C3.17188 4.8099 2.91667 5.42969 2.91667 6.15885C2.91667 6.88802 3.17188 7.50781 3.68229 8.01823C4.19271 8.52865 4.8125 8.78385 5.54167 8.78385Z"
              fill="#959595"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
