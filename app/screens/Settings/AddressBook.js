import React from 'react';
import { View, ScrollView, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { colors, types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { AddressPanel, NotiPanel } from '../../components/Panel';
import { TextArea } from '../../components/Text';
import { BottomButton, ButtonGroup, IconButton } from '../../components/Button';
import { Navigation as NavAction, AddressBook as AddressAction } from '../../actions';
import { ItemList } from '../../components/List';

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

    return (
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: this.buildAddressList(),
        }}
        noDataText={
          '아직 등록된\n'
          + '주소가 없습니다'
        }
      />
    );
  }

  render() {
    const { addressBook, updateFlag, doAction } = this.props;
    const { addressCount } = this.state;

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
              title: '주소록',
            },
            right: {
              actionText: '닫기',
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
                  '* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지\n'
                  + '   며 복구할 수 없습니다',
                  '* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다!',
                ]}
              />
              {this.renderAddressList()}
              <View style={{ marginBottom: 10 }} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: '주소 추가',
              action: NavAction.pushScreen(
                NavAction.Screens.MODIFY_ADDRESS,
                {
                  mode: 'Add',
                },
              ),
            },
          ]}
        />
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
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
