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
import { AddressBook, Navigation as NavAction } from '../../actions';

import AppStorage from '../../libs/AppStorage';
import { checkPublicKey } from '../../libs/KeyGenerator';

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

      buttonActive: false,
    };

    this.beforeCallback = this.beforeCallback.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
  }

  componentDidMount() {
    const { mode, address } = this.state;

    if (mode === 'Modify') {
      this.inputName.getWrappedInstance().setText(address.name);
      this.inputAddress.getWrappedInstance().setText(address.address);
    }

    if (mode === 'Add' && address) {
      this.inputAddress.getWrappedInstance().setText(address.address);
    }
  }

  onNavigateWithResult(key) {
    this.inputAddress.getWrappedInstance().setText(key.toString())
      .then(() => {
        const addressText = this.inputAddress.getWrappedInstance().getText();
        const name = this.inputName.getWrappedInstance().getText();
        
        this.setState({
          buttonActive: (name.length > 0 && addressText.length > 0),
        });
      });
  }

  onChangeName(name) {
    const addressText = this.inputAddress.getWrappedInstance().getText();

    this.setState({
      buttonActive: (name.length > 0 && addressText.length > 0),
    });
  }

  onChangeAddress(address) {
    const name = this.inputName.getWrappedInstance().getText();

    this.setState({
      buttonActive: (name.length > 0 && address.length > 0),
    });
  }

  beforeCallback() {
    const name = this.inputName.getWrappedInstance().getText();
    const addressText = this.inputAddress.getWrappedInstance().getText();

    const { buttonActive } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ModifyAddress;

    if (buttonActive) return;

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

    if (name.match(/[^0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s!@#$%^&*()=_-]/)) {
      this.setState({
        nameNotiText: Strings.HELPER_ERROR_INVALID_NAME,
        nameNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (!errorFlag) {
      this.setState({
        nameNotiText: Strings.HELPER_NAME,
        nameNotiColor: colors.transparent,
      });
    }

    if (addressText.length <= 0) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_NO_ADDRESS,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (addressText.length > 0 && !addressText.match(/^G.+/)) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_ADDRESS_NOT_VALID,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (!checkPublicKey(addressText)) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_ADDRESS_NOT_VALID,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (!errorFlag) {
      this.setState({
        addressNotiText: Strings.HELPER_ADDRESS,
        addressNotiColor: colors.transparent,
      });
    }
  }

  callbackBottomButton() {
    const { mode, address } = this.state;
    const { doAction, addressBook } = this.props;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ModifyAddress;

    const name = this.inputName.getWrappedInstance().getText();
    const addressText = this.inputAddress.getWrappedInstance().getText();

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

    if (name.match(/[^0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s!@#$%^&*()=_-]/)) {
      this.setState({
        nameNotiText: Strings.HELPER_ERROR_INVALID_NAME,
        nameNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (!errorFlag) {
      this.setState({
        nameNotiText: Strings.HELPER_NAME,
        nameNotiColor: colors.transparent,
      });
    }

    if (addressText.length <= 0) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_NO_ADDRESS,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (addressText.length > 0 && !addressText.match(/^G.+/)) {
      this.setState({
        addressNotiText: Strings.HELPER_ERROR_ADDRESS_NOT_VALID,
        addressNotiColor: colors.alertTextRed,
      });

      errorFlag = true;
    }

    if (!checkPublicKey(addressText)) {
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
      if (addressBook.map(e => e.name).indexOf(name) >= 0) {
        this.setState({
          nameNotiText: Strings.HELPER_ERROR_DUPLICATE_NAME,
          nameNotiColor: colors.alertTextRed,
        });

        return;
      }

      if (addressBook.map(e => e.address).indexOf(addressText) >= 0) {
        this.setState({
          addressNotiText: Strings.HELPER_ERROR_DUPLICATE_ADDRESS,
          addressNotiColor: colors.alertTextRed,
        });

        return;
      }

      doAction(AddressBook.addAddress(
        name,
        addressText,
      ));

      AppStorage.saveAddressBookAsync(addressBook)
        .then(() => {
          doAction(NavAction.popScreen());
        });
    }

    if (mode === 'Modify') {

      const curIndex = addressBook.map(e => e.name).indexOf(name);
      if (curIndex >= 0) {
        if (addressBook[curIndex].address !== address.address) {
          this.setState({
            nameNotiText: Strings.HELPER_ERROR_DUPLICATE_NAME,
            nameNotiColor: colors.alertTextRed,
          });

          return;
        }

        doAction(NavAction.popScreen());
        return;
      }

      doAction(AddressBook.modifyAddress(
        name,
        addressText,
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
      buttonActive,
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
            onChangeText={this.onChangeName}
          />
          <NotiPanel
            texts={[nameNotiText]}
            color={nameNotiColor}
            noStar
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{ alignSelf: 'stretch' }}
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
              noClear={(mode === 'Modify')}
              onChangeText={this.onChangeAddress}
              multiline
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
            noStar
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                Strings.NOTI,
                Strings.NOTI2,
              ]}
            />
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={this.beforeCallback}
            >
              <BottomButton
                actions={[
                  {
                    text: Strings.BUTTON_TEXT_OK,
                    callback: this.callbackBottomButton,
                  },
                ]}
                inactive={!buttonActive}
              />
            </TouchableOpacity>
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
