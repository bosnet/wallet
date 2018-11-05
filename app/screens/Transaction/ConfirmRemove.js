import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';

import icTrash from '../../resources/images/ic_trash.png';
import AndroidBackHandler from '../../AndroidBackHandler';

class ConfirmRemove extends React.Component {
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
    const Strings = strings[settings.language].Accounts.ConfirmRemove;

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
            text={Strings.MESSAGE}
          />
        </View>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              action: NavAction.pushScreen(
                NavAction.Screens.AUTH_PASSWORD,
                {
                  account,
                  backFrom: NavAction.Screens.CONFIRM_REMOVE,
                  option: 'removeAccount',
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

ConfirmRemove.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(ConfirmRemove);
