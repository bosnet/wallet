import React from 'react';
import { ScrollView, View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';

import { ItemList } from '../../components/List';
import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import strings from '../../resources/strings';
import AndroidBackHandler from '../../AndroidBackHandler';
import { USE_TESTNET } from '../../config/AppConfig';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;

    this.state = {
      settings,
    };
  }

  componentWillUnmount() {
    const { navigation } = this.props;

    const callback = navigation.getParam('redrawCallback', null);
    if (callback) callback();
  }

  render() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE}
          data={{
            left: {
              hasArrow: true,
              title: Strings.SCREEN_TITLE,
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <ItemList
            listType={types.ListType.SECTION}
            listData={{
              data: [
                {
                  title: Strings.SECTION1_TITLE,
                  data: [
                    {
                      text: Strings.ADDRESSBOOK,
                      action: NavAction.pushScreen(NavAction.Screens.ADDRESSBOOK),
                    },
                    {
                      text: Strings.LANGUAGE,
                      type: types.ListItem.OPTION_TEXT,
                      value: Strings.CURRENT_LANGUAGE,
                      action: NavAction.pushScreen(NavAction.Screens.SELECT_LANGUAGE),
                    },
                    USE_TESTNET
                      ? {
                        text: Strings.SEBAK_ENDPOINT,
                        action: NavAction.pushScreen(NavAction.Screens.SET_SEBAK_ENDPOINT),
                      }
                      : null,
                  ],
                },
                {
                  title: Strings.SECTION2_TITLE,
                  data: [
                    {
                      text: Strings.FAQ,
                      type: types.ListItem.EX_LINK,
                      value: 'https://boscoin.io/mainnet/',
                    },
                    {
                      text: Strings.WARNING,
                      action: NavAction.pushScreen(NavAction.Screens.WARNING),
                    },
                    {
                      text: Strings.SERVICE,
                      action: NavAction.pushScreen(NavAction.Screens.SERVICE_AGREEMENT),
                    },
                    {
                      text: Strings.PRIVACY_POLICY,
                      type: types.ListItem.EX_LINK,
                      value: 'https://boscoin.io/privacy/',
                    },
                    {
                      text: Strings.LICENSE,
                      type: types.ListItem.EX_LINK,
                      value: 'https://github.com/bosnet/wallet/blob/master/package.json',
                    },
                    {
                      text: Strings.VERSION,
                      type: types.ListItem.OPTION_TEXT,
                      value: `v ${DeviceInfo.getVersion()}`,
                    },
                  ],
                },
              ],
            }}
          />
        </ScrollView>
        <AndroidBackHandler />
      </View>
    );
  }
}

SettingsScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
