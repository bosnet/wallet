const AddressBook = {
  SET_ADDRESS: 'SET_ADDRESS',
  ADD_ADDRESS: 'ADD_ADDRESS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  MODIFY_ADDRESS: 'MODIFY_ADDRESS',
  UNSET_FLAG: 'UNSET_FLAG',
};

AddressBook.setAddress = list => ({
  type: AddressBook.SET_ADDRESS,
  list,
});

AddressBook.addAddress = (name, address) => ({
  type: AddressBook.ADD_ADDRESS,
  name,
  address,
});

AddressBook.deleteAddress = address => ({
  type: AddressBook.DELETE_ADDRESS,
  address,
});

AddressBook.modifyAddress = (name, address) => ({
  type: AddressBook.MODIFY_ADDRESS,
  name,
  address
});

AddressBook.unsetFlag = params => ({
  type: AddressBook.UNSET_FLAG,
});

export default AddressBook;
