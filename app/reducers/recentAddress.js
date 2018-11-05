import { AddressBook } from '../actions';

const initialState = {
  list: [],
};

function recentAddress(state = initialState, action) {
  switch (action.type) {
    case AddressBook.ADD_RECENT:
      const index = state.list.map(e => e.address).indexOf(action.address);
      if (index < 0) {
        state.list.unshift({
          address: action.address,
        });
      } else {
        state.list.splice(index, 1);
        state.list.unshift({
          address: action.address,
        });
      }

      return {
        ...state,
        list: state.list.slice(0, 9),
      };
    case AddressBook.SET_RECENT:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
}

export default recentAddress;
