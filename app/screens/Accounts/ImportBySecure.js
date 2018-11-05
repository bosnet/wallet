import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputText, InputTextOptions } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { BottomButton } from '../../components/Button';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings/ko';
import { Navigation as NavAction } from '../../actions';
import { checkSecretKey } from '../../libs/KeyGenerator';
import AndroidBackHandler from '../../AndroidBackHandler';

const validate = (text) => {
  if (text.match(/^S.+/)) {
    return true;
  }

  return false;
};

class ImportBySecure extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    this.state = {
      helperText: Strings.HELPER_DEFAULT_SECURE,
      helperColor: colors.textAreaNotiTextGray,
      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  onChangeText() {
    return (text) => {
      if (text.length > 0) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }
    };
  }

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString()).then(() => {
      const text = this.input.getWrappedInstance().getText();

      if (text.length > 0) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }

      this.validateInput();
    });
  }

  validateInput() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    const text = this.input.getWrappedInstance().getText();


    if (text.trim().length === 0) {
      this.setState({
        helperText: Strings.HELPER_ERROR_NO_SECURE,
        helperColor: colors.alertTextRed,
      });
    } else {
      const result = checkSecretKey(text);

      if (result) {
        this.setState({
          helperColor: colors.transparent,
        });
      } else {
        this.setState({
          helperText: Strings.HELPER_ERROR_NOT_VALID,
          helperColor: colors.alertTextRed,
        });
      }
    }
  }

  render() {
    const {
      helperText,
      helperColor,
      buttonActive,

    } = this.state;
    const { settings, accounts, doAction } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

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
              action: NavAction.resetScreen(NavAction.Screens.HOME),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={[styles.defaultLayout, styles.alignCenter]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.IMPORT_SS_MESSAGE}
          </Text>
          <InputText
            ref={(c) => { this.input = c; }}
            label={Strings.IMPORT_SS_LABEL}
            placeholder={Strings.PLACEHOLDER_SECURE}
            option={{
              type: InputTextOptions.QR_CODE,
              action: NavAction.pushScreen(
                NavAction.Screens.QR_SCAN,
                {
                  callback: this.onNavigateWithResult,
                },
              ),
            }}
            multiline
            onChangeText={this.onChangeText()}
          />
          <NotiPanel
            texts={[
              helperText,
            ]}
            color={helperColor}
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                Strings.NOTICE1_SS,
                Strings.NOTICE2_SS,
              ]}
            />
          </View>
          <BottomButton
            actions={[
              {
                text: Strings.BUTTON_NEXT,
                callback: () => {
                  this.validateInput();

                  const text = this.input.getWrappedInstance().getText();
                  const address = checkSecretKey(text);

                  if (!address) return;

                  if (accounts.map(e => e.address).indexOf(address) >= 0) {
                    ToastAndroid.show(Strings.TOAST_DUPLICATED_ADDRESS, ToastAndroid.SHORT);
                    return;
                  }

                  doAction(NavAction.pushScreen(
                    NavAction.Screens.SET_PASSWORD,
                    {
                      getSecureKey: () => this.input.getWrappedInstance().getText(),
                    },
                  ));
                },
              },
            ]}
            inactive={!buttonActive}
          />
        </ScrollView>
        <AndroidBackHandler
          action={NavAction.resetScreen(NavAction.Screens.HOME)}
        />
      </View>
    );
  }
}

ImportBySecure.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportBySecure);
