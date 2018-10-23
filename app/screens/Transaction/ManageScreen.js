import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import { types, colors } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';
import { Navigation as NavAction } from '../../actions';

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

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE}
          data={{
            left: {
              hasArrow: true,
              title: '관리',
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <ItemList
            listType={types.ListType.FLAT}
            listData={{
              data: [
                {
                  key: '이름 변경',
                  action: NavAction.pushScreen(
                    NavAction.Screens.CHANGE_ACCOUNT_NAME,
                    {
                      account,
                    },
                  ),
                },
                {
                  key: '비밀번호 변경',
                  action: NavAction.pushScreen(
                    NavAction.Screens.AUTH_PASSWORD,
                    {
                      account,
                    },
                  ),
                },
                {
                  key: '보안키 확인',
                  action: NavAction.pushScreen(
                    NavAction.Screens.WARNING_KEY_LEAKAGE,
                    {
                      account,
                      keyType: '보안키',
                      next: NavAction.Screens.AUTH_PASSWORD,
                    },
                  ),
                },
                {
                  key: '복구키 확인',
                  action: NavAction.pushScreen(
                    NavAction.Screens.WARNING_KEY_LEAKAGE,
                    {
                      account,
                      keyType: '복구키',
                      next: NavAction.Screens.ACCOUNT_CREATED,
                    },
                  ),
                },
                {
                  key: '계좌 삭제',
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

      </View>
    );
  }
}

ManageScreen.navigationOptions = {
  header: null,
};

export default ManageScreen;
