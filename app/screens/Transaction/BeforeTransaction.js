import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { colors, types } from '../../resources';
import { TextArea, TextAreaOptions } from '../../components/Text';
import { Navigation as NavAction } from '../../actions';
import { TRANSACTION_FEE } from '../../config/transactionConfig'
import { retrieveAccount, makeTransaction } from '../../libs/Transactions';

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

    retrieveAccount(account.address)
      .then((accountData) => {
        if (accountData.status === 200) {
          const lastSequenceId = accountData.sequence_id;

          ToastAndroid.show(JSON.stringify(lastSequenceId), ToastAndroid.SHORT);

          retrieveAccount(target)
            .then((result) => {
              if (result.status === 200) {
      
                makeTransaction(account, password, target, amount, 'payment', lastSequenceId)
                  .then((res) => {
                    if (res.status === 500) {
                      doAction(
                        NavAction.pushScreen(
                          NavAction.Screens.CREATE_TRANSACTION,
                          {
                            data: {
                              status: result.status,
                              title: result.title,
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
                          },
                        },
                      ),
                    );
                  });
              }
      
              if (result.status === 404) {
                makeTransaction(account, password, target, amount, 'create', lastSequenceId)
                  .then((res) => {
                    if (res.status === 500) {
                      doAction(
                        NavAction.pushScreen(
                          NavAction.Screens.CREATE_TRANSACTION,
                          {
                            data: {
                              status: result.status,
                              title: result.title,
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
                      },
                      option: 'transaction',
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

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '송금 내역 확인',
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText]}>
            아래의 송금내역이 맞는지 확인해 주세요
          </Text>
          <TextArea
            label="받는 계좌 공개 주소"
            text={target}
            underline={false}
          />
          <TextArea
            label="보낸 금액"
            text={amount}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label="수수료"
            text={fee}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label="총액"
            text={parseFloat(amount) + parseFloat(fee)}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <View style={styles.filler} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: '예',
              callback: this.doAuth,
            },
            {
              text: '아니오',
              action: NavAction.popScreen(),
            },
          ]}
        />
      </View>
    );
  }
}

BeforeTransaction.navigationOptions = {
  header: null,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(BeforeTransaction);
