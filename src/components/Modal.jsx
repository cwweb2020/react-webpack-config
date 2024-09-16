import React from "react";

const Modal = ({ src, handleClick }) => {
  return (
    <>
      <div className="modal__container">
        <div className="modal">
          <img src={src} alt="" />
          <button onClick={handleClick}>Cerrar</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
