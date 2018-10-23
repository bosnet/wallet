import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Navigation } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { colors } from '../../resources';
import { QRPanel } from '../../components/Panel';
import { getSecureKey } from '../../libs/KeyGenerator';

import imgQR from '../../resources/images/qr.png';

class AccountCreated extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const option = navigation.getParam('option', null);
    const keyText = (option === 'showSecureKey') ? '보안키' : '복구키';

    this.state = {
      key: navigation.getParam('key', ''),
      keyText,
      name: navigation.getParam('name', ''),
      backFrom: navigation.getParam('backFrom', null),
      option,
    };

    if (option === 'showSecureKey') this.setSecureKey();
  }

  setSecureKey() {
    const { navigation } = this.props;
    const account = navigation.getParam('account', null);
    const password = navigation.getParam('prevPassword', null);

    if (account) {
      getSecureKey(account.secretSeed, password).then((key) => {
        this.setState({
          key,
          name: account.name,
        });
      });
    }
  }

  render() {
    const { key, keyText, name, backFrom, option } = this.state;
    const { settings } = this.props;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: `${keyText} 백업`,
            },
            right: {
              actionText: '닫기',
              action: backFrom ? Navigation.backScreen(backFrom) : Navigation.resetScreen(Navigation.Screens.HOME),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText, { marginBottom: 0 }]}>
            {
              (option === 'showSecureKey')
                ? '안전한 곳에 복구키를 보관해주세요\n복구키는 비밀번호와 함께 보관해 주세요'
                : '안전한 곳에 보안키를 보관해주세요'
            }
          </Text>
          <View style={styles.section}>
            <TextArea
              label={name}
              lableColor={colors.labelTextBlack}
              text={key}
              underline={false}
            />
          </View>
          <View style={styles.seperator} />
          <View style={styles.section}>
            <LabelText
              text={name}
            />
            <QRPanel
              value={key}
            />
          </View>
          <View style={styles.filler} />
          <BottomButton
            actions={[
              {
                text: `${keyText} 저장`,
                callback: () => {
                  Share.share({ message: key });
                },
              },
              {
                text: '복사',
                callback: () => {
                  ToastAndroid.show('클립보드에 복사되었습니다', ToastAndroid.SHORT);
                  Clipboard.setString(key);
                },
              },
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}

AccountCreated.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreated);
