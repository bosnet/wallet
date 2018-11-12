
import { Settings } from '../actions';

const initialState = {
  language: Settings.LANGUAGE_KO,
  useFirebase: true,
};

function settingsAction(state = initialState, action) {
  switch (action.type) {
    case Settings.SET_SETTINGS:
      return {
        ...state,
        ...action.params,
      };
    case Settings.SET_FIREBASE:
      return { ...state, useFirebase: action.value };
    default:
      return state;
  }
}

export default settingsAction;
