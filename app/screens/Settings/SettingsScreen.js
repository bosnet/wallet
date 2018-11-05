import React from 'react';
import { ScrollView, View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';

import { ItemList } from '../../components/List';
import { Navigation as NavAction } from '../../actions';
import strings from '../../resources/strings';
import AndroidBackHandler from '../../AndroidBackHandler';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;

    this.state = {
      settings,
    };
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
                  ],
                },
                {
                  title: Strings.SECTION2_TITLE,
                  data: [
                    {
                      text: Strings.FAQ,
                      type: types.ListItem.EX_LINK,
                      value: 'https://boscoin.io/faq/',
                    },
                    {
                      text: Strings.WARNING,
                      action: NavAction.pushScreen(NavAction.Screens.WARNING),
                    },
                    {
                      text: '서비스개선 참여',
                      action: NavAction.pushScreen(NavAction.Screens.SERVICE_AGREEMENT),
                    },
                    {
                      text: '개인정보처리취급방침',
                      type: types.ListItem.EX_LINK,
                      value: 'https://boscoin.io/privacy/',
                    },
                    {
                      text: Strings.LICENSE,
                      type: types.ListItem.EX_LINK,
                      value: 'https://github.com/bosnet/sebak/blob/master/LICENSE',
                    },
                    {
                      text: Strings.VERSION,
                      type: types.ListItem.OPTION_TEXT,
                      value: 'v 0.1',
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
