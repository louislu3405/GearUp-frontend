// Component for controlling modal display

import MessageModal from "./MessageModal";
import style from "./ModalWrapper.module.css"

export default function ModalWrapper({
  modalState,     // For current displayed modal
  setModalState   // Set current display modal
}) {
  return (
    <>
    <div className={style['modal-background']}/>
      <div className={style['modal-wrapper']}>
        {modalState != null && <MessageModal modalState={modalState} setModalState={setModalState}/>}
      </div>
    </>
  );
}