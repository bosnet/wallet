
import { Settings } from '../actions';

const initialState = {
  language: Settings.LANGUAGE_KO,
  needUpdate: null,
};

function settingsAction(state = initialState, action) {
  switch (action.type) {
    case Settings.SET_SETTINGS:
      return { ...state, language: action.params.language };
    default:
      return state;
  }
}

export default settingsAction;
