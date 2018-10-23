import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';

import icTrash from '../../resources/images/ic_trash.png';

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

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '계좌 삭제 최종 확인',
            },
            right: {
              actionText: '취소',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.centerLayout}>
          <AlertPanel
            icon={icTrash}
            text="정말 계좌를 삭제하시겠습니까?"
          />
        </View>
        <BottomButton
          actions={[
            {
              text: '확인',
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
      </View>
    );
  }
}

ConfirmRemove.navigationOptions = {
  header: null,
};

export default ConfirmRemove;
