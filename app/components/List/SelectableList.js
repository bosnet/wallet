import React from 'react';
import PropTypes from 'prop-types';

import { FlatList, View } from 'react-native';
import styles from './styles';
import { types } from '../../resources';
import { SelectableAccountItem, SelectableAddressItem } from './Selectables';
import SelectableItem from './SelectableItem';

class SelectableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selected: null,
    };

    this.getSelected = this.getSelected.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderSelectableItem = this.renderSelectableItem.bind(this);
  }

  getSelected() {
    const { items, selected } = this.state;

    const index = items.map(e => e.id).indexOf(selected);
    return items[index];
  }

  setSelected(key) {
    const { items } = this.state;
    items.forEach((item) => {
      if (item.id === key) item.setSelected(true);
      else item.setSelected(false);
    });

    this.setState({
      selected: key,
    });
  }

  addItem(item) {
    const { items } = this.state;

    items.push(item);
  }

  renderSelectableItem() {
    return ({ item }) => {
      let result = null;
      switch (item.type) {
        case types.ListItem.ACCOUNT:
          result = (
            <SelectableAccountItem
              key={item.listKey}
              id={`item${item.listKey}`}
              name={item.name}
              address={item.address}
              account={item.account}
              addItem={this.addItem}
              balance={item.balance}
              setSelected={this.setSelected}
            />
          );
          break;
        case types.ListItem.ADDRESS:
          result = (
            <SelectableAddressItem
              key={item.listKey}
              id={`item${item.listKey}`}
              name={item.name}
              address={item.address}
              addItem={this.addItem}
              setSelected={this.setSelected}
            />
          );
          break;
        default:
          result = (
            <SelectableAddressItem
              text={item.key}
              textColor={item.textColor}
              action={item.action}
              onPress={item.onPress}
            />
          );
      }
      return result;
    }
  }


  render() {
    const { listData } = this.props;

    return (
      <View style={[styles.itemList, { marginLeft: 0 }]}>
        <FlatList
          data={listData.data}
          renderItem={this.renderSelectableItem()}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default SelectableList;
