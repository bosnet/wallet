import { AddressBook } from '../actions';

const initialState = {
  list: [],
  updateFlag: true,
};

function addressbook(state = initialState, action) {
  switch (action.type) {
    case AddressBook.SET_ADDRESS:
      return {
        ...state,
        list: action.list,
      };
    case AddressBook.ADD_ADDRESS:
      state.list.unshift({
        name: action.name,
        address: action.address,
      });
      return {
        ...state,
        updateFlag: true,
      };
    case AddressBook.DELETE_ADDRESS:
      state.list.splice(
        state.list.map(e => e.address).indexOf(action.address),
        1,
      );
      return {
        ...state,
        updateFlag: true,
      };
    case AddressBook.MODIFY_ADDRESS:
      state.list[
        state.list.map(e => e.address).indexOf(action.address)
      ].name = action.name;
      return {
        ...state,
        updateFlag: true,
      };
    case AddressBook.UNSET_FLAG:
      return {
        ...state,
        updateFlag: false,
      };
    default:
      return state;
  }
}

export default addressbook;
