
import { Accounts, Navigation } from '../actions';

const initialState = {
  list: [],
  updateFlag: true,
  updateFlags: {},
};

function setUpdateFlags(flags) {
  for (let property in flags) {
    if (flags.hasOwnProperty(property)) {
        flags[property] = true;
    }
  }

  return flags;
}

function accountsAction(state = initialState, action) {
  switch (action.type) {
    case Accounts.ADD_ACCOUNTS:
      state.list.unshift({
        name: action.account.name,
        address: action.account.address,
        secretSeed: action.account.secretSeed,
      });
      state.updateFlags = setUpdateFlags(state.updateFlags);
      return { ...state, updateFlag: true };
    case Accounts.REMOVE_ACCOUNTS:
      state.list.splice(
        state.list.map(e => e.address).indexOf(action.account.address),
        1,
      );
      state.updateFlags = setUpdateFlags(state.updateFlags);
      return { ...state, updateFlag: true };
    case Accounts.SET_ACCOUNTS:
      state.updateFlags = setUpdateFlags(state.updateFlags);
      return {
        ...state,
        list: action.list,
        updateFlag: true,
      };
    case Accounts.CHANGE_NAME:
      state.updateFlags = setUpdateFlags(state.updateFlags);
      state.list[action.index].name = action.name;
      return {
        ...state,
        updateFlag: true,
      };
    case Accounts.CHANGE_PASSWORD:
      state.updateFlags = setUpdateFlags(state.updateFlags);
      state.list[action.index].secretSeed = action.secretSeed;
      return {
        ...state,
        updateFlag: true,
      };
    case Accounts.ADD_UPDATE_FLAG:
      state.updateFlags[action.key] = true;
      return {
        ...state,
      };
    case Accounts.REMOVE_UPDATE_FLAG:
      delete state.updateFlags[action.key];

      return {
        ...state,
      };
    case Navigation.NAV_PUSH:
    case Navigation.NAV_POP:
    case Navigation.NAV_BACK:
    case Navigation.NAV_RESET:
    case Navigation.NAV_RESET_TO_LIST:
    case Navigation.NAV_RESET_TO_CONTACTS:
    case Accounts.SET_UPDATE_FLAG:
      // console.log('SET_UPDATE_FLAG');
      state.updateFlags[Navigation.Screens.HOME] = true;
      state.updateFlags[Navigation.Screens.TRANSACTION_LIST] = true;
      return {
        ...state,
        updateFlag: true,
      };
    case Accounts.UNSET_UPDATE_FLAG:
      if (state.updateFlags[action.key]) state.updateFlags[action.key] = false;
      return {
        ...state,
        updateFlag: false,
      };
    default:
      return state;
  }
}

export default accountsAction;
