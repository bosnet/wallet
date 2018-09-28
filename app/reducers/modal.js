
import { Modal } from '../actions';


const initialState = { isModalVisible: false };

function modalAction(state = initialState, action) {
  switch (action.type) {
    case Modal.MODAL_HIDE:
      return { ...state, isModalVisible: false };
    case Modal.MODAL_SHOW:
      return { ...state, isModalVisible: true };
    default:
      return state;
  }
}

export default modalAction;
