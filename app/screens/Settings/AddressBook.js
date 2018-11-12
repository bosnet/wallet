import React from 'react';
import { View, ScrollView, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { colors, types } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { AddressPanel, NotiPanel } from '../../components/Panel';
import { TextArea } from '../../components/Text';
import { BottomButton, ButtonGroup, IconButton } from '../../components/Button';
import { Navigation as NavAction, AddressBook as AddressAction } from '../../actions';
import { ItemList } from '../../components/List';
import AndroidBackHandler from '../../AndroidBackHandler';

class AddressBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressCount: 0,
      addressList: [],
    };

    this.renderAddressList = this.renderAddressList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.resetAllItem = this.resetAllItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const { addressBook } = this.props;
  }

  addItem(item) {
    const { addressList } = this.state;
    addressList.push(item);
  }

  removeItem(id) {
    const { addressList } = this.state;
    addressList.splice(
      addressList.map(a => a.id).indexOf(id),
      1,
    );
  }

  resetAllItem(withoutId) {
    const { addressList } = this.state;
    addressList.forEach((item) => {
      if (item.id !== withoutId) {
        if (item) item.setPage(0);
      }
    });
  }

  buildAddressList() {
    const { addressBook } = this.props;
    const listArray = [];
    addressBook.forEach((address, index) => {
      listArray.push({
        listKey: `${index}`,
        type: types.ListItem.ADDRESS,
        address,
        addItem: this.addItem,
        resetAllItem: this.resetAllItem,
        removeItem: this.removeItem,
      });
    });

    return listArray;
  }

  renderAddressList() {
    const { addressBook } = this.props;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.AddressBook;

    return (
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: this.buildAddressList(),
        }}
        noDataText={
          Strings.NOTI_NO_ADDRESS
        }
      />
    );
  }

  render() {
    const { addressBook, updateFlag, doAction } = this.props;
    const { addressCount } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.AddressBook;

    if (updateFlag) {
      doAction(AddressAction.unsetFlag());
      this.resetAllItem();
    }

    return (
      <View
        style={styles.container}
      >
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings.TITLE,
            },
            right: {
              actionText: Strings.BACK_BUTTON,
              action: NavAction.popScreen(),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.resetAllItem();
            }}
          >
            <View>
              <AddressPanel
                count={addressBook.length}
              />
              <NotiPanel
                texts={[
                  Strings.NOTI,
                ]}
                noStar
              />
              {this.renderAddressList()}
              <View style={{ marginBottom: 10 }} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_ADD,
              action: NavAction.pushScreen(
                NavAction.Screens.MODIFY_ADDRESS,
                {
                  mode: 'Add',
                },
              ),
            },
          ]}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}

AddressBook.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  addressBook: state.addressBook.list,
  updateFlag: state.addressBook.updateFlag,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
