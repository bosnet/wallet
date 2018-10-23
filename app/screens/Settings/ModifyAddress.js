import React from 'react';
import { View, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { InputText, InputTextOptions } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { TextArea, TextAreaOptions } from '../../components/Text';
import { AddressBook } from '../../actions';
import { Navigation as NavAction } from '../../actions';

import AppStorage from '../../libs/AppStorage';


class ModifyAddress extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const mode = navigation.getParam('mode', 'Modify');
    let modeText = '수정';

    if (mode === 'Add') {
      modeText = '추가';
    }

    this.state = {
      mode,
      modeText,
      address: navigation.getParam('address', 'null'),
    };

    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
  }

  componentDidMount() {
    const { mode, address } = this.state;
    if (mode === 'Modify') {
      this.inputName.getWrappedInstance().setText(address.name);
      this.inputAddress.getWrappedInstance().setText(address.address);
    }
  }

  onNavigateWithResult(key) {
    this.inputAddress.getWrappedInstance().setText(key.toString());
  }

  callbackBottomButton() {
    const { mode } = this.state;
    const { doAction, addressBook } = this.props;

    const name = this.inputName.getWrappedInstance().getText();
    const address = this.inputAddress.getWrappedInstance().getText();

    if (mode === 'Add') {
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
    const { modeText, mode } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: `주소 ${modeText}`,
            },
            right: {
              actionText: '닫기',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <View style={[styles.layoutHead]} />
          <InputText
            ref={(c) => { this.inputName = c; }}
            label="이름"
            placeholder="최소 1자 이상 최대 10자 이하 입력"
          />
          <NotiPanel
            texts={['이름은 최소 1자 이상 최대 10자 이하 입력하세요']}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (mode === 'Modify') {
                ToastAndroid.show('공개주소는 수정할 수 없습니다', ToastAndroid.SHORT);
              }
            }}
          >
            <InputText
              ref={(c) => { this.inputAddress = c; }}
              label="공개 주소"
              placeholder="G로 시작하는 공개주소 입력"
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
            texts={[
              'G로 시작하는 공개 주소 56자를 입력하세요',
            ]}
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                '* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지\n며 복구할 수 없 습니다',
                '* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다',
              ]}
            />
            <BottomButton
              actions={[
                {
                  text: '확인',
                  callback: this.callbackBottomButton,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  }
}

ModifyAddress.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  addressBook: state.addressBook.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyAddress);
