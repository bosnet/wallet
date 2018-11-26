import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';
import { TESTNET_ADDR, ANGELBOT_ADDR, NETWORK_ID } from '../../config/transactionConfig';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { InputText } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { Navigation as NavAction, Settings as SettingAction } from '../../actions';

import { colors } from '../../resources';
import AndroidBackHandler from '../../AndroidBackHandler';
import AppStorage from '../../libs/AppStorage';

class SetSebakEndpoint extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.SetSebakEndpoint;

    this.state = {
      sebakHelperText: Strings.HELPER_SEBAK_DEFAULT,
      sebakHelperColor: colors.textAreaNotiTextGray,
      nIDHelperText: Strings.HELPER_NID_DEFAULT,
      nIDHelperColor: colors.textAreaNotiTextGray,
      angelbotHelperText: Strings.HELPER_ANGELBOT_DEFAULT,
      angelbotHelperColor: colors.textAreaNotiTextGray,
      buttonActive: true,
    };

    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onEndEditingNID = this.onEndEditingNID.bind(this);
    this.onEndEditingSebakURL = this.onEndEditingSebakURL.bind(this);
    this.onEndEditingAngelURL = this.onEndEditingAngelURL.bind(this);
  }

  componentDidMount() {
    const { settings } = this.props;

    this.sebak.getWrappedInstance().setText(settings.sebakURL ? settings.sebakURL : TESTNET_ADDR);
    this.nid.getWrappedInstance().setText(settings.networkId ? settings.networkId : NETWORK_ID);
    this.angelbot.getWrappedInstance().setText(settings.angelbotURL ? settings.angelbotURL : ANGELBOT_ADDR);
  }

  onChangeSebakURL() {
    return (text) => {
      const nid = this.nid.getWrappedInstance().getText();
      const angelbot = this.angelbot.getWrappedInstance().getText();

      this.setState({
        buttonActive: text.length > 0 && nid.length > 0 && angelbot.length > 0,
      });
    };
  }

  onChangeNID() {
    return (text) => {
      const sebak = this.sebak.getWrappedInstance().getText();
      const angelbot = this.angelbot.getWrappedInstance().getText();

      this.setState({
        buttonActive: text.length > 0 && sebak.length > 0 && angelbot.length > 0,
      });
    };
  }

  onChangeAngelbotURL() {
    return (text) => {
      const nid = this.nid.getWrappedInstance().getText();
      const sebak = this.sebak.getWrappedInstance().getText();

      this.setState({
        buttonActive: text.length > 0 && sebak.length > 0 && nid.length > 0,
      });
    };
  }

  onEndEditingSebakURL() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.SetSebakEndpoint;

    const sebak = this.sebak.getWrappedInstance().getText();

    if (sebak.length > 0) {
      this.setState({
        sebakHelperText: Strings.HELPER_SEBAK_DEFAULT,
        sebakHelperColor: colors.transparent,
      });
    } else {
      this.setState({
        sebakHelperText: Strings.HELPER_SEBAK_NOT_VALID,
        sebakHelperColor: colors.alertTextRed,
      });
    }
  }

  onEndEditingNID() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.SetSebakEndpoint;

    const nid = this.nid.getWrappedInstance().getText();

    if (nid.length > 0) {
      this.setState({
        nIDHelperText: Strings.HELPER_NID_DEFAULT,
        nIDHelperColor: colors.transparent,        
      });
    } else {
      this.setState({
        nIDHelperText: Strings.HELPER_NID_NOT_VALID,
        nIDHelperColor: colors.alertTextRed,
      });
    }
  }

  onEndEditingAngelURL() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.SetSebakEndpoint;

    const angelbot = this.angelbot.getWrappedInstance().getText();

    if (angelbot.length > 0) {
      this.setState({
        angelbotHelperText: Strings.HELPER_NID_DEFAULT,
        angelbotHelperColor: colors.transparent,
      });
    } else {
      this.setState({
        angelbotHelperText: Strings.HELPER_NID_NOT_VALID,
        angelbotHelperColor: colors.alertTextRed,
      });
    }
  }

  callbackBottomButton() {
    const sebak = this.sebak.getWrappedInstance().getText();
    const nid = this.nid.getWrappedInstance().getText();
    const angelbot = this.angelbot.getWrappedInstance().getText();

    const { doAction, settings } = this.props;

    if (angelbot.length > 0 && sebak.length > 0 && nid.length > 0) {
      doAction(SettingAction.setSebakConfig(sebak, nid, angelbot));

      AppStorage.saveSettingsAsync({
        ...settings,
        sebakURL: sebak,
        networkId: nid,
        angelbotURL: angelbot,
      })
        .then(() => {
          doAction(NavAction.popScreen());
        });
    }
  }

  render() {
    const {
      sebakHelperText,
      sebakHelperColor,
      nIDHelperText,
      nIDHelperColor,
      angelbotHelperText,
      angelbotHelperColor,
      buttonActive,
    } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Settings.SetSebakEndpoint;

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
        <ScrollView
          contentContainerStyle={[styles.alignCenter, { paddingTop: 20 }]}
          showsVerticalScrollIndicator={false}
        >
          <InputText
            ref={(c) => { this.sebak = c; }}
            label={Strings.LABEL_SEBAK_ENDPOINT}
            placeholder={Strings.PLACEHOLDER_SEBAK_ENDPOINT}
            onChangeText={this.onChangeSebakURL()}
            onEndEditing={this.onEndEditingSebakURL}
          />
          <NotiPanel
            texts={[
              sebakHelperText,
            ]}
            color={sebakHelperColor}
            noStar
          />
          <InputText
            ref={(c) => { this.nid = c; }}
            label={Strings.LABEL_NID}
            placeholder={Strings.PLACEHOLDER_NID}
            onChangeText={this.onChangeNID()}
            onEndEditing={this.onEndEditingNID}
          />
          <NotiPanel
            texts={[
              nIDHelperText,
            ]}
            color={nIDHelperColor}
            noStar
          />
          <InputText
            ref={(c) => { this.angelbot = c; }}
            label={Strings.LABEL_ANGELBOT}
            placeholder={Strings.PLACEHOLDER_ANGELBOT}
            onChangeText={this.onChangeAngelbotURL()}
            onEndEditing={this.onEndEditingAngelURL}
          />
          <NotiPanel
            texts={[
              angelbotHelperText,
            ]}
            color={angelbotHelperColor}
            noStar
          />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT,
              callback: this.callbackBottomButton,
            },
          ]}
          inactive={!buttonActive}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}

SetSebakEndpoint.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSebakEndpoint);
