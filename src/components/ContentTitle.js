import style from "./general.module.css"

export default function ContentTitle({title, text}) {
  return (
    <div>
      <h1 className={style['main-content-title']}>
        {title}
      </h1>
      <p className={style['main-content-text']}>
        {text}
      </p>
    </div>
  )
}