import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  ViewPagerAndroid, View, TouchableOpacity,
  Clipboard, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';
import { AddressBook as AddressAction, Navigation as NavAction } from '../../../actions';
import { TextArea } from '../../Text';
import { ButtonGroup, IconButton } from '../../Button';
import AppStorage from '../../../libs/AppStorage';


import iconSend from '../../../resources/images/ic_send.png';
import iconCopy from '../../../resources/images/icon_copy.png';
import iconModify from '../../../resources/images/ic_modify.png';
import iconDel from '../../../resources/images/ic_del.png';

class AddressItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };

    this.setPage = this.setPage.bind(this);

    const { addItem, id } = this.props;

    addItem({
      id,
      setPage: this.setPage,
    });
  }

  componentWillUnmount() {
    const { removeItem, id } = this.props;
    removeItem(id);
  }

  setPage(n) {
    if (this.pager) {
      this.pager.setPage(n);
      this.setState({
        page: n,
      });
    }
  }

  render() {
    const { address, resetAllItem, id, doAction, addressBook } = this.props;
    const { page } = this.state;

    return (
      <ViewPagerAndroid
        ref={(c) => { this.pager = c; }}
        initialPage={page}
        scrollEnabled={false}
        style={styles.addressItem}
      >
        <View key="1">
          <TouchableOpacity
            onLongPress={() => {
              resetAllItem(id);
              this.pager.setPage(1);
              this.setState({
                page: 1,
              });
            }}
            onPress={() => {
              resetAllItem(id);
            }}
          >
            <TextArea
              label={address.name}
              text={address.address}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.alignCenter} key="2">
          <ButtonGroup>
            <IconButton
              icon={iconSend}
              label="보내기"
            />
            <IconButton
              icon={iconCopy}
              label="복사"
              callback={() => {
                ToastAndroid.show('클립보드에 복사되었습니다', ToastAndroid.SHORT);
                Clipboard.setString(address.address);
              }}
            />
            <IconButton
              icon={iconModify}
              label="수정"
              callback={() => {
                doAction(
                  NavAction.pushScreen(
                    NavAction.Screens.MODIFY_ADDRESS,
                    {
                      address,
                    },
                  ),
                );
              }}
            />
            <IconButton
              icon={iconDel}
              label="삭제"
              callback={() => {
                Alert.alert(
                  '주소삭제',
                  '주소를 정말 삭제하시겠습니까?',
                  [
                    {
                      text: '취소', onPress: () => {}
                    },
                    {
                      text: '삭제', onPress: () => {
                        doAction(AddressAction.deleteAddress(address.address));

                        AppStorage.saveAddressBookAsync(addressBook);
                      },
                    },
                  ],
                  { cancelable: false },
                )
              }}
            />
          </ButtonGroup>
        </View>
      </ViewPagerAndroid>
    );
  }
}

AddressItem.propTypes = {
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
  textColor: PropTypes.string,
};

AddressItem.defaultProps = {
  onPress: null,
  action: null,
  textColor: colors.itemTextBlack,
};

const mapStateToProps = state => ({
  addressBook: state.addressBook.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem);
