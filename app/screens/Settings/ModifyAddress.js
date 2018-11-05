import React from 'react';
import { View, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { InputText, InputTextOptions } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { TextArea, TextAreaOptions } from '../../components/Text';
import { AddressBook, Navigation as NavAction } from '../../actions';

import AppStorage from '../../libs/AppStorage';
import { colors } from '../../resources';
import AndroidBackHandler from '../../AndroidBackHandler';


class ModifyAddress extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const mode = navigation.getParam('mode', 'Modify');
    let modeText = '수정';

    if (mode === 'Add') {
      modeText = '추가';
    }

    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ModifyAddress;


    this.state = {
      mode,
      modeText,
      address: navigation.getParam('address', null),

      nameNotiText: Strings.HELPER_NAME,
      nameNotiColor: colors.alertTextLightGrey,
      addressNotiText: Strings.HELPER_ADDRESS,
      addressNotiColor: colors.alertTextLightGrey,
    };

    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
  }

  componentDidMount() {
    const { mode, address } = this.state;

    console.log(address);

    if (mode === 'Modify') {
      this.inputName.getWrappedInstance().setText(address.name);
      this.inputAddress.getWrappedInstance().setText(address.address);
    }

    if (mode === 'Add' && address) {
      this.inputAddress.getWrappedInstance().setText(address.address);
    }
  }

  onNavigateWithResult(key) {
    this.inputAddress.getWrappedInstance().setText(key.toString());
  }

  callbackBottomButton() {
    const { mode } = this.state;
    const { doAction, addressBook } = this.props;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ModifyAddress;

    const name = this.inputName.getWrappedInstance().getText();
    const address = this.inputAddress.getWrappedInstance().getText();

    let errorFlag = false;

    if (name.length <= 0) {
      this.setState({
        nameNotiText: Strings.HELPER_ERROR_NO_NAME,
        nameNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (name.length > 10) {
      this.setState({
        nameNotiText: Strings.HELPER_ERROR_NAME_NOT_VALID,
        nameNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (addressBook.map(e => e.name).indexOf(name) >= 0) {
      this.setState({
        nameNotiText: Strings.HELPER_ERROR_DUPLICATE_NAME,
        nameNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (address.length <= 0) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_NO_ADDRESS,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (address.length > 0 && !address.match(/^G.+/)) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_ADDRESS_NOT_VALID,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (errorFlag === true) {
      return;
    }

    this.setState({
      nameNotiText: Strings.HELPER_NAME,
      nameNotiColor: colors.transparent,
      addressNotiText: Strings.HELPER_ADDRESS,
      addressNotiColor: colors.transparent,
    });

    if (mode === 'Add') {
      if (addressBook.map(e => e.address).indexOf(address) >= 0) {
        this.setState({
          addressNotiText: Strings.HELPER_ERROR_DUPLICATE_ADDRESS,
          addressNotiColor: colors.alertTextRed,
        });

        return;
      }

      doAction(AddressBook.addAddress(
        name,
        address,
      ));

      AppStorage.saveAddressBookAsync(addressBook)
        .then(() => {
          doAction(NavAction.popScreen());
        });
    }

    if (mode === 'Modify') {
      doAction(AddressBook.modifyAddress(
        name,
        address,
      ));

      AppStorage.saveAddressBookAsync(addressBook)
        .then(() => {
          doAction(NavAction.popScreen());
        });
    }
  }


  render() {
    const { 
      modeText, mode,
      addressNotiText, addressNotiColor,
      nameNotiText, nameNotiColor,
    } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ModifyAddress;

    let title;
    if (mode === 'Add') title = Strings.TITLE_ADD;
    if (mode === 'Modify') title = Strings.TITLE_MODIFY;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title,
            },
            right: {
              actionText: Strings.BACK_BUTTON,
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <View style={[styles.layoutHead]} />
          <InputText
            ref={(c) => { this.inputName = c; }}
            label={Strings.LABEL_NAME}
            placeholder={Strings.PLACEHOLDER_NAME}
          />
          <NotiPanel
            texts={[nameNotiText]}
            color={nameNotiColor}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (mode === 'Modify') {
                ToastAndroid.show(Strings.TOAST_MODIFY_ADDRESS, ToastAndroid.SHORT);
              }
            }}
          >
            <InputText
              ref={(c) => { this.inputAddress = c; }}
              label={Strings.LABEL_ADDRESS}
              placeholder={Strings.PLACEHOLDER_ADDRESS}
              editable={(mode !== 'Modify')}
              option={
                (mode !== 'Modify')
                  ? {
                    type: InputTextOptions.QR_CODE,
                    action: NavAction.pushScreen(
                      NavAction.Screens.QR_SCAN,
                      {
                        callback: this.onNavigateWithResult,
                      },
                    ),
                  }
                  : null
              }
            />
          </TouchableOpacity>
          <NotiPanel
            texts={[addressNotiText]}
            color={addressNotiColor}
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                Strings.NOTI,
              ]}
            />
            <BottomButton
              actions={[
                {
                  text: Strings.BUTTON_TEXT_OK,
                  callback: this.callbackBottomButton,
                },
              ]}
            />
          </View>
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}

ModifyAddress.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  addressBook: state.addressBook.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyAddress);
