
import { Accounts } from '../actions';


const initialState = { list: [] };

function accountsAction(state = initialState, action) {
  switch (action.type) {
    case Accounts.SET_ACCOUNTS:
      return { ...state, list: action.accounts };
    default:
      return state;
  }
}

export default accountsAction;
