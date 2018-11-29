import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { colors, types } from '../../resources';
import { TextArea, TextAreaOptions } from '../../components/Text';
import { Navigation as NavAction, AddressBook as AddrAction, Accounts as AccountAction } from '../../actions';
import AppStorage from '../../libs/AppStorage';
import AndroidBackHandler from '../../AndroidBackHandler';

class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      data: navigation.getParam('data', null),
    };

    this.callbackOkButton = this.callbackOkButton.bind(this);
  }

  componentWillUnmount() {
    const { doAction, recents } = this.props;
    const { data } = this.state;

    doAction(AccountAction.setUpdateFlag(NavAction.Screens.HOME));

    if (data.status === 200) {
      doAction(AddrAction.addRecent(data.target));
      AppStorage.saveRecentAddressAsync(recents);
    }
  }

  callbackOkButton() {
    const { doAction, recents } = this.props;
    const { data } = this.state;

    
    doAction(NavAction.resetToList(data.account));
  }

  renderHeadText() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.CreateTransaction;

    const { data } = this.state;
    let text = '';

    if (data.status === 200) text = Strings.HEAD_TEXT_TRANSACTION_OK;
    else text = Strings.HEAD_TEXT_TRANSACTION_FAIL;
    return (
      <Text style={[styles.layoutHead, styles.headText]}>
        {text}
      </Text>
    );
  }

  renderErrorText() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.CreateTransaction;

    const { data } = this.state;
    let text = '';

    if (data.status !== 200) {
      return (
        <TextArea
          label={Strings.LABEL_TFAIL}
          text={`${Strings.LABEL_FAIL_PREFIX} ${data.title}`}
          underline={false}
        />
      );
    }
  }

  renderButtons() {
    const { settings, accounts, addressBook, doAction } = this.props;
    const Strings = strings[settings.language].Transactions.CreateTransaction;

    const { data } = this.state;

    if (
      accounts.map(e => e.address).indexOf(data.target) >= 0
      || addressBook.map(e => e.address).indexOf(data.target) >= 0
    ) {
      return (
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              action: NavAction.resetToList(data.account),
            },
          ]}
        />
      );
    }

    if (data.status === 200) {
      return (
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              callback: this.callbackOkButton,
            },
            {
              text: Strings.BUTTON_TEXT_ADD,
              callback: () => {
                doAction(NavAction.resetToContacts());
                doAction(NavAction.pushScreen(
                  NavAction.Screens.MODIFY_ADDRESS,
                  {
                    mode: 'Add',
                    address: {
                      address: data.target,
                    },
                  },
                ));
              },
            },
          ]}
        />
      );
    }

    return (
      <BottomButton
        actions={[
          {
            text: Strings.BUTTON_TEXT_OK,
            action: NavAction.resetToList(data.account),
          },
        ]}
      />
    );
  }

  render() {
    const { data } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.CreateTransaction;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings.TITLE,
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          {this.renderHeadText()}
          {this.renderErrorText()}
          <TextArea
            label={Strings.LABEL_ADDR}
            text={data.target}
            underline={false}
          />
          <TextArea
            label={(data.status === 200) ? Strings.LABEL_AMOUNT : Strings.LABEL_FAILED_AMOUNT}
            text={data.amount}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_FEE}
            text={data.fee ? data.fee : '0'}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_TOTAL}
            text={(data.status === 200) ? new BigNumber(data.amount).plus(data.fee).toString() : 0}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <View style={styles.filler} />
        </ScrollView>
        {this.renderButtons()}
        <AndroidBackHandler
          action={NavAction.resetToList(data.account)}
        />
      </View>
    );
  }
}

CreateTransaction.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
  recents: state.recentAddress.list,
  accounts: state.accounts.list,
  addressBook: state.addressBook.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);
