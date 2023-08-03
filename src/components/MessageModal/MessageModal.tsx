import React, { FC } from "react";
import style from './MessageModal.module.scss';



interface IMessageModal {
  active: boolean,
  setActive: Function,
  message: string,
  setMessage: Function,
  activeBtn: boolean,
  setActiveBtn: Function
}

const MessageModal: FC<IMessageModal> = ({active, setActive, message, setMessage, activeBtn, setActiveBtn}) => {

  const submitHandler = () => {
    setActive(false);
    setMessage('');
    setActiveBtn(true);
  }


  return (
    <div className={active ? `${style.modal} ${style.active}` : style.modal}>
      <div className={active ? `${style.modalContent} ${style.active}` : style.modalContent} onClick={(e)=> e.stopPropagation()}>
        <p className={style.modalText}>{message}</p>
          <button 
            className={activeBtn ? `${style.btnClose}` : `${style.btnClose} visuallyHidden`}
            onClick={submitHandler}
            >Закрыть</button>
      </div>
    </div>
  )
}

export default MessageModal;