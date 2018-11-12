import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel, NotiPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';

import icWarning from '../../resources/images/ic_warning_1.png';
import AndroidBackHandler from '../../AndroidBackHandler';


class WarningKeyLeakageRestore extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      account: navigation.getParam('account', null),
      keyType: navigation.getParam('keyType', null),
      next: navigation.getParam('next', null),
    };
  }

  render() {
    const { account, keyType, next } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.WarningKeyLeakageRestore;
    
    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: keyType === 'SS' ? Strings.TITLE_SS : Strings.TITLE_RK, // `${keyType} 유출 주의`,
            },
            right: {
              actionText: '취소',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.centerLayout}>
          <AlertPanel
            icon={icWarning}
            text={
              keyType === 'SS' ? Strings.MESSAGE_SS : Strings.MESSAGE_RK
            }
          />
        </View>
        <View style={styles.footer}>
          <NotiPanel
            texts={[
              keyType === 'SS' ? Strings.NOTI_SS : Strings.NOTI_RK,
              keyType === 'SS' ? Strings.NOTI_SS2 : Strings.NOTI_RK2,
            ]}
          />
        </View>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              action: NavAction.pushScreen(
                next,
                {
                  name: account.name,
                  key: account.secretSeed,
                  account,
                  backFrom: NavAction.Screens.WARNING_KEY_LEAKAGE,
                  option: keyType === 'SS' ? 'showSecureKey' : null,
                  next: NavAction.Screens.ACCOUNT_CREATED,
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

WarningKeyLeakageRestore.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});


export default connect(mapStateToProps)(WarningKeyLeakageRestore);
