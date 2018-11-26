
import { Settings } from '../actions';
import { TESTNET_ADDR, ANGELBOT_ADDR, NETWORK_ID } from '../config/transactionConfig';

const initialState = {
  language: Settings.LANGUAGE_KO,
  useFirebase: true,
  sebakURL: TESTNET_ADDR,
  networkId: NETWORK_ID,
  angelbotURL: ANGELBOT_ADDR,
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
    case Settings.SET_SEBAK_CONFIG:
      return {
        ...state,
        sebakURL: action.sebakURL,
        networkId: action.NID,
        angelbotURL: action.angelURL,
      };
    default:
      return state;
  }
}

export default settingsAction;
