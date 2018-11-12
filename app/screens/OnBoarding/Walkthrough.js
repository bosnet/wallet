import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import styles from '../styles';

import { Navigation } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InfoPager, InfoPage } from '../../components/Pager';
import { BottomButton } from '../../components/Button';

import strings from '../../resources/strings';

import icWallet from '../../resources/images/ic_wallet.png';
import icJoin from '../../resources/images/ic_join.png';

class Walkthrough extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { settings } = this.props;
    const Strings = strings[settings.language].OnBoarding.Walkthrough;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE_LIGHT}
        />
        <View style={styles.defaultLayout}>
          <InfoPage
            headText={Strings.HEAD_TEXT}
            image={icWallet}
            size={{
              width: 151,
              height: 119,
            }}
            contentText={Strings.CONTEXT_TEXT}
          />
          <BottomButton
            actions={[
              {
                text: Strings.BUTTON_TEXT,
                action: Navigation.resetScreen(Navigation.Screens.TUTORIAL),
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

Walkthrough.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
