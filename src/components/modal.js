import React from 'react'

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal-back display-block" : "modal-back display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="content">
          {children}
        </div>
      </section>
    </div>
  );
};

export default Modal;