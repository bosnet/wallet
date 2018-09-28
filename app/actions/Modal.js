const Modal = {
  MODAL_SHOW: 'MODAL_SHOW',
  MODAL_HIDE: 'MODAL_HIDE',
};

Modal.showModal = () => ({
  type: Modal.MODAL_SHOW,
});

Modal.hideModal = () => ({
  type: Modal.MODAL_HIDE,
});

export default Modal;
