import { Alert } from 'react-native';
import { Modal } from '../actions';

const initialState = { isModalVisible: false };

function modalAction(state = initialState, action) {
  switch (action.type) {
    case Modal.MODAL_HIDE:
      return { ...state, isModalVisible: false };
    case Modal.MODAL_SHOW:
      return { ...state, isModalVisible: true };
    case Modal.ALERT_SHOW:
      Alert.alert(
        action.title,
        action.content,
        [
          {
            text: action.confirmText,
            onPress: () => action.callback,
          },
        ],
        { cancelable: action.cancelable },
      );
      return { ...state };
    default:
      return state;
  }
}

export default modalAction;
