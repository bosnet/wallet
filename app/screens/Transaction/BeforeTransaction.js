import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { colors, types } from '../../resources';
import { TextArea, TextAreaOptions } from '../../components/Text';
import { Navigation as NavAction } from '../../actions';
import { TRANSACTION_FEE } from '../../config/transactionConfig'
import { retrieveAccount, makeTransaction } from '../../libs/Transactions';
import AndroidBackHandler from '../../AndroidBackHandler';

class BeforeTransaction extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const amount = navigation.getParam('amount', null);

    this.state = {
      account: navigation.getParam('account', null),
      target: navigation.getParam('target', null),
      amount,
      fee: TRANSACTION_FEE,
    };

    this.doTransaction = this.doTransaction.bind(this);
    this.doAuth = this.doAuth.bind(this);
  }

  doAuth() {
    const { doAction } = this.props;
    const { account } = this.state;

    doAction(
      NavAction.pushScreen(
        NavAction.Screens.AUTH_PASSWORD,
        {
          account,
          option: 'callback',
          callback: this.doTransaction,
        },
      ),
    );
  }

  doTransaction(password) {
    const { account } = this.state;
    const { target, amount, fee } = this.state;
    const { doAction } = this.props;


    new retrieveAccount(account.address)
      .then((accountData) => {
        if (accountData.status === 200) {
          const lastSequenceId = accountData.sequence_id;
          account.balance = accountData.balance;

          console.log(JSON.stringify(account));
          console.log(JSON.stringify(accountData));

          new retrieveAccount(target)
            .then((result) => {
              if (result.status === 200) {
      
                makeTransaction(account, password, target, amount, 'payment', lastSequenceId)
                  .then((res) => {
                    console.log(res);

                    if (res.status !== 200) {
                      doAction(
                        NavAction.pushScreen(
                          NavAction.Screens.CREATE_TRANSACTION,
                          {
                            data: {
                              status: res.status,
                              title: res.title,
                              detail: res.detail,
                              amount,
                              account,
                            },
                          },
                        ),
                      );
                    }
      
                    doAction(
                      NavAction.pushScreen(
                        NavAction.Screens.CREATE_TRANSACTION,
                        {
                          data: {
                            status: res.status,
                            transactionId: res.transactionId,
                            source: res.source,
                            fee: res.fee,
                            amount: res.amount,
                            target: res.target,
                            account,
                          },
                        },
                      ),
                    );
                  });
              }
      
              if (result.status === 404) {
                makeTransaction(account, password, target, amount, 'create', lastSequenceId)
                  .then((res) => {
                    console.log(res);

                    if (res.status !== 200) {
                      doAction(
                        NavAction.pushScreen(
                          NavAction.Screens.CREATE_TRANSACTION,
                          {
                            data: {
                              status: res.status,
                              title: res.title,
                              detail: res.detail,
                              amount,
                              account,
                            },
                          },
                        ),
                      );
                    }
      
                    doAction(
                      NavAction.pushScreen(
                        NavAction.Screens.CREATE_TRANSACTION,
                        {
                          data: {
                            status: res.status,
                            transactionId: res.transactionId,
                            source: res.source,
                            fee: res.fee,
                            amount: res.amount,
                            target: res.target,
                            account,
                          },
                        },
                      ),
                    );
                  });
              }
      
              if (result.status === 500) {
                doAction(
                  NavAction.pushScreen(
                    NavAction.Screens.CREATE_TRANSACTION,
                    {
                      data: {
                        status: result.status,
                        title: result.title,
                        amount,
                        account,
                      },
                      // option: 'transaction',
                    },
                  ),
                );
              }
            });
        }
      });
  }

  render() {
    const { target, amount, fee } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.BeforeTransaction;
    
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
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.HEAD_TEXT}
          </Text>
          <TextArea
            label={Strings.LABEL_RECEIVER}
            text={target}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_AMOUNT}
            text={amount}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_FEE}
            text={fee}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_TOTAL}
            text={amount + fee}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <View style={styles.filler} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_YES,
              callback: this.doAuth,
            },
            {
              text: Strings.BUTTON_TEXT_NO,
              action: NavAction.popScreen(),
            },
          ]}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}

BeforeTransaction.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeforeTransaction);
