import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  ViewPagerAndroid, View, TouchableOpacity,
  Clipboard, ToastAndroid, Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';

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
import strings from '../../../resources/strings';

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
    const { address, resetAllItem, id, doAction, addressBook, settings } = this.props;
    const { page } = this.state;
    const Strings = strings[settings.language].ComponentText.AddressItem;

    return (
      <ViewPagerAndroid
        ref={(c) => { this.pager = c; }}
        initialPage={page}
        scrollEnabled={false}
        style={[styles.addressItem]}
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
              label={Strings.LABEL_SEND}
              callback={() => {
                doAction(
                  NavAction.pushScreen(
                    NavAction.Screens.SELECT_WITHDRAW_ACCOUNT,
                    {
                      address: address.address,
                    },
                  ),
                );
              }}
            />
            <IconButton
              icon={iconCopy}
              label={Strings.LABEL_COPY}
              callback={() => {
                if (Platform.OS === 'ios') {
                  Toast.show(Strings.TOAST_COPY_ADDRESS, Toast.SHORT)
                } else {
                  ToastAndroid.show(Strings.TOAST_COPY_ADDRESS, ToastAndroid.SHORT);
                }
                Clipboard.setString(address.address);
              }}
            />
            <IconButton
              icon={iconModify}
              label={Strings.LABEL_MODIFY}
              callback={() => {
                doAction(
                  NavAction.pushScreen(
                    NavAction.Screens.MODIFY_ADDRESS,
                    {
                      address,
                      mode: 'Modify',
                    },
                  ),
                );
              }}
            />
            <IconButton
              icon={iconDel}
              label={Strings.LABEL_DELETE}
              callback={() => {
                Alert.alert(
                  Strings.ALERT_DELETE_TITLE,
                  Strings.ALERT_DELETE_MESSAGE,
                  [
                    {
                      text: Strings.ALERT_BUTTON_CANCEL, onPress: () => {}
                    },
                    {
                      text: Strings.ALERT_BUTTON_REMOVE, onPress: () => {
                        doAction(AddressAction.deleteAddress(address.address));

                        AppStorage.saveAddressBookAsync(addressBook);
                      },
                    },
                  ],
                  { cancelable: false },
                );
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
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem);
