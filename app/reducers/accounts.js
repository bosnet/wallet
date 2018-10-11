
import { Accounts } from '../actions';
import AppStorage from '../libs/AppStorage';

const initialState = { list: [] };

function accountsAction(state = initialState, action) {
  switch (action.type) {
    case Accounts.ADD_ACCOUNTS:
      state.list.unshift({
        name: action.account.name,
        address: action.account.address,
      });

      return { ...state };
    case Accounts.LOAD_ACCOUNTS:
      return { ...state, list: action.list };
    default:
      return state;
  }
}

export default accountsAction;
