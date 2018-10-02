const Modal = {
  MODAL_SHOW: 'MODAL_SHOW',
  MODAL_HIDE: 'MODAL_HIDE',
  ALERT_SHOW: 'ALERT_SHOW',
  ALERT_HIDE: 'ALERT_HIDE',
};

Modal.showModal = () => ({
  type: Modal.MODAL_SHOW,
});

Modal.hideModal = () => ({
  type: Modal.MODAL_HIDE,
});

Modal.showAlert = ({
  title, content, confirmText = '확인', callback, cancelable,
}) => ({
  type: Modal.ALERT_SHOW,
  title,
  content,
  confirmText,
  callback,
  cancelable,
});

export default Modal;
