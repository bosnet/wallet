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

import icTrash from '../../resources/images/ic_success.png';
import AndroidBackHandler from '../../AndroidBackHandler';

class ConfirmBackup extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      account: navigation.getParam('account', null),
    };
  }

  render() {
    const { account } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ConfirmBackUp;

    return (
      <View style={styles.container}>
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
        <View style={styles.centerLayout}>
          <AlertPanel
            icon={icTrash}
            text={
              Strings.MESSAGE
            }
          />
          <View style={styles.fixBottom}>
            <NotiPanel
              texts={[
                Strings.NOTI,
              ]}
            />
          </View>
        </View>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              action: NavAction.pushScreen(
                NavAction.Screens.CONFIRM_REMOVE,
                {
                  account,
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

ConfirmBackup.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(ConfirmBackup);
