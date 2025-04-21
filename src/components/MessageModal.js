import style from "./MessageModal.module.css";
import Button, { BUTTON_TYPES, ICON_POSITION } from "./Button";

export default function MessageModal({
  modalState, // modal control
  handleSetModalState,
}) {
  const handleCancel = () => {
    handleSetModalState(null);
  };

  const handleConfirm = () => {
    modalState.callback(...modalState.args);
    handleSetModalState(null);
  };

  return (
    <div>
      <div
        className={style["modal-close"]}
        onClick={() => {
          handleCancel();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M1.5625 17.0305L17.0305 1.5625L18.1353 2.66735L2.66735 18.1353L1.5625 17.0305Z"
            fill="black"
          />
          <path
            d="M17.0306 18.4583L1.56261 2.99029L2.66747 1.88544L18.1354 17.3534L17.0306 18.4583Z"
            fill="black"
          />
        </svg>
      </div>
      <h2 className={style["modal-title"]}>Delete a gear list</h2>
      <div className={style["modal-main-wrapper"]}>
        <p className={style["modal-main-text"]}>
          Are you sure you want to delete this list?
        </p>
      </div>
      <div className={style["modal-footer-wrapper"]}>
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.SECONDARY}
          label={"Cancel"}
          callBack={() => handleCancel()}
        />
        <Button
          iconPosition={ICON_POSITION.NONE}
          buttonType={BUTTON_TYPES.PRIMARY}
          label={"Save"}
          callBack={() => handleConfirm()}
        />
      </div>
    </div>
  );
}
