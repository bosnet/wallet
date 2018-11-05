import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Navigation as NavAction, Settings as SettingsAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, TextButton, ToggleButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputText } from '../../components/Input';
import AppStorage from '../../libs/AppStorage';

import { colors } from '../../resources';
import strings from '../../resources/strings';
import AndroidBackHandler from '../../AndroidBackHandler';
import { TextArea, LabelText } from '../../components/Text';

class ServiceAgreement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.ServiceAgreement;

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
        <View style={styles.defaultLayout}>
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.HEAD_TEXT}
          </Text>
          <View
            style={
              {
                width: 315,
                flexDirection: 'row',
                marginLeft: -16,
              }
            }
          >
            <LabelText
              text={Strings.LABEL_FIREBASE}
            >
              <ToggleButton
                value={settings.useFirebase}
              />
            </LabelText>

          </View>
          <TextArea
            // label={Strings.LABEL_FIREBASE}
            text={Strings.TEXT_FIREBASE}
            underline={false}
          />
          <NotiPanel
            texts={[
              Strings.NOTI_FIREBASE,
            ]}
          />
          <View style={styles.filler} />
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}

ServiceAgreement.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAgreement);
