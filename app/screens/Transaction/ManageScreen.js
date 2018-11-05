import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { types, colors } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';
import { Navigation as NavAction } from '../../actions';
import AndroidBackHandler from '../../AndroidBackHandler';

class ManageScreen extends React.Component {
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
    const Strings = strings[settings.language].Accounts.Management;
    
    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE}
          data={{
            left: {
              hasArrow: true,
              title: Strings.TITLE,
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <ItemList
            listType={types.ListType.FLAT}
            listData={{
              data: [
                {
                  key: Strings.LABEL_CHANGE_NAME,
                  action: NavAction.pushScreen(
                    NavAction.Screens.CHANGE_ACCOUNT_NAME,
                    {
                      account,
                    },
                  ),
                },
                {
                  key: Strings.LABEL_CHANGE_PASSWORD,
                  action: NavAction.pushScreen(
                    NavAction.Screens.AUTH_PASSWORD,
                    {
                      account,
                    },
                  ),
                },
                {
                  key: Strings.LABEL_SHOW_SS,
                  action: NavAction.pushScreen(
                    NavAction.Screens.WARNING_KEY_LEAKAGE,
                    {
                      account,
                      keyType: 'SS',
                      next: NavAction.Screens.AUTH_PASSWORD,
                    },
                  ),
                },
                {
                  key: Strings.LABEL_SHOW_RK,
                  action: NavAction.pushScreen(
                    NavAction.Screens.WARNING_KEY_LEAKAGE,
                    {
                      account,
                      keyType: 'RK',
                      next: NavAction.Screens.ACCOUNT_CREATED,
                    },
                  ),
                },
                {
                  key: Strings.LABEL_REMOVE_ACCOUNT,
                  textColor: colors.itemTextRed,
                  action: NavAction.pushScreen(
                    NavAction.Screens.CONFIRM_BACKUP,
                    {
                      account,
                    },
                  ),
                },
              ],
            }}
          />
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}

ManageScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageScreen);
