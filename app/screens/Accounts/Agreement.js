import React from 'react';
import { View, ToastAndroid, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Navigation as NavAction } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, CheckBox } from '../../components/Button';
import AndroidBackHandler from '../../AndroidBackHandler';

class Agreement extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      isAllChecked: false,
      angelbotFlag: navigation.getParam('angelbotFlag', null),
    };

    console.log(this.state.angelbotFlag);

    this.onPressBottom = this.onPressBottom.bind(this);
    this.activateButton = this.activateButton.bind(this);
  }

  onPressBottom() {
    const { isAllChecked } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.Precaution;

    if (!isAllChecked) {
      ToastAndroid.show(Strings.ALERT_NEED_CHECK, ToastAndroid.SHORT);
    }
  }

  activateButton() {
    if (
      this.agree1.state.value
      && this.agree2.state.value
      && this.agree3.state.value
      && this.agree4.state.value
    ) {
      this.setState({
        isAllChecked: true,
      });
    } else {
      this.setState({
        isAllChecked: false,
      });
    }
  }

  render() {
    const { isAllChecked, angelbotFlag } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.Precaution;

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
          contentContainerStyle={[styles.alignCenter, { paddingTop: 30 }]}
          showsVerticalScrollIndicator={false}
        >
          <CheckBox
            ref={(c) => { this.agree1 = c; }}
            label={Strings.PRECAUTION_1}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree2 = c; }}
            label={Strings.PRECAUTION_2}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree3 = c; }}
            label={Strings.PRECAUTION_3}
            callback={this.activateButton}
          />
          <CheckBox
            ref={(c) => { this.agree4 = c; }}
            label={Strings.PRECAUTION_4}
            callback={this.activateButton}
          />
        </ScrollView>
        <View style={styles.filler} />

        <TouchableWithoutFeedback // Touchable Opacity Style 반영 이슈때문에 inactive 시 동작 위해 사용
          onPress={this.onPressBottom}
        >
          <View style={{ alignSelf: 'stretch' }}>
            <BottomButton
              ref={(c) => { this.buttonButton = c; }}
              actions={[
                {
                  text: Strings.BUTTON_TEXT,
                  action: NavAction.pushScreen(
                    NavAction.Screens.SET_PASSWORD,
                    {
                      angelbotFlag,
                    },
                  ),
                },
              ]}
              inactive={!isAllChecked}
              callback={this.onPressBottom}
            />
          </View>

        </TouchableWithoutFeedback>
        
        <AndroidBackHandler />
      </View>
    );
  }
}

Agreement.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});


export default connect(mapStateToProps)(Agreement);
