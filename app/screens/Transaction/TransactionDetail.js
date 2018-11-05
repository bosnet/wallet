import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { types } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { Navigation as NavAction } from '../../actions';

import icCopy from '../../resources/images/ic_list_copy.png';
import AndroidBackHandler from '../../AndroidBackHandler';

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderBalanceArea() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionDetail;

    if (item.amount >= 0) {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <LabelText
              text={Strings.LABEL_SENDER}
            >
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(item.address);
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={icCopy}
                />
              </TouchableOpacity>
            </LabelText>
          </View>
          <View style={{ marginLeft: 8 }}>
            <TextArea
              label={item.name}
              text={item.address}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_RECEIVED_AMOUNT}
              text={item.amount}
              type={types.TextArea.BALACNE}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_TOTAL}
              text={item.amount}
              type={types.TextArea.BALACNE}
              underline={false}
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <LabelText
            text={Strings.LABEL_RECEIVER}
          >
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(item.address);
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={icCopy}
              />
            </TouchableOpacity>
          </LabelText>
        </View>
        <View style={{ marginLeft: 8 }}>
          <TextArea
            label={item.name}
            text={item.address}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_SEND_AMOUNT}
            text={-(item.amount)}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_FEE}
            text={item.fee}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label={Strings.LABEL_TOTAL}
            text={-(item.amount) + (item.fee)}
            type={types.TextArea.BALACNE}
            underline={false}
          />
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionDetail;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE}
          data={{
            left: {
              hasArrow: true,
              title: Strings.TITLE,
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <ScrollView
            contentContainerStyle={styles.alignCenter}
            showsVerticalScrollIndicator={false}
          >
            <TextArea
              label={Strings.LABEL_DATE}
              text={item.date}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_TYPE}
              text={(item.amount < 0) ? Strings.TYPE_SEND : Strings.TYPE_RECV}
              underline={false}
            />
            <TextArea
              label={Strings.LABEL_TRANSACTION_ID}
              text={item.txHash}
              underline={false}
            />
            {this.renderBalanceArea(item)}
            <View style={{ marginBottom: 30 }} />
          </ScrollView>
          <BottomButton
            actions={[
              {
                text: Strings.BUTTON_TEXT_OK,
                action: NavAction.popScreen(),
              },
              // {
              //   text: Strings.BUTTON_TEXT_EXPLORER,
              //   callback: () => {
              //     Linking.openURL(`https://explorer.boscoin.io/tx/${item.txHash}`);
              //   },
              // },
            ]}
          />
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}


TransactionDetail.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);

